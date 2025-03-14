import { createSlice } from '@reduxjs/toolkit';
import { AssetType } from 'src/types/assets/asset';
import { AppDispatch } from '../Store';

// Datos simulados de activos para usar en el frontend
const simulatedAssets: AssetType[] = [
  { id: '1', name: 'Asset 1', ip: '192.168.1.1', domain: 'domain1', url: 'http://example.com', hostname: 'hostname1', uuid: 'uuid1' },
  { id: '2', name: 'Asset 2', ip: '192.168.1.2', domain: 'domain2', url: 'http://example.com', hostname: 'hostname2', uuid: 'uuid2' },
  { id: '3', name: 'Asset 3', ip: '192.168.1.3', domain: 'domain3', url: 'http://example.com', hostname: 'hostname3', uuid: 'uuid3' },
  // Puedes añadir más activos aquí.
];

// Estado inicial con datos simulados
interface StateType {
  assets: AssetType[];
  page: number;
  pageSize: number;
  loading: boolean;
  totalPages: number;
  error: string | null;
  message: string | null;
}

const initialState: StateType = {
  assets: simulatedAssets,
  page: 1,
  totalPages: Math.ceil(simulatedAssets.length / 10), // Número de páginas simuladas
  pageSize: 10,
  loading: false,
  error: null,
  message: null,
};

// Crear el slice de Redux
export const AssetsSlice = createSlice({
  name: 'asset',
  initialState,
  reducers: {
    getAssets: (state, action) => {
      state.assets = Array.isArray(action.payload.results) ? action.payload.results : [];
      state.page = action.payload.currentPage;
      state.totalPages = action.payload.totalPages;
      state.pageSize = action.payload.pageSize;
    },
    getFilteredAssets: (state, action) => {
      state.assets = Array.isArray(action.payload.results) ? action.payload.results : [];
    },
    addAsset: (state, action) => {
      state.assets.push(action.payload);
    },
    updateAsset: (state, action) => {
      const index = state.assets.findIndex((asset) => asset.id === action.payload.id);
      if (index !== -1) {
        state.assets[index] = action.payload;
      }
    },
    deleteAsset: (state, action) => {
      state.assets = state.assets.filter((asset) => asset.id !== action.payload);
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {
  getAssets,
  getFilteredAssets,
  addAsset,
  updateAsset,
  deleteAsset,
  setPage,
  setError,
  setLoading,
  setMessage,
} = AssetsSlice.actions;

// Async thunk para obtener los activos con paginación (simulado)
export const fetchAssets =
  (requestedPage: number, pageSize: number = 10) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));

      // Lógica de paginación simulada
      if (isNaN(requestedPage)) {
        requestedPage = 1;
      }
      if (isNaN(pageSize)) {
        pageSize = 10;
      }

      const startIndex = (requestedPage - 1) * pageSize;
      const endIndex = requestedPage * pageSize;

      const paginatedAssets = simulatedAssets.slice(startIndex, endIndex);

      dispatch(getAssets({
        results: paginatedAssets,
        currentPage: requestedPage,
        totalPages: Math.ceil(simulatedAssets.length / pageSize),
        pageSize,
      }));
    } catch (err: any) {
      console.error('Error fetching assets:', err);
      dispatch(setError('Failed to fetch assets'));
    } finally {
      dispatch(setLoading(false));
    }
  };

// Async thunk para filtrar activos (simulado)
export const fetchFilteredAssets =
  (filters: { url?: boolean; ip?: boolean; domain?: boolean }) => async (dispatch: AppDispatch) => {
    try {
      const filteredAssets = simulatedAssets.filter(asset => {
        if (filters.url && !asset.name.includes('url')) return false;
        if (filters.ip && !asset.name.includes('ip')) return false;
        if (filters.domain && !asset.name.includes('domain')) return false;
        return true;
      });

      dispatch(getFilteredAssets({ results: filteredAssets }));
    } catch (err: any) {
      console.error('Error fetching filtered assets:', err);
      dispatch(setError('Failed to fetch assets'));
    }
  };

// Función para agregar un nuevo activo (simulada)
export const createAsset =
  (newAsset: AssetType) => async (dispatch: AppDispatch) => {
    try {
      // Simular la creación del activo
      simulatedAssets.push(newAsset);
      dispatch(addAsset(newAsset));
      dispatch(setMessage('Asset added successfully'));
    } catch (err: any) {
      console.error('Error adding asset:', err);
      dispatch(setError('Failed to add asset'));
    }
  };

// Función para actualizar un activo (simulada)
export const editAsset =
  (updatedAsset: AssetType) => async (dispatch: AppDispatch) => {
    try {
      const index = simulatedAssets.findIndex((asset) => asset.id === updatedAsset.id);
      if (index !== -1) {
        simulatedAssets[index] = updatedAsset;
        dispatch(updateAsset(updatedAsset));
        dispatch(setMessage('Asset updated successfully'));
      } else {
        dispatch(setError('Asset not found'));
      }
    } catch (err: any) {
      console.error('Error updating asset:', err);
      dispatch(setError('Failed to update asset'));
    }
  };

// Función para eliminar un activo (simulada)
export const removeAsset = (assetId: string) => async (dispatch: AppDispatch) => {
  try {
    const index = simulatedAssets.findIndex((asset) => asset.id === assetId);
    if (index !== -1) {
      simulatedAssets.splice(index, 1);
      dispatch(deleteAsset(assetId));
      dispatch(setMessage('Asset deleted successfully'));
    } else {
      dispatch(setError('Asset not found'));
    }
  } catch (err: any) {
    console.error('Error deleting asset:', err);
    dispatch(setError('Failed to delete asset'));
  }
};

export default AssetsSlice.reducer;
