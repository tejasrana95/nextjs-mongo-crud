import React, { createContext, useReducer, useEffect, useContext } from 'react';
import axios from 'axios';
import ListPage from '../pages/customer/list';

const CustomerContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'set':
      return action.data;
    case 'clear':
      return {
        data: [],
      };
    default:
      throw new Error();
  }
};

const CustomerContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, { data: [] });
  const dispatchProxy = (action) => {
    switch (action.type) {
      case 'fetch':
        return axios.get('/api/customer')
          .then(res => ({
            data: res.data,
          }))
          .then((data) => {
            dispatch({
              type: 'set',
              data: data,
            });
          });
      default:
        return dispatch(action);
    }
  };
  useEffect(() => {
    dispatchProxy({ type: 'fetch' });
  }, []);
  return (
    <CustomerContext.Provider value={{ state, dispatch: dispatchProxy }}>
      <ListPage />
    </CustomerContext.Provider>
  );
};


const CustomerContextConsumer = CustomerContext.Consumer;

export { CustomerContext, CustomerContextProvider, CustomerContextConsumer };
