'use client'
import React, {useEffect,useState} from 'react'
import { useParams } from 'next/navigation'
import { Event, User, UserProps, fetchWrapper } from '@/app/functions/fetch'
import Banner from '../components/Banner'
import Image from 'next/image'
import Countdown from '../components/Countdown'
import { useRouter } from 'next/navigation'

const SingleEvent = () => {
    const params = useParams()
    const [registered,setRegistered] = useState(false)
    const [isCreator, setIsCreator] = useState(false)
  const [user, setUser] = useState<User>();
    const { _id } = params
    const [event, setEvent] = useState<Event>()
    const router = useRouter()
    const getEvent = async () => {
      const data = await fetchWrapper<Event>(`events/${_id}`)
      setEvent(data)
      console.log(data)
    }

    const handleStartTransmission = async() => {     
      try {
        await fetchWrapper<String>(`events/startLive/${_id}`, {method: 'POST'})
        router.push(`/room/${_id}`);
      } catch (error: any) {
        console.log(error);
      }
    };

    const handleRegister = async (eventId: string) => {
      if (user) {
        try {
          const {user, message} = await fetchWrapper<UserProps>(`user/signEvent/${eventId}`, {
            method: 'PUT',
          });
          if(user._id !== user._id){
            throw new Error("Invalid user data");
          }
          setUser(user);
          localStorage.setItem('user', JSON.stringify(user));
  
          console.log(user);
          console.log(message);
        } catch (error: any) {
          console.log(error);
          console.log('Ocorreu um erro ao registar ao evento.');
        }
      }
    };
  
    const handleCancel = async (eventId: string) => {
      if (user) {
        try {
          const {user, message} = await fetchWrapper<UserProps>(`user/unsubscribeEvent/${eventId}`, {
            method: 'PUT',
          });
          if(user._id !== user._id){
            throw new Error("Invalid user data");
          }
          setUser(user);
          localStorage.setItem('user', JSON.stringify(user));
  
          console.log(user);
          console.log(message);
        } catch (error: any) {
          console.log(error);
          console.log('Ocorreu um erro ao remover inscrição ao evento.');
        }
      }
    };



    useEffect(() => {
      const userString: string | null = localStorage.getItem('user');
      if (userString) {
        const parsedUser: User = JSON.parse(userString);
        setUser(parsedUser);
       
      }
    }, []);

    useEffect(() => {
      if (user && user.signedEvents && user.signedEvents.includes(_id)  && event && event.registrations.includes(user._id)) {
        setRegistered(true);
      } else {
        setRegistered(false);
      }
    }, [user, _id]);

    useEffect(() => {
      if (user && user.createdEvents && user.createdEvents.includes(_id) && event && event.creator._id === user._id) {
        setIsCreator(true);
      } else {
        setIsCreator(false);
      }
      console.log(isCreator)
    }, [user, _id]);

    useEffect(() => {
      getEvent()
    }, [_id])
   
  return (
    <div className='flex flex-col w-full gap-10 px-10 py-10'>
      <div className='flex flex-row justify-between gap-5'>
      <div className="relative w-4/5 h-60">
          {event && (
            <Image
              src={event.eventpic}
              alt="event"
              className="object-fill rounded-md"
              fill
            />
          )}
        </div>
        <div className='w-1/5 h-16 bg-gray-500 rounded-md'>
        {event && isCreator ? (
  <div className='flex flex-col items-center justify-center px-4 py-2'>
    <button type='button' onClick={handleStartTransmission}>Start Transmission</button>
  </div>
) : (
  event && event.isTransmission ? (
    <div className='flex flex-col items-center justify-center px-4 py-2'>
      <p>Event has started</p>
      <button type='button'>Join Now</button>
    </div>
  ) : (
    <div className='flex items-center justify-center py-4'>
      <Countdown
        eventDate={event?.eventDate || ""}
        eventTime={event?.eventTime || ""}
      />
    </div>
  )
)}
        </div>
      </div>
      <div className='flex flex-row justify-between gap-6'>
        <div className='flex flex-col w-4/5 gap-5 '>
          <div className='flex flex-row justify-between w-full px-3 py-2 bg-red-400 rounded-md'>
              <div className='flex flex-col gap-2'>
                <p>Creator</p>
                <div className='flex flex-row items-center gap-2'>
                  <Image src={event? event.creator.pic : ""} width={20} height={20} alt='creator image' className='rounded-full' />
                  <p>{event? `${event.creator.firstName} ${event.creator.lastName}` : ""}</p>
                </div>
              </div>
              <div className='flex flex-col items-center gap-2'>
                <p>Share Event</p>
                <button type='button'>Copy Link</button>
              </div>
          </div>
          <div className='flex flex-col gap-3 px-3 bg-red-400 rounded-md'>
            <h2>Description</h2>
            <p className='flex flex-wrap'>
              {event? event.description : ""}
            </p>
          </div>
        </div>
        <div className='w-1/5  h-[250px]'>
          <div className='flex flex-col gap-4 px-4 py-2 w-[200px] bg-gray-500 rounded-md'>
            <h1>
              {event? event.title : ""}
            </h1>
            <span>
              {event  ? event.eventDate : ""}
            </span>
            <span>
              {event ? event.eventTime : ""}
            </span>
           
            
            {isCreator ? (
              <div></div>
            ):(
              registered  ? (
                <button type='button' onClick={() => handleCancel(_id)}>
                  Cancel
                </button>
              ) : (
                <button type='button' onClick={() => handleRegister(_id)}>
                  Register
                </button>
              )
              
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleEvent