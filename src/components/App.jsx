import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { getIsLoading, getError } from 'redux/selectors';
import { fetchContacts } from 'redux/operations';
import { Loader } from './Loader/Loader';

export const App = () => {
  // const filter = useSelector(getFilter);

  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  // const handleSubmit = e => {
  //   const name = e.name;
  //   const number = e.number;
  //   const contactsLists = [...items];

  //   if (contactsLists.findIndex(contact => name === contact.name) !== -1) {
  //     alert(`${name} is already in contacts.`);
  //   } else {
  //     dispatch(addContact(name, number));
  //   }
  // };

  //  const handleToggle = () => dispatch(toggleCompleted(contatc));

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 20,
        color: '#010101',
      }}
    >
      <h1>Phonebook</h1>
      <ContactForm />
      <h2> Contacts</h2>
      <Filter />
      {isLoading && !error && <Loader/>}
      <ContactList />
    </div>
  );
};
