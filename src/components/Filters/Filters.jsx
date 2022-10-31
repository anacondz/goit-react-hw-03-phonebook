import React from 'react';
import PropTypes from 'prop-types';
import css from './Filters.module.css';

export const Filter = ({ filteredContent, filterContact }) => {
  return (
    <>
      <label className={css.filter__label}>
        Find contacts by name
        <input
          className={css.filter__input}
          type="text"
          name="search"
          value={filteredContent}
          onChange={filterContact}
        />
      </label>
    </>
  );
};

Filter.propTypes = {
  filteredContent: PropTypes.string.isRequired,
  filterContact: PropTypes.func.isRequired,
};