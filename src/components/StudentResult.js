import React from "react";
import { firestore } from "../firebase.config";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line

const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto py-10 lg:py-10`;
const ResultContainer = tw.div`p-10 sm:p-12 md:p-16 bg-primary-500 text-gray-100 rounded-lg relative`;

const StudentResult = (props) => {
  const [user, setUser] = React.useState("");
  React.useEffect(() => {
    console.log("Ele: ", props.ele.id, props.questions);
    firestore
      .collection("user")
      .doc(props.ele.id)
      .get()
      .then((u) => setUser(u.data().email));
  }, [props]);

  const [results, setResults] = React.useState(null);
  React.useEffect(() => {
    let ans = [];
    firestore
      .collection("test")
      .doc(props.code)
      .collection("attempts")
      .doc(props.ele.id)
      .collection("answers")
      .get()
      .then((result) => {
        result.forEach((doc) => {
          ans.push(doc);
        });
        setResults(ans);
      });
  }, [props]);

  React.useEffect(() => {
    console.log("RESULTS: ", results);
    let temp = 0;
    results.forEach((res) => {
      if (res.data().given === "correct") {
        temp += 1;
      }
    });

    setMarks(temp);
  }, [results]);

  const [marks, setMarks] = React.useState(0);

  return (
    <Container>
      <Content>
        <ResultContainer>
          {user}
          <br /><br />
          {results &&
            results.map((res, i) => {
              return (
                <div>
                  {i + 1}: {res.data().given}
                  <br />
                </div>
              );
            })}
          Marks: {marks}/{props.questions}
        </ResultContainer>
      </Content>
    </Container>
  );
};

export default StudentResult;
