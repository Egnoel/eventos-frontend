export async function fetchWrapper<T=unknown>(input:RequestInfo|URL, init?:RequestInit | undefined){
    const response = await fetch(`http://localhost:8000/api/${input}`, init);
    const data = await response.json();
    return data as T;


}

export interface User{
    id:string;
    firstName:string;
    lastName:string;
    email:string;
    pic:string;
}

export type UserProps={
    user:User;
    token:string;
}

export interface Event{
    id:string;
    title:string;
    creator:User;
    eventDate:string;
    eventTime:string;
    description:string;
    eventpic:string;
    category:string;
}