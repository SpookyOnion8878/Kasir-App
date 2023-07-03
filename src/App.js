import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavbarComponent } from "./components";
import { Home, Sukses } from "./pages";

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <NavbarComponent />
        <main>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/sukses" element={<Sukses />} />
          </Routes>
        </main>
      </BrowserRouter>
    );
  }
}
