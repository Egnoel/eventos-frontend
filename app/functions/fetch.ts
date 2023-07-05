export async function fetchWrapper<T = unknown>(input: RequestInfo | URL, init?: RequestInit | undefined) {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token de autorização não encontrado.');
    }
    // Adiciona o token de autorização no header
    const headers = {
      ...(init?.headers || {}),
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  
    const url = `http://localhost:8000/api/${input}`;
    try {
      const response = await fetch(url, { ...init, headers });
      if(!response.ok) throw new Error('Erro ao fazer requisição');
      const data = await response.json();
    return data as T;
    } catch (error:any) {
      throw new Error(error.message)
    }
  
    
    
  }

export interface User{
    _id:string;
    firstName:string;
    lastName:string;
    email:string;
    pic:string;
    favorites:string[];
    createdEvents:string[];
    signedEvents:string[];
}

export type UserProps={
    user:User;
    token:string;
    message:string;
}

export interface Event{
    _id:string;
    title:string;
    creator:User;
    eventDate:string;
    eventTime:string;
    description:string;
    eventpic:string;
    category:string;
    registrations:string[];
    favourites:string[];
    isTransmission:boolean;
}