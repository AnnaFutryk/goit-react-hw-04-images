import PropTypes from 'prop-types';
import Modal from 'components/Modal/Modal';
import { useState } from 'react';
import { ImgItem, Item } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ image }) => {
  //стан модалки

  const [showModal, setShowModal] = useState(false);
  //перемикання стану модалки
  const toggleModal = () => {
    setShowModal(prevModal => !prevModal); // Инвертирует значение showModal
  };

  return (
    <>
      <Item>
        <ImgItem
          src={image.webformatURL}
          alt={image.tags}
          onClick={toggleModal}
        />
        {showModal && (
          <Modal
            largeImageURL={image.largeImageURL}
            tags={image.tags}
            onClose={toggleModal}
          />
        )}
      </Item>
    </>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
};

export default ImageGalleryItem;
