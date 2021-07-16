import { Middleware } from 'redux';
import axios from 'axios';
import * as actions from '../api';
import { RootState } from '../configureStore';

export const api: Middleware< {}, RootState> = ({ dispatch }) => (next) => async (action) => {
  if (action.type !== actions.apiCallBegan.type) return next(action);

  const { url, method, data, onStart, onSuccess, onError } = action.payload;

  if (onStart) dispatch({ type: onStart });
  next(action);

  try {
    const response = await axios.request({
      baseURL: 'http://localhost:9001/api',
      url,
      method,
      data,
    });
    dispatch(actions.apiCallSuccess(response.data));

    if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
  } catch (error) {
    dispatch(actions.apiCallFailed(error.message));
    dispatch({type: "error", payload: error});
    if (onError) dispatch({ type: onError, payload: error.message });
  }
};
