'use client'

import {
  isDayjs,
  locale,
} from 'dayjs';

import {
  configureStore,
  isPlain,
} from '@reduxjs/toolkit';
import { ConfigureStoreOptions } from "@reduxjs/toolkit/dist/configureStore";
import { SerializableStateInvariantMiddlewareOptions } from '@reduxjs/toolkit/src/serializableStateInvariantMiddleware';


import { isProduction } from 'config/app/env';
import {
  reduxSliceApp,
  TReduxSliceApp,
} from 'stores/redux/slices/app';
import {
  reduxSliceAuth,
  TReduxSliceAuth,
} from 'stores/redux/slices/auth';
import {
  reduxSliceCart,
  TReduxSliceCart,
} from "stores/redux/slices/cart";
import {
  reduxSliceCatalogue,
  TReduxSliceCatalogue,
} from 'stores/redux/slices/catalogue';
import {
  reduxSliceCompareProducts,
  TReduxSliceCompareProducts, 
} from "stores/redux/slices/compare";
import {
  reduxSliceFavorites,
  TReduxSliceFavorites,
} from "stores/redux/slices/favorites";
import {
  reduxSliceLayout,
  TReduxSliceLayout,
} from 'stores/redux/slices/layout';
import {
  reduxSliceSettings,
  TReduxSliceSettings,
} from "stores/redux/slices/settings";
import {
  reduxSliceUser,
  TReduxSliceUser,
} from "stores/redux/slices/user";
import { DeepPartial } from "types/types";
import { lodashMerge } from "utils/lodash";


const isSerializable = (value: unknown) => isPlain(value) || isDayjs(value) || value instanceof Date || value instanceof locale;

const getEntries: (value: unknown) => [string, unknown][] = (value: unknown) =>
  isDayjs(value) ? Object.entries(value).filter(([ key ]) => !key.startsWith('_')) : Object.entries(value as Record<string, unknown>);

/**
 * Позволяет делать исключения в проверке на "простые объекты" внутри redux
 *
 * Подробнее: https://redux.js.org/tutorials/fundamentals/part-3-state-actions-reducers#designing-the-state-structure
 */
const serializableCheck: SerializableStateInvariantMiddlewareOptions = {
  getEntries,
  isSerializable,
};

/**
 * Стор приложения
 */
export type TReduxStore = {
  app: TReduxSliceApp;
  auth: TReduxSliceAuth;
  cart: TReduxSliceCart;
  catalogue: TReduxSliceCatalogue;
  compare: TReduxSliceCompareProducts;
  favorites: TReduxSliceFavorites;
  layout: TReduxSliceLayout;
  settings: TReduxSliceSettings;
  user: TReduxSliceUser;
}

/**
 * middleware
 */
const REDUX_STORE_MIDDLEWARE: ConfigureStoreOptions<TReduxStore>['middleware'] = getDefaultMiddleware => getDefaultMiddleware({ serializableCheck })

/**
 * Редьюсеры
 */
const REDUX_STORE_REDUCER: ConfigureStoreOptions<TReduxStore>['reducer'] = {
  app: reduxSliceApp.reducer,
  auth: reduxSliceAuth.reducer,
  cart: reduxSliceCart.reducer,
  catalogue: reduxSliceCatalogue.reducer,
  compare: reduxSliceCompareProducts.reducer,
  favorites: reduxSliceFavorites.reducer,
  layout: reduxSliceLayout.reducer,
  settings: reduxSliceSettings.reducer,
  user: reduxSliceUser.reducer,
}

const REDUX_STORE_REDUCER_KEYS = Object.keys(REDUX_STORE_REDUCER)

/**
 * Дефолтный стор
 */
export const reduxStoreInitial = configureStore({
  devTools: !isProduction(),
  middleware: REDUX_STORE_MIDDLEWARE,
  reducer: REDUX_STORE_REDUCER,
});


export type TCreateReduxStoreArgs = {
  preloadedState: DeepPartial<TReduxStore>;
}

/**
 * Функция создания стора с добавлением preloadedState
 */
export const createReduxStore = (args: TCreateReduxStoreArgs) => {

  const initialState = reduxStoreInitial.getState()
  const initialStateUnlocked = JSON.parse(JSON.stringify(initialState));

  const preloadedState = lodashMerge(initialStateUnlocked, args.preloadedState) as TReduxStore

  Object
    .keys(preloadedState)
    .forEach(key => {
      if (!REDUX_STORE_REDUCER_KEYS.find(k => k === key)){
        delete preloadedState[key as keyof TReduxStore]
      }
    })

  return configureStore({
    devTools: !isProduction(),
    middleware: REDUX_STORE_MIDDLEWARE,
    preloadedState,
    reducer: REDUX_STORE_REDUCER,
  });
}
