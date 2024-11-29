import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../../Store";
import axios from 'src/utils/axios';
import { TechInventoryType } from "src/types/cti/technologies/techInventory";

const API_URL = '/api/data/techinventory';

interface StateType {
  techsInventory: TechInventoryType[];
  page: number;
  totalPages: number;
  error: string | null;
}

const initialState: StateType = {
  techsInventory: [],
  page: 1,
  totalPages: 1,
  error: null,
};

export const TechInventorySlice = createSlice({
  name: 'techInventory',
  initialState,
  reducers: {
    getTechsInventory: (state, action) => {
      state.techsInventory = Array.isArray(action.payload.techsInventory) ? action.payload.techsInventory : [];
      state.page = action.payload.currentPage;
      state.totalPages = action.payload.totalPages; 
    },
    addTechnology: (state, action) => {
      state.techsInventory.push(action.payload);
    },
    updateTechnology: (state, action) => {
      const index = state.techsInventory.findIndex(technology => technology.id === action.payload.id);
      if (index !== -1) {
        state.techsInventory[index] = action.payload;
      }
    },
    deleteTechnology: (state, action) => {
      state.techsInventory = state.techsInventory.filter(technology => technology.id !== action.payload);
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const { getTechsInventory, addTechnology, updateTechnology, deleteTechnology, setPage, setError } = TechInventorySlice.actions;

// Async thunk for fetching technologies with pagination (READ)
export const fetchTechInventory = (page = 1) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`${API_URL}?page=${page}`);
    const { techsInventory, currentPage, totalPages } = response.data;
    dispatch(getTechsInventory({ techsInventory, currentPage, totalPages })); // Dispatch to update state
  } catch (err: any) {
    console.error('Error fetching technologies inventory:', err);
    dispatch(setError('Failed to fetch technologies inventory'));
  }
};

// Async thunk for creating a new technology (CREATE)
export const createTechnology = (newTechnology: TechInventoryType) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.post(API_URL, newTechnology);
    dispatch(addTechnology(response.data.technology)); // Assuming the server returns the created technology
  } catch (err: any) {
    console.error('Error creating technology:', err);
    dispatch(setError('Failed to create technology'));
  }
};

// Async thunk for updating an technology (UPDATE)
export const editTechnology = (updateTechnologyObj: TechInventoryType) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.put(`${API_URL}/${updateTechnologyObj.id}`, updateTechnologyObj);
    dispatch(updateTechnology(response.data.technology)); // Assuming the server returns the updated technology
  } catch (err: any) {
    console.error('Error updating technology:', err);
    dispatch(setError('Failed to update technology'));
  }
};

// Async thunk for deleting an technology (DELETE)
export const removeTechnology = (technologyId: string) => async (dispatch: AppDispatch) => {
  try {
    await axios.delete(`${API_URL}/${technologyId}`);
    dispatch(deleteTechnology(technologyId));
  } catch (err: any) {
    console.error('Error deleting technology:', err);
    dispatch(setError('Failed to delete technology'));
  }
};

export default TechInventorySlice.reducer;
