import React, { useContext, useState } from 'react';
import { LoginContext } from '../../Context/AuthContext/LoginContext';
import { Button, Center, Flex, Input } from '@mantine/core';
import { When } from 'react-if';
import './LoginForm.scss';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, logout, loginData } = useContext(LoginContext);

  function handleLoginSub(e) {
    e.preventDefault();
    login(username, password);
  }

  function handlePwChange(e) {
    setPassword(e.target.value);
  }

  function handleUnChange(e) {
    setUsername(e.target.value);
  }

  return (
    <>
      <When condition={loginData.loggedIn}>
        <Button className="logout-button" color="red" onClick={logout}>
          Log Out
        </Button>
      </When>
      <When condition={!loginData.loggedIn}>
        <form onSubmit={handleLoginSub}>
          <Flex className="login-form" direction="column" justify="center" align="center">
            <Input
              className="login-input"
              onChange={handleUnChange}
              placeholder="Username"
              required
            />
            <Input
              className="login-input"
              onChange={handlePwChange}
              placeholder="Password"
              required
              type="password"
            />
            <Button className="login-button" type="submit">
              Login
            </Button>
          </Flex>
        </form>
      </When>
    </>
  );
}
