import React, { useContext } from "react";
import { useRoutes, useRedirect } from "hookrouter";
import { routes, guestRoutes } from "./Routes";
import AuthContext from "./contexts/AuthContext";

const Router = () => {
  const { user, uid } = useContext(AuthContext);
  const routeResult = useRoutes(user && uid ? routes : guestRoutes);
  
  console.log("Current User: ", user);

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
