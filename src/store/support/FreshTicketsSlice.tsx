import { createSlice } from "@reduxjs/toolkit";
import axios from 'src/utils/axios';
import { AppDispatch } from "../Store";

// const API_URL = '/api/data/tickets';
const API_URL = 'http://amunozakila2.localhost:4500/api/tickets/';


interface StateType {
  tickets: any[];
  page: number;
  totalPages: number;
  error: string | null;
}

const initialState: StateType = {
  tickets: [],
  page: 1,
  totalPages: 1,
  error: null,
};

export const TicketSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    getTickets: (state, action) => {
      state.tickets = Array.isArray(action.payload.tickets) ? action.payload.tickets : [];
      state.page = action.payload.currentPage;
      state.totalPages = action.payload.totalPages;
    },
    addTicket: (state, action) => {
      state.tickets.push(action.payload);
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const { getTickets, addTicket, setPage, setError } = TicketSlice.actions;

// Async thunk for fetching assets with pagination (READ)
export const fetchTickets = (page = 1) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`${API_URL}`);

    const data = response.data;
    const totalPages = Math.ceil(data.length / 10);
    dispatch(getTickets({ tickets: data, currentPage: page, totalPages }));
  } catch (err: any) {
    console.error('Error fetching tickets:', err);
    dispatch(setError('Failed to fetch tickets'));
  }
};


export const createTicket = (newTicket: any) => async (dispatch: AppDispatch) => {
  try {
    const formData = new FormData();

    formData.append('subject', newTicket.subject);
    formData.append('description', newTicket.description);
    // formData.append('csrfmiddlewaretoken', csrfToken);

    if (newTicket.attach_file) {
      formData.append('attach_file', newTicket.attach_file);
    }

    const response = await axios.post(API_URL, formData);

    dispatch(addTicket(response.data));
  } catch (err: any) {
    console.error('Error creating ticket:', err);
    dispatch(setError('Failed to create ticket'));
  }
};


export default TicketSlice.reducer;