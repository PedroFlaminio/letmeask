import copyImg from "../assets/images/copy.svg";

import "../styles/room-code.scss";

type RoomCodeProps = {
  code: string;
  dark: boolean;
};

const RoomCode = ({ code, dark = false }: RoomCodeProps) => {
  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(code);
  }
  const className = !dark ? "room-code" : "room-code dark";

  return (
    <div>
      <button className={className} onClick={copyRoomCodeToClipboard}>
        <div>
          <img src={copyImg} alt="Copy room code" />
        </div>
        <span>Sala #{code}</span>
      </button>
    </div>
  );
};

export default RoomCode;
