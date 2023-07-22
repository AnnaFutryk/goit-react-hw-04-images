import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Input, SearchButton, SearchForm } from './Searchbar.styled';

const Searchbar = ({ onSubmit }) => {
  const [searchText, setSearchText] = useState('');
  const [value, setValue] = useState('');

  useEffect(() => {
    setSearchText(value); // Оновлюємо searchText при зміні value
  }, [value]);

  const handleChange = e => setValue(e.target.value);

  const handleSubmit = e => {
    e.preventDefault();
    setSearchText(searchText.trim()); //отримуємо введений пошуковий запит без лишніх пробілів
    onSubmit(searchText.trim()); //передаємо запит в арр
    setValue(''); // Скидаємо поле вводу після сабміту
  };

  return (
    <header>
      <SearchForm onSubmit={handleSubmit}>
        <SearchButton type="submit">
          <span>Search</span>
        </SearchButton>

        <Input
          name="searchText"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={value}
          onChange={handleChange}
        />
      </SearchForm>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
