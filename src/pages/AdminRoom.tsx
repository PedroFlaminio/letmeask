import { useHistory, useParams } from "react-router-dom";

import logoImg from "../assets/images/logo.svg";
import logoDarkImg from "../assets/images/logo-dark.svg";
import deleteImg from "../assets/images/delete.svg";
import checkImg from "../assets/images/check.svg";
import answerImg from "../assets/images/answer.svg";
import emptyImg from "../assets/images/empty-questions.svg";

import Button from "../components/Button";
import Question from "../components/Question";
import RoomCode from "../components/RoomCode";
import Modal from "../components/Modal";
// import { useAuth } from '../hooks/useAuth';
import { useRoom } from "../hooks/useRoom";
import { database } from "../services/firebase";

import "../styles/room.scss";
import { useState } from "react";
import useTheme from "../hooks/useTheme";
import ThemeSwitch from "../components/ThemeSwitch";

type RoomParams = {
  id: string;
};

const AdminRoom = () => {
  const history = useHistory();
  const { theme } = useTheme();
  const params = useParams<RoomParams>();
  const roomId = params.id;

  const { title, questions } = useRoom(roomId);
  const [deleteMessageId, setDeleteMessageId] = useState<string | undefined>(undefined);
  const [closeRoom, setCloseRoom] = useState<boolean | undefined>(undefined);

  const handleEndRoom = async () => {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    });
    history.push("/");
  };

  const handleCheckQuestionAsAnswered = async (questionId: string) => {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    });
  };

  const handleHighlightQuestion = async (questionId: string) => {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true,
    });
  };
  const handleDeleteQuestion = async (questionId: string) => {
    setDeleteMessageId(questionId);
  };
  const deleteQuestion = async (questionId: string) => {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    setDeleteMessageId(undefined);
  };
  const EmptyList = (
    <div className="empty-list">
      <img src={emptyImg} alt="Sem perguntas" />
      <h2>Nenhuma pergunta por aqui...</h2>
      <p>Faça o seu login e seja a primeira pessoa a fazer uma pergunta!</p>
    </div>
  );

  const QuestionList = (
    <div className="question-list">
      {questions.map((question) => {
        return (
          <Question
            key={question.id}
            content={question.content}
            author={question.author}
            isAnswered={question.isAnswered}
            isHighlighted={question.isHighlighted} 
            dark={theme==="dark"}
          >
            {!question.isAnswered && (
              <>
                <button type="button" onClick={() => handleHighlightQuestion(question.id)}>
                  <img src={checkImg} alt="Marcar pergunta como respondida" />
                </button>
                <button type="button" onClick={() => handleCheckQuestionAsAnswered(question.id)}>
                  <img src={answerImg} alt="Dar destaque à pergunta" />
                </button>
              </>
            )}
            <button type="button" onClick={() => handleDeleteQuestion(question.id)}>
              <img src={deleteImg} alt="Remover pergunta" />
            </button>
          </Question>
        );
      })}
    </div>
  );

  return (
    <div id="page-room" className={theme}>
      <header>
        <div className="content">
          <img src={theme === 'light' ? logoImg : logoDarkImg} alt="LetMeAsk" />
          <div>
            <div className="switch-div"><ThemeSwitch /></div>
            <RoomCode code={roomId} dark={theme==="dark"} />
            <Button isOutlined dark={theme==="dark"}onClick={() => setCloseRoom(false)}>
              Encerrar sala
            </Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>
        {questions.length > 0 ? QuestionList : EmptyList}
      </main>
      <Modal
        title={"Excluir pergunta"}
        message={"Tem certeza que deseja excluir esta pergunta?"}
        isOpen={deleteMessageId !== undefined}
        onRequestClose={() => setDeleteMessageId(undefined)}
        onConfirm={() => deleteQuestion(deleteMessageId ?? "")}
      ></Modal>
      <Modal
        title={"Encerrar sala"}
        message={"Tem certeza que deseja encerrar esta sala?"}
        isOpen={closeRoom !== undefined}
        onRequestClose={() => setCloseRoom(undefined)}
        onConfirm={handleEndRoom}
      ></Modal>
    </div>
  );
};
export default AdminRoom;
