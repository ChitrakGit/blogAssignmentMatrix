// src/authSlice.ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addBlog, addCommentApi, deleteBlog, editBlog, fetchBlog } from '../api/api';

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

export const fetchBlogCall = createAsyncThunk(
  'blog/get',
  async (pageNumber:number, thunkAPI): Promise<any> => {
    try {
      const result = await fetchBlog(pageNumber); 
      return result;
    } catch (err: any) {
      window.location.reload();
      return thunkAPI.rejectWithValue(err?.message);
    }
  }
);

export const addBlogCall = createAsyncThunk(
  'blog/add',
  async ({blog,isDone}:{[key:string]:string|boolean|number}, thunkAPI): Promise<any> => {
    try {
      console.log("====",blog)
      const result = await addBlog(blog as string,isDone as boolean); 
      return result;
    } catch (err: any) {
      window.location.reload();
      return thunkAPI.rejectWithValue(err?.message);
    }
  }
);


export const deleteBlogCall = createAsyncThunk(
  'blog/delete',
  async (_id:string, thunkAPI): Promise<any> => {
    try {
      const result = await deleteBlog(_id); 
      return result;
    } catch (err: any) {
      window.location.reload();
      return thunkAPI.rejectWithValue(err?.message);
    }
  }
);
export const addCommentCall = createAsyncThunk(
  'blog/comment',
  async ({comment,blogId}:{[key:string]:string|boolean|number}, thunkAPI): Promise<any> => {
    try {
      const result = await addCommentApi(comment as string, blogId as string); 
      return result;
    } catch (err: any) {
      window.location.reload();
      return thunkAPI.rejectWithValue(err?.message);
    }
  }
);



export const editBlogCall = createAsyncThunk(
  'blog/edit',
  async ({_id,payload}:{_id:string,payload:any}, thunkAPI): Promise<any> => {
    try {
      const result = await editBlog(_id,payload); 
      return result;
    } catch (err: any) {
      window.location.reload();
      return thunkAPI.rejectWithValue(err?.message);
    }
  }
);


const toDoSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBlogCall.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchBlogCall.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.data = action.payload;
    });
    builder.addCase(fetchBlogCall.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });

    builder.addCase(addBlogCall.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(addBlogCall.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.data = action.payload;
    });
    builder.addCase(addBlogCall.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });


    builder.addCase(deleteBlogCall.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(deleteBlogCall.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.data = action.payload;
    });
    builder.addCase(deleteBlogCall.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });

    builder.addCase(editBlogCall.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(editBlogCall.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.data = action.payload;
    });
    builder.addCase(editBlogCall.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });

    

    
  },
});

export default toDoSlice.reducer;
