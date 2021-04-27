import React from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/Signup";
import Create from "./components/Create";
import Give from "./components/Give";
import TestLink from "./components/TestLink";
import ResultForm from "./components/ResultForm";
import Results from "./components/Results";
import GuestHome from "./components/GuestHome";

export const routes = {
  "/": () => <Home />,
  "/create": () => <Create />,
  "/give": () => <Give />,
  "/testlink/:code": ({ code }) => <TestLink code={code} />,
  "/results/:code": ({ code }) => <Results code={code} />,
  "/getResult": () => <ResultForm />,
};

export const guestRoutes = {
  "/login": () => <Login />,
  "/signup": () => <SignUp />,
  "/": () => <GuestHome />,
};
