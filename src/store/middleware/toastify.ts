import { Middleware } from "redux";
import { RootState } from "../configureStore";

const toast: Middleware<{},RootState> = (state) => (next) => (action) => {
  if (action.type === 'error') console.log('Toastify:', action.payload.message);
  else next(action);
};

export default toast;
