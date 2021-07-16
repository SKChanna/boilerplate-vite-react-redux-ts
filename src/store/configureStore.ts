import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import {api} from './middleware/api';
import logger from './middleware/logger';
import toast from './middleware/toastify';
import reducer from './reducer';

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof reducer>
const store = configureStore({
  reducer,
  //  for vanila JS
  //  middleware: [
  //   ...getDefaultMiddleware(),
  //   // logger({ destination: 'console' }),
  //   // toast,
  //   api,
  // ],
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(
        // correctly typed middlewares can just be used
        logger({destination: 'console'}),
        toast,
        api,
        // you can also type middlewares manually
        // untypedMiddleware as Middleware<
        //   (action: Action<'specialAction'>) => number,
        //   RootState
        // >
      )
});
export default store;
// Inferred type: {Reducers}
export type AppDispatch = typeof store.dispatch