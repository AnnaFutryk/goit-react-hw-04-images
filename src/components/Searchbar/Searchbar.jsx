import { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, SearchButton, SearchForm } from './Searchbar.styled';

class Searchbar extends Component {
  state = {
    searchText: '',
    value: '',
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { value } = e.target.elements.searchText;
    this.props.onSubmit(value.trim()); //передаємо запит в арр
    e.target.reset();
  };

  render() {
    return (
      <header>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchButton type="submit">
            <span>Search</span>
          </SearchButton>

          <Input
            name="searchText"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </SearchForm>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
