'use client'


import {
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';


export type TReduxSliceAuth = {
  isInitialized: boolean;
  isLoggedIn: boolean;
};

const reduxSliceAuthInitial: TReduxSliceAuth = {
  isInitialized: false,
  isLoggedIn: false,
};

export const reduxSliceAuth = createSlice({
  initialState: reduxSliceAuthInitial,
  name: 'redux-slice-auth',
  reducers: {
    _resetStoreAuth: (state: TReduxSliceAuth) => {
      state.isInitialized = reduxSliceAuthInitial.isInitialized
      state.isLoggedIn = reduxSliceAuthInitial.isLoggedIn
    },
    _setAuthData: (state: TReduxSliceAuth, action: PayloadAction<Pick<TReduxSliceAuth, 'isLoggedIn'>>) => {
      state.isLoggedIn = action.payload.isLoggedIn;
    },
    _setAuthInitialized: (state: TReduxSliceAuth, action: PayloadAction<TReduxSliceAuth['isInitialized']>) => {
      state.isInitialized = action.payload;
    },
  },
});


/**
 * Обход бага с типизацией: https://stackoverflow.com/a/73571134/14140292
 */
export const { setAuthData } = { setAuthData: reduxSliceAuth.actions._setAuthData }
