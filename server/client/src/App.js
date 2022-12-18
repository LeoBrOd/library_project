import React from "react";
import { createContext, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.js";
import { Auth } from "./authentification/Auth.js";
import RegisterLogin from "./components/RegisterLogin.js";
import Home from "./components/Home.js";
import PrivatePage from "./components/PrivatePage.js";
import AddBook from "./components/Old/AddBook.js";
import Book from "./components/Book.js";
import PrivateNavbar from "./components/PrivateNavbar.js";
import BottomNavBar from "./components/BottomNavBar.js";

export const AppContext = createContext(null);

function App() {
  const [accessToken, setAccessToken] =
    useState();
  return (
    <AppContext.Provider
      value={{ accessToken, setAccessToken }}
    >
      <div className="App">
        {accessToken ? (
          <PrivateNavbar />
        ) : (
          <Navbar />
        )}
        <Routes>
          <Route
            path="/privatepage/:id"
            element={<PrivatePage />}
          />
          <Route
            path="/login"
            element={
              <RegisterLogin title="Login" />
            }
          />
          <Route
            path="/register"
            element={
              <RegisterLogin title="Register" />
            }
          />
          <Route path="/" element={<Home />} />
          <Route
            path="/addbook"
            element={
              <Auth>
                <AddBook />
              </Auth>
            }
          />
          <Route
            path="/books/:id"
            element={
              <Auth>
                <Book />
              </Auth>
            }
          />
        </Routes>
        <BottomNavBar />
      </div>
    </AppContext.Provider>
  );
}

export default App;
