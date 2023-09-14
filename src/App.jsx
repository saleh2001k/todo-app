import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ToDo from "./Components/Todo/index";
import SettingsPage from "./Components/Settings";
import Settings from "./Context/Settings/index.jsx";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import LoginProvider from './Context/AuthContext/LoginContext';
import ListsSaver from './Context/dataList/dataList';


export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <LoginProvider>
          <Settings>
            <ListsSaver>
              <Header />
              <Routes>
                <Route path='/' element={<ToDo />} />
                <Route path='/settings' element={<SettingsPage />} />
              </Routes>
              <Footer />
            </ListsSaver>
          </Settings>
        </LoginProvider>
      </BrowserRouter>
    );
  }
}
