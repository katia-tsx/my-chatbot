'use client'
import Image from 'next/image';
import {useState, FormEvent, ChangeEvent} from 'react';

export default function Home() {

  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<any[]>([
    {
      role: "system",
      content: "Tu eres un tutor de python senior"
    }
  ]);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newMessage = {
      role: "user",
      content: input 
    };
    const newMessages = [...messages, newMessage];
    setInput('');
    setMessages(newMessages);
    sentMessagesToApi(newMessages); 
  }

  const changeInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.currentTarget.value);
  }

  const sentMessagesToApi = async (messages: any) => {
    const response = await fetch('/api/chat',{
    method: 'POST',
    body: JSON.stringify({messages})  
    });
    const data: any  = await response.json();
    console.log(data);
    setMessages(prevDATA => [...prevDATA, data]);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        {
          messages.map ((message, index) => (
          <div className="chat chat-end" key={index}>
            <div className="chat-image avatar">
              <div className="w-10 h-10 rounded-full"> 
               <Image className='rounded-full' alt='mikasa' src="https://randomuser.me/api/portraits/lego/4.jpg" fill/>
             </div>
            </div>
          <div className="chat-bubble">{message.content}</div>
        </div>
        ))
        }
      </div>
      <div className='w-full'>
        <form onSubmit={handleSubmit} className='flex w-full flex-col space-y-2'>
          <textarea value={input} onChange={changeInput} className='textarea textarea-bordered' placeholder='write your message'></textarea>
          <button className='btn btn-primary' type='submit'>send</button>
        </form>
      </div>
    </main>
  );
}
