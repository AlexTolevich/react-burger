import React, {FC} from "react";
import style from './ModalOverlay.module.css'
import {IModalOverlayProps} from "../../utils/types";



const ModalOverlay: FC<IModalOverlayProps> = ({onClose, children}) => {

  function handleClose(e: React.MouseEvent<HTMLDivElement>) {
    (e.target as Element).classList.contains(style.overlay) && onClose();
  }

  return (
    <div className={style.overlay} onClick={(e) => handleClose(e)}>
      {children}
    </div>
  )
}

export default ModalOverlay;