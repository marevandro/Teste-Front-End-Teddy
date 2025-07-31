import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  name: string;
}

const initialState: UserState = {
  name: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setUser(state, action: PayloadAction<Partial<UserState>>) {
      Object.assign(state, action.payload);
    },
    clearUser(state) {
      state.name = '';
    },
  },
});

export const { setName, setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
