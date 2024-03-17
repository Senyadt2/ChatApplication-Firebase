import React, { useEffect, useState } from 'react'
import {addDoc,collection,serverTimestamp,onSnapshot,query, where, orderBy} from 'firebase/firestore';
import { auth,db } from '../firebase-config';
import "../Sytle/Chat.css"



const Chat = ({room}) => {


    const [newMessage,setNewMessage] =  useState();
    const[messages,setMessages] = useState([]);
    const messageRef = collection(db,"messages");
    const handleSubmit = async(e) => { 
        e.preventDefault();
        if(newMessage === "") return ;
        await addDoc(messageRef,{
            text:newMessage,                    //message
            createdAt:serverTimestamp(),        //timestamp
            user: auth.currentUser.displayName, //auth ma google ko name xha tei use vako
        room,                                   //Room name aagadi ko 
        });
        setNewMessage("");
      }

      useEffect(()=>{
        const queryMessages = query(messageRef,where("room","==",room),orderBy("createdAt")); //message haru le jata room == romm xha
        const unsubscribe =  onSnapshot(queryMessages,(snapshot)=>{
            let messages =[];
            snapshot.forEach((doc)=>{
                messages.push({...doc.data(),id:doc.id});
            });
            setMessages(messages);
        }); //query to list 

        return ()=> unsubscribe();
      },[])

  return (
    <div className='chat-app'>
        <div className='header'>
            <h1>Welcome to:{room.toUpperCase()} </h1>
        </div>
        <div className='messages'>{messages.map((message)=> <div className='message' key={message.id}>
            <span className='user'>{message.user}</span>
            {message.text}
        </div>)}</div>
        <form onSubmit={handleSubmit} className='new-message-form' action="">
            <input type="text" className='new-message-input' value={newMessage} placeholder='Type your message here' onChange={(e)=>setNewMessage(e.target.value)}/>
            <button  type='submit' className='send-button'>Send</button>
        </form>
        
    </div>
  )
}

export default Chat
