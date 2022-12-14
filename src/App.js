import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet";
// Screens
import Landing from "./screens/Landing.jsx";
import Auth from "./screens/Auth.jsx";
import Dashboard from "./screens/Dashboard.jsx";
import { UserContextProvider } from "./context/User";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

export default function App() {
  return (
    <>
      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Khula:wght@400;600;800&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <UserContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/*" element={<Landing />}></Route>
              <Route path="/auth/*" element={<Auth />}></Route>
              <Route path="/dashboard/*" element={<Dashboard />}></Route>
            </Routes>
          </BrowserRouter>
        </UserContextProvider>
      </LocalizationProvider>
    </>
  );
}
