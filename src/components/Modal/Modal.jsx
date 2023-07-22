import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { ModalWindow, Overlay } from './Modal.styled';

//новий рут для модалки
const modalRoot = document.querySelector('#modal-root');

const Modal = ({ largeImageURL, tags, onClose }) => {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        onClose(); //закриття модалки при кліку на escape
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown); // прибираємо слухача при натисканні на escape
      document.body.style.overflow = 'visible';
    };
  }, [onClose]);

  //закриття при кліку на фон
  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <ModalWindow>
        <img src={largeImageURL} alt={tags} />
      </ModalWindow>
    </Overlay>,
    modalRoot
  );
};

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
