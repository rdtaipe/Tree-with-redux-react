import { configureStore } from '@reduxjs/toolkit'
import { getDefaultMiddleware } from '@reduxjs/toolkit';

import State from './States/State'
export default configureStore({
  reducer: {
    State,
  },
  middleware: getDefaultMiddleware({//middleware config
    serializableCheck: false,
    }),
})