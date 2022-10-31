import React, { Component } from 'react';
import shortid from 'shortid';
import css from './Form.module.css';

const INITIAL_STATE = {
  name: '',
  number: '',
};

export class Form extends Component {
  state = { ...INITIAL_STATE };

  valueHandler = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  submitBtn = event => {
    event.preventDefault();

    const newContact = {
      id: shortid.generate(),
      name: this.state.name,
      number: this.state.number,
    };

    this.props.addContacts(newContact);
    this.reset();
  };

  reset() {
    this.setState({ ...INITIAL_STATE });
  }

  render() {
    const { name, number } = this.state;
    return (
      <form className={css.form} onSubmit={this.submitBtn}>
        <label className={css.form__label}>
          Name
          <input
            className={css.form__input}
            placeholder="Name"
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={name}
            onChange={this.valueHandler}
          />
        </label>
        <label className={css.form__label}>
          Number
          <input
            className={css.form__input}
            placeholder="Phone number"
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={number}
            onChange={this.valueHandler}
          />
        </label>
        <button className={css.form__button} type="submit">
          Add contact
        </button>
      </form>
    );
  }
}