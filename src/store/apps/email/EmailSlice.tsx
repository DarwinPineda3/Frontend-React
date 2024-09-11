import axios from '../../../utils/axios';
import { createSlice } from '@reduxjs/toolkit';
import { AppDispatch } from 'src/store/Store';

const API_URL = '/api/data/email/EmailData';

interface StateType {
  emails: any[];
  emailContent: number;
  emailSearch: string;
  currentFilter: string;
}

const initialState = {
  emails: [],
  emailContent: 1,
  emailSearch: '',
  currentFilter: 'inbox',
};

const EmailSlice = createSlice({
  name: 'email',
  initialState,
  reducers: {
    getEmails: (state: StateType, action) => {
      state.emails = action.payload;
    },
    SearchEmail: (state: StateType, action) => {
      state.emailSearch = action.payload;
    },
    SelectEmail: (state: StateType, action) => {
      state.emailContent = action.payload;
    },
    starEmail: (state: StateType, action) => {
      state.emails = state.emails.map((email) =>
        email.id === action.payload ? { ...email, starred: !email.starred } : email,
      );
    },
    importantEmail: (state: StateType, action) => {
      state.emails = state.emails.map((email) =>
        email.id === action.payload ? { ...email, important: !email.important } : email,
      );
    },
    checkEmail: (state: StateType, action) => {
      state.emails = state.emails.map((email) =>
        email.id === action.payload ? { ...email, checked: !email.checked } : email,
      );
    },
    deleteEmail: (state: StateType, action) => {
      state.emails = state.emails.map((email) =>
        email.id === action.payload ? { ...email, trash: !email.trash } : email,
      );
    },
    setVisibilityFilter: (state, action) => {
      state.currentFilter = action.payload;
    },
  },
});


export default EmailSlice.reducer;
