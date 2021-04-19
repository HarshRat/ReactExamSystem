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
const TextArea = tw.textarea`h-24 sm:h-full resize-none`;
const SubmitButton = tw.button`w-full sm:w-48 mt-6 py-3 bg-gray-100 text-primary-500 rounded-full font-bold tracking-wide shadow-lg uppercase text-sm transition duration-300 transform focus:outline-none focus:shadow-outline hover:bg-gray-300 hover:text-primary-700 hocus:-translate-y-px hocus:shadow-xl cursor-pointer`;

const Forms = (props) => {
  React.useEffect(() => {
    console.log("prop", props);
  }, [props]);

  const formik = useFormik({
    initialValues: {
      question: "",
      correctAnswer: "",
      option1: "",
      option2: "",
      option3: "",
    },
    onSubmit: (values) => {
      console.log(values);
      firestore
        .collection("test")
        .doc(props.uuid)
        .collection("questions")
        .doc(props.questionNo.toString())
        .set(values)
        .then(() => {
          alert("Question uploaded.");
        })
        .catch((e) => console.log("ERR", e));
    },
  });

  return (
    <Container>
      <Content>
        <FormContainer>
          <div tw="mx-auto max-w-4xl">
            <h2>Add Question</h2>
            <form onSubmit={formik.handleSubmit}>
              <InputContainer tw="flex-1">
                <Label htmlFor="name-input">Question {props.questionNo}</Label>
                <TextArea
                  id="name-input"
                  name="question"
                  onChange={formik.handleChange}
                  value={formik.values.question}
                />
              </InputContainer>
              <TwoColumn>
                <Column>
                  <InputContainer>
                    <Label htmlFor="correct-answer">Correct Answer</Label>
                    <Input
                      id="correct-answer"
                      type="text"
                      name="correctAnswer"
                      onChange={formik.handleChange}
                      value={formik.values.correctAnswer}
                    />
                  </InputContainer>
                  <InputContainer>
                    <Label htmlFor="option-2">Option 2</Label>
                    <Input
                      id="option-2"
                      type="text"
                      name="option2"
                      onChange={formik.handleChange}
                      value={formik.values.option2}
                    />
                  </InputContainer>
                </Column>
                <Column>
                  <InputContainer>
                    <Label htmlFor="option-1">Option 1</Label>
                    <Input
                      id="option-1"
                      type="text"
                      name="option1"
                      onChange={formik.handleChange}
                      value={formik.values.option1}
                    />
                  </InputContainer>
                  <InputContainer>
                    <Label htmlFor="option-3">Option 3</Label>
                    <Input
                      id="option-3"
                      type="text"
                      name="option3"
                      onChange={formik.handleChange}
                      value={formik.values.option3}
                    />
                  </InputContainer>
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
