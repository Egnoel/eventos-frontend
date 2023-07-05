'use client';

import { ChangeEvent, useEffect, useState, useCallback } from 'react';
import { CloudArrowUpIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import Image from 'next/image';
import { Event, fetchWrapper } from '@/app/functions/fetch';
import { useRouter } from 'next/navigation';

const CreateEvent = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState('');
  const [image, setImage] = useState();
  const [token, setToken] = useState<string | null>(null);
  const [nomeEvento, setNomeEvento] = useState('');
  const [descricao, setDescricao] = useState('');
  const [dataEvento, setDataEvento] = useState<string>('');
  const [hora, setHora] = useState<string>('');
  const [selectedValue, setSelectedValue] = useState<string>('Música');

  const handleSelectChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      setSelectedValue(event.target.value);
    },
    []
  );

  const handleDateChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setDataEvento(event.target.value);
    },
    []
  );

  const handleTimeChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setHora(event.target.value);
    },
    []
  );

  const resetUrl = useCallback(() => {
    setUrl('');
  }, []);
  const uploadImage = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      console.log('upload');
      const files = event.target.files;
      if (files && files.length > 0) {
        const file = files[0];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'chat app');
        formData.append('cloud_name', 'dameucg7x');
        setLoading(true);
        const response = await fetch(
          'https://api.cloudinary.com/v1_1/dameucg7x/image/upload',
          {
            method: 'POST',
            body: formData,
          }
        );
        if (response) {
          const data = await response.json();
          console.log(data);
          setUrl(data.secure_url);
          setLoading(false);
        }
      }
    },
    []
  );

  const handleSubmit = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault();

      try {
        console.log('submit');
        const formData = new FormData();
        formData.append('title', nomeEvento);
        formData.append('description', descricao);
        formData.append('eventDate', dataEvento);
        formData.append('eventTime', hora);
        formData.append('eventpic', url);
        formData.append('category', selectedValue);

        setLoading(true);
        const { data } = await axios.post(
          'http://localhost:8000/api/events/create',
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        console.log(data);
        setNomeEvento('');
        setDescricao('');
        setDataEvento('');
        setHora('');
        resetUrl();
        console.log(data);
        resetUrl();
        router.push('/profile?tab=my');

        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    },
    [nomeEvento, descricao, dataEvento, hora, url, token]
  );

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setToken((token));
    }
  }, []);

  return (
    <div className="relative flex flex-row gap-10">
      <div className="flex flex-col w-1/2 gap-5">
        <div className="flex flex-col gap-2">
          <label>Nome</label>
          <input
            type="text"
            placeholder="Nome do Evento"
            className="outline-none focus:outline-none bg-[#f0f5fb] border-b-[1px] border-black w-32"
            value={nomeEvento}
            onChange={(event) => setNomeEvento(event.target.value)}
          />
        </div>
        <div className="flex flex-row items-center gap-5">
          <div className="flex flex-row gap-2">
            <label>Data:</label>
            <input
              type="date"
              placeholder="Data do Evento"
              className="bg-[#f0f5fb] focus:outline-none"
              value={dataEvento}
              onChange={handleDateChange}
            />
          </div>
          <div className="flex flex-row gap-2">
            <label>Hora:</label>
            <input
              type="time"
              placeholder="Hora do Evento"
              className="bg-[#f0f5fb] focus:outline-none"
              value={hora}
              onChange={handleTimeChange}
            />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <label>Selecione Uma categoria</label>
          <select
            onChange={handleSelectChange}
            title="Categorias"
            className="bg-[#f0f5fb] focus:outline-none w-32"
          >
            <option value="Música" selected>
              Música
            </option>
            <option value="Webnar">Webnar</option>
            <option value="Workshop">Workshop</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label>Descrição</label>
          <textarea
            className="bg-white focus:outline-none w-[348px] h-[116px]"
            placeholder="Descrição do Evento..."
            value={descricao}
            onChange={(event) => setDescricao(event.target.value)}
          ></textarea>
        </div>
      </div>
      <div className="flex flex-col w-1/2 gap-5 px-10 py-10 bg-white">
        <p>Imagens do Evento</p>
        <div className="flex items-center justify-center">
          {url ? (
            <div>
              <Image src={url} alt="image" width={200} height={200} />
              <button onClick={() => resetUrl()} type="button">
                Alterar Imagem
              </button>
            </div>
          ) : (
            <div className="bg-[#f0f5fb] border-dashed border-2 border-gray-400 w-[165px] h-[165px] flex flex-col items-center justify-center cursor-pointer">
              <CloudArrowUpIcon className="w-10 h-10 text-blue-400" />
              <input
                onChange={(e) => uploadImage(e)}
                type="file"
                placeholder="image"
                accept="image/*"
              />
            </div>
          )}
        </div>
      </div>
      <div className="absolute bottom-[-25px] right-5">
        <button
          className="bg-red-400 w-[150px] h-[50px] rounded-xl text-white"
          onClick={(e) => handleSubmit(e)}
        >
          Criar Evento
        </button>
      </div>
    </div>
  );
};

export default CreateEvent;
