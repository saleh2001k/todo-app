import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ToDo from "./Components/Todo/index";
import Settings from "./Components/Settings";
import { SettingsProvider } from "./Context/Settings/index.jsx";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

export default class App extends React.Component {
  render() {
    return (
      <SettingsProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<ToDo />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </SettingsProvider>
    );
  }
}
