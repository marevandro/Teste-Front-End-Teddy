import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Defina o tipo do estado
interface UserState {
  name: string;
}

// Estado inicial com tipagem
const initialState: UserState = {
  name: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
  },
});

export const { setName } = userSlice.actions;
export default userSlice.reducer;
