import React from "react";
import Home from "./components/Home";
import Login from "./components/Login";

export const routes = {
    "/": () => <Home />,
    "/login": () => <Login />,
};