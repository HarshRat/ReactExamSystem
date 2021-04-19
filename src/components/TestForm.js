import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import { useFormik } from "formik";
import { auth, firestore } from "../firebase.config";

const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto py-4 lg:py-4`;

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
const SubmitButton = tw.button`w-full sm:w-32 mt-6 py-3 bg-gray-100 text-primary-500 rounded-full font-bold tracking-wide shadow-lg uppercase text-sm transition duration-300 transform focus:outline-none focus:shadow-outline hover:bg-gray-300 hover:text-primary-700 hocus:-translate-y-px hocus:shadow-xl`;

const Forms = (props) => {
  const formik = useFormik({
    initialValues: {
      testName: "",
      subject: "",
      user: auth.currentUser.uid,
    },
    onSubmit: (values) => {
      console.log(values);
      const data = { testName: values.testName, subject: values.subject };
      firestore
        .collection("user")
        .doc(auth.currentUser.uid)
        .collection("test")
        .doc(props.uuid)
        .set(data);
      firestore.collection("test").doc(props.uuid).set(values);
      alert("Test Details Uploaded");
    },
  });

  return (
    <Container>
      <Content>
        <FormContainer>
          <div tw="mx-auto max-w-4xl">
            <h2>Create Test</h2>
            <form onSubmit={formik.handleSubmit}>
              <InputContainer>
                <Label htmlFor="test-name-input">Test Name</Label>
                <Input
                  id="test-name-input"
                  type="text"
                  name="testName"
                  onChange={formik.handleChange}
                  value={formik.values.testName}
                />
              </InputContainer>
              <InputContainer>
                <Label htmlFor="subject-input">Subject Name</Label>
                <Input
                  id="subject-input"
                  name="subject"
                  onChange={formik.handleChange}
                  value={formik.values.subject}
                />
              </InputContainer>

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
