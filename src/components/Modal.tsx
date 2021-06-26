
import ReactModal from 'react-modal';
import '../styles/modal.scss'
import errorImg from '../assets/images/error.svg';
import Button from './Button';
type ModalProps = {
    title: string,
    message: string,
    onConfirm: () => void,
} & ReactModal.Props
const Modal = ({isOpen,message,onRequestClose,onConfirm,title}: ModalProps) => {
    return   (
    <ReactModal 
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="Modal"
        className={{
        base: "modal-base",
        afterOpen: "modal-base_after-open",
        beforeClose: "modal-base_before-close"
        }}
        overlayClassName={{
        base: "overlay-base",
        afterOpen: "overlay-base_after-open",
        beforeClose: "overlay-base_before-close"
        }}
        shouldCloseOnOverlayClick={true}
        closeTimeoutMS={2000}
    >    
    <img src={errorImg} alt="Copy room code" />
    <h1>{title}</h1>
    <p>{message}</p>
    <br />
<div>
    <Button onClick={onRequestClose} className="button modal-outlined">Cancelar</Button>
    <Button onClick={onConfirm} className="button modal">Confirmar</Button></div>
  </ReactModal>)
}

export default Modal;