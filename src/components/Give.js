import React from "react";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import HeaderBase, {
  LogoLink as LogoLinkBase,
  NavLinks,
  PrimaryLink as PrimaryLinkBase,
} from "../headers/light.js";
import {
  Container as ContainerBase,
  ContentWithVerticalPadding,
  Content2Xl,
} from "../misc/Layouts.js";
import { SectionHeading } from "../misc/Headings.js";
import { SectionDescription } from "../misc/Typography.js";
import { PrimaryButton as PrimaryButtonBase } from "../misc/Buttons.js";
import serverIllustrationImageSrc from "../images/exams.svg";
import AnimationRevealPage from "../helpers/AnimationRevealPage";
import { auth, firestore } from "../firebase.config";
import { navigate } from "hookrouter";
import { v4 as uuidv4 } from "uuid";
import { useFormik } from "formik";

const PrimaryBackgroundContainer = tw.div`px-8 bg-primary-900 text-gray-100 min-h-screen`;
const Header = tw(HeaderBase)`max-w-none py-8 -mx-8 px-8`;
const LogoLink = tw(LogoLinkBase)`text-gray-100 hocus:text-gray-300`;
const PrimaryLink = tw(
  PrimaryLinkBase
)`shadow-raised lg:bg-primary-400 lg:hocus:bg-primary-500 cursor-pointer`;

const Container = tw(ContainerBase)``;
const Row = tw.div`flex items-center flex-col lg:flex-row`;
const TextColumn = tw.div`text-center lg:text-left`;
const Heading = tw(
  SectionHeading
)`max-w-3xl lg:max-w-4xl lg:text-left leading-tight`;
const Description = tw(
  SectionDescription
)`mt-4 max-w-2xl text-gray-100 lg:text-base mx-auto lg:mx-0`;
const PrimaryButton = tw(
  PrimaryButtonBase
)`mt-8 text-sm sm:text-base px-6 py-5 sm:px-10 sm:py-5 bg-primary-400 inline-block hocus:bg-primary-500`;
const Image = tw.img`w-144 ml-auto`;

const TwoColumn = tw.div`flex flex-col sm:flex-row justify-between`;
const Column = tw.div`sm:w-5/12 flex flex-col`;
const InputContainer = tw.div`relative py-5 mt-6`;
const Label = tw.label`absolute top-0 left-0 tracking-wide font-semibold text-sm`;
const Input = tw.input`w-full bg-transparent text-gray-100 text-base font-medium tracking-wide border-b-2 py-2 mb-10 text-gray-100 hocus:border-pink-400 focus:outline-none transition duration-200`;
const SubmitButton = tw.button`w-full m-20 mb-0 sm:w-48 mt-1 py-3 bg-gray-100 text-primary-500 rounded-full font-bold tracking-wide shadow-lg uppercase text-sm transition duration-300 transform focus:outline-none focus:shadow-outline hover:bg-gray-300 hover:text-primary-700 hocus:-translate-y-px hocus:shadow-xl cursor-pointer`;

const Give = ({
  heading = "Welcome to the NITC Online Examination Platform",
  description = "Platform with a sleek UI providing ease of use for creation and completion of MCQ tests",
  primaryButtonText = "Start Your 15 Day Free Trial",
  primaryButtonUrl = "/give",
  secondButtonUrl = "/create",
  imageSrc = serverIllustrationImageSrc,
}) => {
  const logoLink = <LogoLink href="/">Exam Platform</LogoLink>;

  const [userType, setUserTpe] = React.useState("student");
  React.useEffect(() => {
    if (auth.currentUser) {
      firestore
        .collection("user")
        .doc(auth.currentUser.uid)
        .get()
        .then((details) => {
          setUserTpe(details.data().userType);
          if (details.data().userType === "teacher") {
            navigate("/");
          }
        });
    }
  }, []);

  const [UUID, setUUID] = React.useState("");

  React.useEffect(() => {
    const id = uuidv4();
    setUUID(id);
  }, []);

  const navLinks = [
    <NavLinks key={1}>
      <PrimaryLink
        onClick={() => {
          auth.signOut();
          navigate("/login");
        }}
      >
        Sign Out
      </PrimaryLink>
    </NavLinks>,
  ];

  const formik = useFormik({
    initialValues: {
      code: "",
    },
    onSubmit: (values) => {
        navigate("/testlink/" + values.code);
    },
  });

  return (
    <AnimationRevealPage>
      <PrimaryBackgroundContainer>
        <Content2Xl>
          <Header logoLink={logoLink} links={navLinks} />
          <form onSubmit={formik.handleSubmit}>
            <div tw="bg-primary-500 rounded-lg p-20">
              <Container>
                <h2 tw="text-3xl sm:text-4xl font-bold">Enter code for test</h2>
                <InputContainer>
                  <Label htmlFor="code">Test code</Label>
                  <Input
                    id="code"
                    name="code"
                    onChange={formik.handleChange}
                    value={formik.values.code}
                  />
                </InputContainer>
              </Container>
              <SubmitButton type="submit" value="Submit">
                Submit
              </SubmitButton>
            </div>
          </form>
        </Content2Xl>
      </PrimaryBackgroundContainer>
    </AnimationRevealPage>
  );
};

export default Give;
