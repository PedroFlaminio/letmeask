import { FormEvent, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import Button from "../components/Button";
import { database } from "../services/firebase";

import illustationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import logoDarkImg from "../assets/images/logo-dark.svg";
import "../styles/auth.scss";
import useTheme from "../hooks/useTheme";

const NewRoom = () => {
  const { user } = useAuth();
  const history = useHistory();
  const [newRoom, setNewRoom] = useState("");
  const { theme } = useTheme();

  const handleCreateRoom = async (event: FormEvent) => {
    event.preventDefault();
    if (newRoom.trim() === "") {
      return;
    }
    const roomRef = database.ref("rooms");
    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    });
    history.push(`/rooms/${firebaseRoom.key}`);
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
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input type="text" placeholder="Nome da sala" onChange={(event) => setNewRoom(event.target.value)} value={newRoom} />
            <Button type="submit">
              Criar sala
            </Button>
          </form>
          <p>
            Quer entrar em uma sala existente? <Link to="/">clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default NewRoom;
