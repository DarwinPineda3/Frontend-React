import { createSlice } from '@reduxjs/toolkit';
import { AppDispatch } from 'src/store/Store';
import axios from 'src/utils/axios';

const API_URL = '/api/data/postData';

interface StateType {
  userProfile: any;
  page: number;
  totalPages: number;
  error: string | null;
}

const initialState: StateType = {
  userProfile: null,
  page: 1,
  totalPages: 1,
  error: null,
};

export const UserProfileSlice = createSlice({
  name: 'UserPost',
  initialState,
  reducers: {
    getProfileUser: (state, action) => {
      state.userProfile = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    // getFollowers: (state, action) => {
    //   state.followers = action.payload;
    // },
    // getPhotos: (state, action) => {
    //   state.gallery = action.payload;
    // },
    // onToggleFollow(state: StateType, action) {
    //   const followerId = action.payload;

    //   const handleToggle = map(state.followers, (follower) => {
    //     if (follower.id === followerId) {
    //       return {
    //         ...follower,
    //         isFollowed: !follower.isFollowed,
    //       };
    //     }

    //     return follower;
    //   });

    //   state.followers = handleToggle;
    // },
  },
});

export const {
  getProfileUser,
  setPage,
  setError, /*getFollowers, onToggleFollow, getPhotos*/ } = UserProfileSlice.actions;

export const fetchUser = (page = 1) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`${API_URL}`);
    const { results, count } = response.data;
    const totalPages = Math.ceil(count / 10);

    dispatch(getProfileUser({ results, currentPage: page, totalPages }));
    if (response.status === 200) {
      dispatch(getProfileUser({ data: response.data }));
    } else {
      dispatch(setError('fetch profile not found'));
    }
  } catch (err: any) {
    console.error('Error fetching mobile app detail:', err);
    dispatch(setError('Failed to fetch mobile app detail'));
  }
};

// export const fetchPosts = () => async (dispatch: AppDispatch) => {
//   try {
//     const response = await axios.get(`${API_URL}`);
//     dispatch(getProfileUser(response.data));
//   } catch (err: any) {
//     throw new Error(err);
//   }
// };
// export const likePosts = (postId: number) => async (dispatch: AppDispatch) => {
//   try {
//     const response = await axios.post('/api/data/userProfile/like', { postId });
//     dispatch(getProfileUser(response.data.userProfile));
//   } catch (err: any) {
//     throw new Error(err);
//   }
// };
// export const addComment = (postId: number, comment: any[]) => async (dispatch: AppDispatch) => {
//   try {
//     const response = await axios.post('/api/data/userProfile/comments/add', { postId, comment });
//     dispatch(getProfileUser(response.data.userProfile));
//   } catch (err: any) {
//     throw new Error(err);
//   }
// };

// export const addReply =
//   (postId: number, commentId: any[], reply: any[]) => async (dispatch: AppDispatch) => {
//     try {
//       const response = await axios.post('/api/data/userProfile/replies/add', {
//         postId,
//         commentId,
//         reply,
//       });
//       dispatch(getProfileUser(response.data.userProfile));
//     } catch (err: any) {
//       throw new Error(err);
//     }
//   };

// export const fetchFollwores = () => async (dispatch: AppDispatch) => {
//   try {
//     const response = await axios.get(`/api/data/users`);
//     dispatch(getFollowers(response.data));
//   } catch (err: any) {
//     throw new Error(err);
//   }
// };

// export const fetchPhotos = () => async (dispatch: AppDispatch) => {
//   try {
//     const response = await axios.get(`/api/data/gallery`);
//     dispatch(getPhotos(response.data));
//   } catch (err: any) {
//     throw new Error(err);
//   }
// };

export default UserProfileSlice.reducer;
