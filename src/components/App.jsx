import React from 'react';
import { Form } from './Form/Form';
import { Contacts } from './Contacts/Contacts';
import { Filter } from './Filters/Filters';
import css from './App.module.css';

export class App extends React.Component {
  state = {
    contacts: [],
    filter: '',
  }

  componentDidMount = () => {
    const storage = localStorage.getItem('contacts');
    const parsedStorage = JSON.parse(storage);
    if (parsedStorage) {
      this.setState({ contacts : parsedStorage})
    }
   };

  componentDidUpdate = (prevProps, prevState) => {
    const updatedState = this.state.contacts;
    if (updatedState !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(updatedState));
    }
   }

  addContacts = newContact => {
    const contacts = this.state.contacts;
    contacts.find(contact => contact.name === newContact.name)
      ? alert(`${newContact.name} is already in contacts`) :
      this.setState(prevState => ({
        contacts: [...prevState.contacts, newContact],
      }));
  }
    filterContact = evt => {
      const { value } = evt.currentTarget;
      this.setState({ filter: value });
    }

    deleteContact = id => {
      const wrong = contact => contact.id !== id;
      const success = this.state.contacts.filter(wrong);
      this.setState({ contacts: success });
    };

    render() {
      const { contacts, filter } = this.state;
      const { addContacts, filterContact, deleteContact } = this;
      return (
        <div className={css.form__wrapper}>
          <h2 className={css.form__title}>Phonebook</h2>
          <Form addContacts={addContacts} contacts={contacts} />
          <h2 className={css.form__title}>Contacts</h2>
          <Filter filteredContent={filter} filterContact={filterContact} />
          <Contacts
            contacts={contacts}
            filteredContent={filter}
            deleteContact={deleteContact}
          />
        </div>
      );
    }
  }
