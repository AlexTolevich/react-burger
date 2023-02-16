import React, {FC, ReactNode} from "react";
import ReactDOM from "react-dom";
import style from "./Modal.module.css";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {IModalProps} from "../../utils/types";

const Modal: FC<IModalProps> = ({onClose, children, title}) => {
  const modal = document.querySelector('#modal') as HTMLElement;

  React.useEffect(() => {
    document.addEventListener('keydown', handleEscClose);
    return (
      () => document.removeEventListener('keydown', handleEscClose)
    );
  }, []);

  const handleEscClose = (e: KeyboardEvent) => {
    e.key === 'Escape' && onClose();
  }

  return ReactDOM.createPortal(
    <ModalOverlay onClose={onClose}>
      <div className={`${style.modal} pt-10 pr-10 pb-15 pl-10`}>
        <div className={style.btn} aria-label="закрыть">
          <CloseIcon type="primary" onClick={onClose}/>
        </div>
        <div className={`${style.headerContainer} pr-6`}>
          <h2 className={`${style.header} text text_type_main-large`}>{title}</h2>
        </div>
        <div className={style.children}>{children}</div>
      </div>
    </ModalOverlay>
    , modal);
}

export default Modal;