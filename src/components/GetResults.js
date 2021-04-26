import React from "react";
import { firestore } from "../firebase.config";

const GetResults = () => {
  React.useEffect(() => {
    firestore
      .collection("test")
      .doc("18e31ce1-2b70-45a4-8f87-eb66ac1147c0")
      .collection("attempts")
      .get()
      .then((snap) => {
        console.log(snap);
      });
  }, []);

  return <div>OK</div>;
};

export default GetResults;
