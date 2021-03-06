import { FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";

import Button from "../components/Button";
import useAuth from "../hooks/useAuth";
import useTheme from "../hooks/useTheme";
import { database } from "../services/firebase";

import illustationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import logoDarkImg from "../assets/images/logo-dark.svg";
import googleIconImg from "../assets/images/google-icon.svg";
import "../styles/auth.scss";
import ThemeSwitch from "../components/ThemeSwitch";

const Home = () => {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();
  const { theme } = useTheme();
  const [roomCode, setRoomCode] = useState("");

  const  handleCreateRoom = async () => {
    if (!user) {
      await signInWithGoogle();
    }
    history.push("/rooms/new");
  }

  const handleJoinRoom = async (event: FormEvent) => {
    event.preventDefault();
    if (roomCode.trim() === "") {
      return;
    }
    const roomRef = await database.ref(`rooms/${roomCode}`).get();
    if (!roomRef.exists()) {
      alert("Room does not exists.");
      return;
    }    
    if (roomRef.val().endedAt) {
      alert('Room already closed.');
      return;
    }
    history.push(`/rooms/${roomCode}`);
  }

  return (
    <div id="page-auth" className={theme}>
      <aside>
        <img src={illustationImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire dúvidas da sua audiÊncia em tempo real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={theme === 'light' ? logoImg : logoDarkImg} alt="LetMeAsk" />        
          <button className="create-room" onClick={handleCreateRoom}>
            <img src={googleIconImg} alt="Logo do Google" />
            Crie sua sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input type="text" placeholder="Digite o código da sala" onChange={(event) => setRoomCode(event.target.value)} value={roomCode} />
            <Button type="submit">Entrar na sala</Button>            
          </form>
          <ThemeSwitch />
        </div>
      </main>
    </div>
  );
};

export default Home;
