import React from "react";
import ReactDOM from "react-dom";
import style from "./Modal.module.css";
import PropTypes from "prop-types";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';

function Modal({onClose, children, title}) {
  const modal = document.querySelector('#modal');

  React.useEffect(() => {

    document.addEventListener('keydown', handleEscClose);
    return (
      () => document.removeEventListener('keydown', handleEscClose)
    );
  }, []);

  const handleEscClose = (e) => {
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

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
  title: PropTypes.string
}

export default Modal;