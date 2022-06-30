import React from "react";
import style from './ModalOverlay.module.css'
import PropTypes from 'prop-types';

function ModalOverlay({onClose, children}) {
  function handleClose(e) {
    e.target.classList.contains(style.overlay) && onClose();
  }

  return (
    <div className={style.overlay} onClick={handleClose}>
      {children}
    </div>
  )
}

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
}

export default ModalOverlay;