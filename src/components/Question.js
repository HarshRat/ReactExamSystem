import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import { useFormik } from "formik";
import { auth, firestore } from "../firebase.config";

const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto py-10 lg:py-10`;

const FormContainer = styled.div`
  ${tw`p-10 sm:p-12 md:p-16 bg-primary-500 text-gray-100 rounded-lg relative`}
  form {
    ${tw`mt-4`}
  }
  h2 {
    ${tw`text-3xl sm:text-4xl font-bold`}
  }
  input,
  textarea {
    ${tw`w-full bg-transparent text-gray-100 text-base font-medium tracking-wide border-b-2 py-2 text-gray-100 hocus:border-pink-400 focus:outline-none transition duration-200`};

    ::placeholder {
      ${tw`text-gray-500`}
    }
  }
`;

const TwoColumn = tw.div`flex flex-col sm:flex-row justify-between`;
const Column = tw.div`sm:w-5/12 flex flex-col`;
const InputContainer = tw.div`relative py-5 mt-6`;
const Label = tw.label`absolute top-0 left-0 tracking-wide font-semibold text-sm`;
const Input = tw.input``;
const TextArea = tw.div`h-24 sm:h-full`;
const SubmitButton = tw.button`w-full sm:w-48 mt-6 py-3 bg-gray-100 text-primary-500 rounded-full font-bold tracking-wide shadow-lg uppercase text-sm transition duration-300 transform focus:outline-none focus:shadow-outline hover:bg-gray-300 hover:text-primary-700 hocus:-translate-y-px hocus:shadow-xl cursor-pointer`;

const Forms = (props) => {
  const [questionData, setQuestionData] = React.useState(null);
  const [options, setOptions] = React.useState(null);

  React.useEffect(() => {
    let arr = [];
    firestore
      .collection("test")
      .doc(props.code)
      .collection("questions")
      .doc(props.questionNo.toString())
      .get()
      .then((values) => {
        setQuestionData(values.data());
        arr.push(values.data().correctAnswer);
        arr.push(values.data().option1);
        arr.push(values.data().option2);
        arr.push(values.data().option3);
        arr = shuffle(arr);
        setOptions(arr);
        console.log(values.data());
      });
  }, [props]);

  function shuffle(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  const [selectedOption, setSelectedOption] = React.useState(null);

  const formik = useFormik({
    initialValues: {},
    onSubmit: () => {
      let values = {};
      console.log(options[selectedOption], questionData.correctAnswer);
      if (options[selectedOption] === questionData.correctAnswer) {
        values.given = "correct";
      } else {
        values.given = "incorrect";
      }
      firestore
        .collection("test")
        .doc(props.code)
        .collection("attempts")
        .doc(auth.currentUser.uid)
        .set({ exists: "true" })
        .collection("answers")
        .doc(props.questionNo.toString())
        .set(values)
        .then(() => {
          alert("Answer uploaded.");
        })
        .catch((e) => console.log("ERR", e));
    },
  });

  return (
    <Container>
      <Content>
        <FormContainer>
          <div tw="mx-auto max-w-4xl">
            <h2>Question {props.questionNo}</h2>
            <form onSubmit={formik.handleSubmit}>
              <InputContainer tw="flex-1">
                <Label htmlFor="name-input">Question</Label>
                <div id="name-input" name="question" tw="left-0 absolute pt-2">
                  {questionData && questionData.question}
                </div>
              </InputContainer>
              <TwoColumn>
                <Column>
                  <div tw="mt-4">
                    <div
                      tw="mt-2 flex-row justify-start"
                      onClick={() => setSelectedOption(0)}
                    >
                      <input
                        type="radio"
                        className="form-radio"
                        name="option"
                        value="0"
                      />
                      <span tw="ml-2">{options && options[0]}</span>
                    </div>
                  </div>
                  <div tw="mt-4">
                    <div
                      tw="mt-2 flex-row justify-start"
                      onClick={() => setSelectedOption(2)}
                    >
                      <input
                        type="radio"
                        className="form-radio"
                        name="option"
                        value="2"
                      />
                      <span tw="ml-2">{options && options[2]}</span>
                    </div>
                  </div>
                </Column>
                <Column>
                  <div tw="mt-4">
                    <div
                      tw="mt-2 flex-row justify-start"
                      onClick={() => setSelectedOption(1)}
                    >
                      <input
                        type="radio"
                        className="form-radio"
                        name="option"
                        value="1"
                      />
                      <span tw="ml-2">{options && options[1]}</span>
                    </div>
                  </div>
                  <div tw="mt-4">
                    <div
                      tw="mt-2 flex-row justify-start"
                      onClick={() => setSelectedOption(3)}
                    >
                      <input
                        type="radio"
                        className="form-radio"
                        name="option"
                        value="3"
                      />
                      <span tw="ml-2">{options && options[3]}</span>
                    </div>
                  </div>
                </Column>
              </TwoColumn>
              <SubmitButton type="submit" value="Submit">
                Submit
              </SubmitButton>
            </form>
          </div>
        </FormContainer>
      </Content>
    </Container>
  );
};

export default Forms;
