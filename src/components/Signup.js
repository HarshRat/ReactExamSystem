import React from "react";
import AnimationRevealPage from "../helpers/AnimationRevealPage.js";
import { Container as ContainerBase } from "../misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import illustration from "../images/signup.svg";
import { ReactComponent as CircleCheckIcon } from "feather-icons/dist/icons/check.svg";
import { ReactComponent as LoginIcon } from "feather-icons/dist/icons/log-in.svg";
import { useFormik } from "formik";
import { auth, firestore } from "../firebase.config";
import { navigate } from "hookrouter";

const Container = tw(
  ContainerBase
)`min-h-screen bg-primary-900 text-white font-medium flex justify-center`;
const Content = tw.div`max-w-screen-xl m-0 sm:mx-20 sm:my-16 bg-white text-gray-900 shadow sm:rounded-lg flex justify-center flex-1`;
const MainContainer = tw.div`lg:w-1/2 xl:w-5/12 p-6 sm:p-12`;
const MainContent = tw.div`mt-12 flex flex-col items-center`;
const Heading = tw.h1`text-2xl xl:text-3xl font-extrabold`;
const FormContainer = tw.div`w-full flex-1 mt-8`;

const Form = tw.form`mx-auto max-w-xs`;
const ErrorMessage = tw.div`text-red-600 -mb-2 mt-3`;
const Input = tw.input`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0`;
const SubmitButton = styled.button`
  ${tw`mt-5 tracking-wide font-semibold bg-primary-500 text-gray-100 w-full py-4 rounded-lg hover:bg-primary-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
  .icon {
    ${tw`w-6 h-6 -ml-2`}
  }
  .text {
    ${tw`ml-3`}
  }
`;
const IllustrationContainer = tw.div`sm:rounded-r-lg flex-1 bg-purple-100 text-center hidden lg:flex justify-center`;
const IllustrationImage = styled.div`
  ${(props) => `background-image: url("${props.imageSrc}");`}
  ${tw`m-12 xl:m-16 w-full max-w-sm bg-contain bg-center bg-no-repeat`}
`;

const validate = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = "Email Required";
  } else if (!/^[A-Z0-9._%+-]+@nitc.ac.in$/i.test(values.email)) {
    errors.email = "Use NITC Mail";
  }

  if (!values.password) {
    errors.password = "Password Required";
  }

  return errors;
};

const SignUp = ({
  logoLinkUrl = "#",
  illustrationImageSrc = illustration,
  headingText = "Sign Up To Exam Platform",
  submitButtonText = "Sign Up",
  SubmitButtonIcon = LoginIcon,
  forgotPasswordUrl = "#",
  signupUrl = "/login",
}) => {
  const asyncLocalStorage = {
    setItem: function (key, value) {
      return Promise.resolve().then(function () {
        localStorage.setItem(key, value);
      });
    },
    getItem: function (key) {
      return Promise.resolve().then(function () {
        return localStorage.getItem(key);
      });
    },
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: (values) => {
      auth
        .createUserWithEmailAndPassword(values.email, values.password)
        .then(({user}) => {
          const data = {
            email: values.email,
            userType: userType,
          };
          firestore
            .collection("user")
            .doc(user.uid)
            .set(data)
            .then(() => {
              asyncLocalStorage.setItem("email", values.email);
              asyncLocalStorage.setItem("userType", userType);
              navigate("/");
            })
            .catch((e) => {
                alert("Error: ", e.message);
            });
        })
        .catch((err) => {
          alert("Sign Up Error: ", err.message);
          console.log("err: ", err);
        });
    },
  });

  const [userType, setUserType] = React.useState("student");

  return (
    <AnimationRevealPage>
      <Container>
        <Content>
          <MainContainer>
            <MainContent>
              <Heading>{headingText}</Heading>
              <FormContainer>
                <br />
                <Form onSubmit={formik.handleSubmit}>
                  <div tw="flex flex-col">
                    <label tw="mb-1 cursor-pointer rounded p-2 bg-gray-300 text-gray-900 text-center font-semibold text-sm">
                      <input
                        type="radio"
                        name="age"
                        tw="invisible"
                        value="teacher"
                        onClick={() => setUserType("teacher")}
                      />
                      Teacher
                    </label>
                    {userType === "teacher" && (
                      <CircleCheckIcon tw="h-5 w-5 p-1 -mt-3 mx-auto bg-green-700 rounded-full text-white" />
                    )}
                    <label tw="mt-1 p-2 cursor-pointer rounded bg-black text-white text-center font-semibold text-sm">
                      <input
                        type="radio"
                        name="age"
                        tw="invisible"
                        value="student"
                        onClick={() => setUserType("student")}
                      />
                      Student
                    </label>
                    {userType === "student" && (
                      <CircleCheckIcon tw="h-5 w-5 p-1 -mt-3 mx-auto bg-green-700 rounded-full text-white" />
                    )}
                  </div>
                  {formik.errors.email ? (
                    <ErrorMessage>{formik.errors.email}</ErrorMessage>
                  ) : null}
                  <Input
                    type="email"
                    placeholder="Email"
                    autoComplete="email"
                    name="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                  />
                  {formik.errors.password ? (
                    <ErrorMessage>{formik.errors.password}</ErrorMessage>
                  ) : null}
                  <Input
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                  />
                  <SubmitButton type="submit">
                    <SubmitButtonIcon className="icon" />
                    <span className="text">{submitButtonText}</span>
                  </SubmitButton>
                </Form>
                <p tw="mt-8 text-sm text-gray-600 text-center">
                  Already have an account?{" "}
                  <a
                    href={signupUrl}
                    tw="border-b border-gray-500 border-dotted"
                  >
                    Log In
                  </a>
                </p>
              </FormContainer>
            </MainContent>
          </MainContainer>
          <IllustrationContainer>
            <IllustrationImage imageSrc={illustrationImageSrc} />
          </IllustrationContainer>
        </Content>
      </Container>
    </AnimationRevealPage>
  );
};

export default SignUp;
