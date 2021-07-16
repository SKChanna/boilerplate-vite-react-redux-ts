import { Middleware } from "redux";
import { RootState } from "../configureStore";

interface loggerParams {
    destination: string
}
const logger = (param: loggerParams):Middleware< {}, RootState> => (store) => (next) => (action) => {
  console.log('Logging', param);
  // console.log('next', next);
  // console.log('action', action);
  next(action);
};

export default logger;
