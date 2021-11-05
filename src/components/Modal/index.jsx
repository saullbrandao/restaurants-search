import React, { useEffect } from 'react'
import { Portal } from './Portal/index'
import * as S from './styles'

export const Modal = ({ children, isOpen, onClose }) => {
  useEffect(() => {
    const onEsc = (e) => {
      if (e.keyCode === 27) onClose()
    }

    window.addEventListener('keydown', onEsc)

    return () => window.removeEventListener('keydown', onEsc)
  }, [onClose])

  if (!isOpen) return null

  const onOverlayClick = () => {
    onClose()
  }

  const onDialogClick = (e) => {
    e.stopPropagation()
  }

  return (
    <Portal>
      <S.Overlay onClick={onOverlayClick}>
        <S.Dialog onClick={onDialogClick}>{children}</S.Dialog>
      </S.Overlay>
    </Portal>
  )
}
