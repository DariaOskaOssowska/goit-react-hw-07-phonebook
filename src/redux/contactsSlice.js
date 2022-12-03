import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  contacts: {
    items: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  },
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    filter: '',
  },
  reducers: {
    fetchingInProgress(state) {
      state.isLoading = true;
    },
    fetchingSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.items = action.payload;
    },
    fetchingError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    addContact: {
      reducer(state, action) {
        state.items.push(action.payload);
      },
      prepare(nameText, numberText) {
        return {
          payload: {
            name: nameText,
            number: numberText,
            id: nanoid(),
            completed: false,
          },
        };
      },
    },

    delContact(state, action) {
      const index = state.items.findIndex(
        contacts => contacts.id === action.payload
      );
      state.items.splice(index, 1);
    },

    setFilter(state, action) {
      state.filter = action.payload;
    },

    toggleCompleted(state, action) {
      for (const contact of state.items) {
        if (contact.id === action.payload) {
          contact.completed = !contact.completed;
          break;
        }
      }
    },
  },
});

export const {
  fetchingInProgress,
  fetchingSuccess,
  fetchingError,
  addContact,
  delContact,
  setFilter,
  toggleCompleted,
} = contactsSlice.actions;

export const contactsReducer = contactsSlice.reducer;
