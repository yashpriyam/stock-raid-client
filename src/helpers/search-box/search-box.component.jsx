import React from 'react';
import FormInput from '../form-input/form-input.component';
import './search-box.styles.css';

const SearchBox = props => (
  <FormInput
    className='search-box'
    type='search'
    label={props.label}
    onChange={props.onSearchChange}
    value={props.value}
  />
);

export default SearchBox;
