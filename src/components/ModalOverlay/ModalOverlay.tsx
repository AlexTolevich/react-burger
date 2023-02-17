import React, {FC} from "react";
import style from './ModalOverlay.module.css'
import {IModalOverlayProps} from "../../utils/types";

const ModalOverlay: FC<IModalOverlayProps> = ({onClose, children}) => {
  function handleClose(event: React.MouseEvent<HTMLDivElement>) {
    (event.target as Element).classList.contains(style.overlay) && onClose();
  }

  return (
    <div className={style.overlay} onClick={(event) => handleClose(event)}>
      {children}
    </div>
  )
}

export default ModalOverlay;