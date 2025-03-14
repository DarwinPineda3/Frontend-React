import { createSlice } from "@reduxjs/toolkit";
import { getBaseApiUrl } from "src/guards/jwt/Jwt";
import axios from 'src/utils/axios';
import { AppDispatch } from "../Store";

// const API_URL = '/api/data/tickets';
function getApiUrl() {
  return `${getBaseApiUrl()}/tickets/`;
}
interface StateType {
  tickets: any[];
  ticket: any;
  page: number;
  totalPages: number;
  error: string | null;
  pageSize: number;
}

const initialState: StateType = {
  tickets: [],
  ticket: {},
  page: 1,
  totalPages: 1,
  error: null,
  pageSize: 25,
};

export const TicketSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    getTickets: (state, action) => {
      state.tickets = Array.isArray(action.payload.itemsResult) ? action.payload.itemsResult : [];
      state.page = action.payload.page;
      state.totalPages = action.payload.totalPages;
      state.pageSize = action.payload.pageSize;
    },
    getTicket: (state, action) => {
      state.ticket = action.payload.data;
    },
    addTicket: (state, action) => {
      state.tickets.push(action.payload);
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const { getTickets, getTicket, addTicket, setPage, setPageSize, setError } = TicketSlice.actions;

// Async thunk for fetching assets with pagination (READ)
export const fetchTickets =
  (requestedPage: Number, pageSize = 25) =>
    async (dispatch: AppDispatch) => {
      try {
        const response = await axios.get(
          `${getApiUrl()}?page=${requestedPage}&pageSize=${pageSize}`
        );
        const data = response.data;
        dispatch(getTickets(
          {
            itemsResult: data.itemsResult,
            page: data.page,
            totalPages: data.totalPages,
            pageSize
          }
        ))
      } catch (err: any) {
        console.error('Error fetching tickets:', err);
        dispatch(setError('Failed to fetch tickets'));
        throw err;
      }
    };

export const fetchTicketsById = (id: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`${getApiUrl()}${id}/`);
    console.log(response);
    if (response.status === 200) {
      dispatch(getTicket({ data: response.data }));
    } else {
      dispatch(setError('fetch group report detail not found'));
      throw 'fetch group report detail not found'
    }
  } catch (err: any) {
    console.error('Error fetching Group detail:', err);
    dispatch(setError('Failed to fetch Group detail'));
    throw err
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

    const response = await axios.post(getApiUrl(), formData);

    dispatch(addTicket(response.data));
  } catch (err: any) {
    console.error('Error creating ticket:', err);
    dispatch(setError('Failed to create ticket'));
  }
};


export default TicketSlice.reducer;