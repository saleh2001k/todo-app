import React from "react";

import ToDo from "./Components/Todo/index";
import Settings from "./Context/Settings/index.jsx";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

export default class App extends React.Component {
  render() {
    return (
      <>
        <Header/>
        <Settings>
          <ToDo />
        </Settings>
        <Footer/>
      </>
    );
  }
}
