import React from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/Signup";
import Create from "./components/Create";
import Give from "./components/Give";
import TestLink from "./components/TestLink";
import GetResults from "./components/GetResults";

export const routes = {
    "/": () => <Home />,
    "/create": () => <Create />,
    "/give": () => <Give />,
    "/testlink/:code": ({code}) => <TestLink code={code} />,
    "/result": () => <GetResults />
};

export const guestRoutes = {
    "/login": () => <Login />,
    "/signup": () => <SignUp />,
}