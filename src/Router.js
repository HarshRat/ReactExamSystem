import React, { useContext } from "react";
import { useRoutes, useRedirect } from "hookrouter";
import { routes, guestRoutes } from "./Routes";
// import NotFound from "./components/pages/NotFound";
// import AuthContext from "./contexts/AuthContext";
// import LanguageContext from './contexts/LanguageContext';

const Router = () => {
  useRedirect("/register", "/contest");

//   const { user, uid } = useContext(AuthContext);
//   // const language = useContext(LanguageContext).data;
//   const routeResult = useRoutes(user && uid ? routes : guestRoutes);

  const routeResult = useRoutes(routes);

  return (
    <React.Fragment>
      <div
        style={{
          flex: 1,
        }}
      >
        {routeResult || <div>404 Page Not Found</div>}
      </div>
    </React.Fragment>
  );
};

export default Router;
