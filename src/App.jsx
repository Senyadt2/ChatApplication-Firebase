import { useState,useRef } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Auth from "./components/Auth";
import Cookies from "universal-cookie";
import Chat from "./components/Chat";
import { signOut } from "firebase/auth";
import {auth} from "./firebase-config"
const cookies = new Cookies();
function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token")); //true or false reading from cookies
  const [room, setRoom] = useState(null);
  const roomInputRef = useRef(null);
  if (isAuth) {
    return (
      <>
        <Auth setIsAuth={setIsAuth}/>
      </>
    );
  }
  const signUserOut = async()=>{
      await signOut(auth);
      cookies.remove("auth-token");
      setIsAuth(false);
      setRoom(null);
  }
  return (
    <>
      {room ? (
        //if room clicked then this UI
        <Chat room={room}/>
      ) : (
        //UI to take input the chat 
        <div className="container">
          <div className="room">
            <label >Enter Room Name</label>
            <input type="text" className="inputChat"  ref={roomInputRef}/>
            <button className="EnterChatbtn" onClick={()=>setRoom(roomInputRef.current.value)}>Enter Chat</button>
          </div>
        </div>
      )}
      <div className="signout">
        <button onClick={signUserOut}>Sign Out</button>
      </div>
    </>
  );
}

export default App;
