import axios from 'src/utils/axios';
import { createSlice } from '@reduxjs/toolkit';
import { AppDispatch } from 'src/store/Store';

interface StateType {
  blogposts: any[];
  recentPosts: any[];
  blogSearch: string;
  sortBy: string;
  selectedPost: any;
}

const initialState = {
  blogposts: [],
  recentPosts: [],
  blogSearch: '',
  sortBy: 'newest',
  selectedPost: null,
};

const BlogSlice = createSlice({
  name: 'Blog',
  initialState,
  reducers: {
    getPosts: (state: StateType, action) => {
      state.blogposts = action.payload;
    },
    getPost: (state: StateType, action) => {
      state.selectedPost = action.payload;
    },
  },
});

export default BlogSlice.reducer;
