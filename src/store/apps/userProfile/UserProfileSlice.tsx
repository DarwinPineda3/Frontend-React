import axios from 'src/utils/axios';
import { createSlice } from '@reduxjs/toolkit';
import { map } from 'lodash';
import { AppDispatch } from 'src/store/Store';

const API_URL = '/api/data/postData';

interface StateType {
  posts: any[];
  followers: any[];
  gallery: any[];
}

const initialState = {
  posts: [],
  followers: [],
  gallery: [],
};

const UserProfileSlice = createSlice({
  name: 'UserPost',
  initialState,
  reducers: {
    getPosts: (state, action) => {
      state.posts = action.payload;
    },
    getFollowers: (state, action) => {
      state.followers = action.payload;
    },
    getPhotos: (state, action) => {
      state.gallery = action.payload;
    },
    onToggleFollow(state: StateType, action) {
      const followerId = action.payload;

      const handleToggle = map(state.followers, (follower) => {
        if (follower.id === followerId) {
          return {
            ...follower,
            isFollowed: !follower.isFollowed,
          };
        }

        return follower;
      });

      state.followers = handleToggle;
    },
  },
});

export default UserProfileSlice.reducer;
