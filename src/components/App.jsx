import { useState, useEffect } from 'react';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as API from '../services/getImages';
import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Searchbar from './Searchbar/Searchbar';

export const App = () => {
  const [searchText, setSearchText] = useState('');
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (searchText === '') {
      return;
    }
    //отримання та додавання зображень
    async function addImages() {
      try {
        setIsLoading(true); //показуєм лоадер
        const data = await API.getImages(searchText, currentPage); //отримуємо дані з API

        if (data.hits.length === 0) {
          return toast.warn('Sorry image not found...', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
          });
        }

        //відбираєм лише ті дані,які нас цікавлять
        const imagesFormatedtoList = data.hits.map(
          ({ id, tags, webformatURL, largeImageURL }) => ({
            id,
            tags,
            webformatURL,
            largeImageURL,
          })
        );

        setImages(prevImages => [...prevImages, ...imagesFormatedtoList]);
        setTotalPages(Math.ceil(data.totalHits / 12));
      } catch {
        toast.error('Ooops...Something went wrong', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        }); //повідомлення у разі помилки
      } finally {
        setIsLoading(false); //вимикаєм лоадер у будь-якому випадку
      }
    }
    addImages();
  }, [searchText, currentPage]);

  //Завантаження зображень через збільш номеру ст
  const loadMore = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  //обробка при сабміті форми,
  const handleSubmit = query => {
    setSearchText(query);
    setImages([]);
    setCurrentPage(1);
  };

  return (
    <>
      <ToastContainer transition={Slide} />
      <Searchbar onSubmit={handleSubmit} />
      {images.length > 0 && <ImageGallery images={images} />}
      {isLoading && <Loader />}
      {images.length > 0 && totalPages !== currentPage && !isLoading && (
        <Button onClick={loadMore} />
      )}
    </>
  );
};
