// src/authSlice.ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loginUser,registerUser } from '../api/api';

interface AuthState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  data: any; 
  error: null | string | undefined;
}

const initialState: AuthState = {
  status: 'idle',
  data: {},
  error: null,
};

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }, thunkAPI):Promise<{[key:string]:any}> => {
    try {
      const result = await loginUser(email, password);
      return result;
    } catch (err:any) {
      return thunkAPI.rejectWithValue(err?.message);
    }
  }
);

// Registration async thunk
export const register = createAsyncThunk(
  'auth/register',
  async ({ name, email, password }: { name:string,email: string; password: string }, thunkAPI): Promise<any> => {
    try {
      const result = await registerUser(name,email, password); // Make sure registerUser is implemented correctly
      return result;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err?.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.data = action.payload;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });

    // for register
    builder.addCase(register.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.data = action.payload;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
  },
});

export default authSlice.reducer;
