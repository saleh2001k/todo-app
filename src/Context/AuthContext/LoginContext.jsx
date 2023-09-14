import React, { useEffect, useReducer } from 'react';
import cookie from 'react-cookies';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

import { initialState, loginReducer } from '../../hooks/Reducer/loginReducer';

export const LoginContext = React.createContext();

function LoginProvider(props) {
  const [loginData, dispatch] = useReducer(loginReducer, initialState);

  function can(capability) {
    return loginData.user.capabilities?.includes(capability);
  }

  async function login(username, password) {
    const { loggedIn, token, user } = loginData;

    try {
      const response = await axios.post('https://sample-back-end.onrender.com/signin', {}, {
        headers: { Authorization: `Basic ${btoa(`${username}:${password}`)}` }
      });

      const auth = response.data.message.user;

      if (auth) {
        validateToken(auth.token);
      }
    } catch (error) {
      setLoginState(loggedIn, token, user, error);
    }
  }

  function logout() {
    setLoginState(false, null, {});
  }

  function validateToken(token) {
    try {
      const validUser = jwt_decode(token);
      setLoginState(true, token, validUser);
    } catch (error) {
      setLoginState(false, null, {}, error);
    }
  }

  function setLoginState(loggedIn, token, user, error) {
    cookie.save('auth', token);
    dispatch({ type: 'changeLoginStatus', payload: loggedIn });
    dispatch({ type: 'changeToken', payload: token });
    dispatch({ type: 'changeUser', payload: user });
    dispatch({ type: 'changeError', payload: error });
  }

  useEffect(() => {
    function componentDidMount() {
      const qs = new URLSearchParams(window.location.search);
      const cookieToken = cookie.load('auth');
      const token = qs.get('token') || cookieToken || null;
      validateToken(token);
    }

    componentDidMount();
  }, []);

  return (
    <LoginContext.Provider value={{ can, login, logout, loginData, dispatch }}>
      {props.children}
    </LoginContext.Provider>
  );
}

export default LoginProvider;
