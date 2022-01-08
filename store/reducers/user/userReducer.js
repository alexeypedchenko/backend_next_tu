import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isAuth: false,
    user: null,
  },
  reducers: {
    setAuth: (state, action) => {
      state.isAuth = action.payload
    },
    setUser: (state, action) => {
      state.user = action.payload
    },
  }
})

export const userActions = { ...userSlice.actions }
export const selectUser = (state) => state.user

export default userSlice.reducer
