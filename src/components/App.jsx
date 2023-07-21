import { Component } from 'react';
import * as API from '../services/getImages';
import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Searchbar from './Searchbar/Searchbar';

export class App extends Component {
  state = {
    searchText: '',
    images: [],
    currentPage: 1,
    isLoading: false,
    error: null,
    totalPages: 0,
  };

  //метод життєвого циклу при оновленні компоненту (якщо змінюється запит або сторінка,то виводим нові зображення)
  componentDidUpdate(_, prevState) {
    if (
      prevState.searchText !== this.state.searchText ||
      prevState.currentPage !== this.state.currentPage
    ) {
      this.addImages();
    }
  }

  //Завантаження зображень через збільш номеру ст
  loadMore = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
  };

  //обробка при сабміті форми,
  handleSubmit = query => {
    this.setState({
      searchText: query,
      images: [],
      currentPage: 1,
    });
  };

  //отримання та додавання зображень
  addImages = async () => {
    const { searchText, currentPage } = this.state;
    try {
      this.setState({ isLoading: true }); //показуєм лоадер
      const data = await API.getImages(searchText, currentPage); //отримуємо дані з API

      if (data.hits.length === 0) {
        return alert('sorry image not found');
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

      this.setState(state => ({
        images: [...state.images, ...imagesFormatedtoList],
        error: '',
        totalPages: Math.ceil(data.totalHits / 12),
      }));
    } catch (error) {
      this.setState({ error: 'Ooops...Something went wrong' }); //повідомлення у разі помилки
    } finally {
      this.setState({ isLoading: false }); //вимикаєм лоадер у будь-якому випадку
    }
  };

  render() {
    const { images, isLoading, currentPage, totalPages } = this.state;

    return (
      <>
        <Searchbar onSubmit={this.handleSubmit} />
        {images.length > 0 && <ImageGallery images={images} />}
        {isLoading && <Loader />}
        {images.length > 0 && totalPages !== currentPage && !isLoading && (
          <Button onClick={this.loadMore} />
        )}
      </>
    );
  }
}
