import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUnreadNotifications as getUnreadNotificationsApi } from '../../api/Notifications/Notifications';

const initialState = {
  entities: [],
  loading: false,
  unreadCount: 0, // Added to keep track of the count of unread notifications
};

export const fetchUnreadNotifications = createAsyncThunk(
  'notifications/fetchUnreadNotifications',
  async (_, { getState }) => {
    const { auth } = getState();
    if (auth?.token) {
      const response = await getUnreadNotificationsApi(auth.token);
      console.log(response)
      return response;
    }
  }
);

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    markAsRead: (state, action) => {
      // Implement logic to mark notifications as read, if necessary
      // This could involve updating the state.entities and state.unreadCount
    },
    // Add reducers for other notification actions
  },
  extraReducers: {
    [fetchUnreadNotifications.pending]: (state) => {
      state.loading = true;
    },
    [fetchUnreadNotifications.fulfilled]: (state, action) => {
      state.entities = action.payload;
      state.unreadCount = action.payload.length;
      state.loading = false;
    },
    [fetchUnreadNotifications.rejected]: (state) => {
      state.loading = false;
    },
    // Add cases for other async thunks
  },
});

// Export actions and reducer
export const { markAsRead } = notificationSlice.actions;
export default notificationSlice.reducer;
