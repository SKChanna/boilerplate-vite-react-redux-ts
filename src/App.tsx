import React from 'react'
import store from "./store/configureStore";
import { Provider } from "react-redux";
import BugsList from './BugsList';

function App() {
  return (
    <Provider store={store}>
      <BugsList />
    </Provider>
  )
}

export default App
