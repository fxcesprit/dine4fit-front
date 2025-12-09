import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../api';

interface UserState {
  id?: number;
  email: string;
  isAuthenticated: boolean;
  error?: string | null; 
}

const initialState: UserState = {
  id: -1,
  email: '',
  isAuthenticated: false,
  error: null,
};

export const registerUserAsync = createAsyncThunk(
  'user/registerUserAsync',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await api.users.usersCreate(credentials);
      return response.data; 
    } catch (error) {
      return rejectWithValue('Ошибка регистрации'); // Возвращаем ошибку в случае неудачи
    }
  }
);

// Асинхронное действие для авторизации
export const loginUserAsync = createAsyncThunk(
  'user/loginUserAsync',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await api.login.loginCreate(credentials);
      return response.data; 
    } catch (error) {
      return rejectWithValue('Ошибка авторизации'); // Возвращаем ошибку в случае неудачи
    }
  }
);

// Асинхронное действие для деавторизации
export const logoutUserAsync = createAsyncThunk(
  'user/logoutUserAsync',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.logout.logoutCreate();
      return response.data; 
    } catch (error) {
      return rejectWithValue('Ошибка при выходе из системы'); 
    }
  }
);

export const getUserAsync = createAsyncThunk(
  'user/getUserAsync',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await api.users.usersRead(id);
      return response.data; 
    } catch (error) {
      return rejectWithValue('Ошибка');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUserAsync.pending, (state) => {
        state.error = null;
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        const { email } = action.payload;
        state.id = action.payload.id;
        state.email = email;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isAuthenticated = false; 
      })

      .addCase(logoutUserAsync.fulfilled, (state) => {
        state.email = '';
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logoutUserAsync.rejected, (state, action) => {
        state.error = action.payload as string;
      });      
  },
});

export const {} = userSlice.actions;
export default userSlice.reducer;