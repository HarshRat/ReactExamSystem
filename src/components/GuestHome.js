import React from "react";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import HeaderBase, {
  LogoLink as LogoLinkBase,
  NavLinks,
  NavLink as NavLinkBase,
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

const PrimaryBackgroundContainer = tw.div`px-8 bg-primary-900 text-gray-100 min-h-screen`;
const Header = tw(HeaderBase)`max-w-none py-8 -mx-8 px-8`;
const NavLink = tw(
  NavLinkBase
)`lg:text-gray-100 lg:hocus:text-gray-300 lg:hocus:border-gray-100`;
const LogoLink = tw(LogoLinkBase)`text-gray-100 hocus:text-gray-300`;
const PrimaryLink = tw(
  PrimaryLinkBase
)`shadow-raised lg:bg-primary-400 lg:hocus:bg-primary-500 cursor-pointer`;

const Container = tw(ContainerBase)``;
const Row = tw.div`flex items-center flex-col lg:flex-row`;
const Column = tw.div`lg:w-1/2`;
const TextColumn = tw.div`text-center lg:text-left`;
const IllustrationColumn = tw(Column)`mt-16 lg:mt-0 lg:ml-16`;
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

const Home = ({
  heading = "Welcome to the NITC Online Examination Platform",
  description = "Platform with a sleek UI providing ease of use for creation and completion of MCQ tests",
  primaryButtonText = "Start Your 15 Day Free Trial",
  primaryButtonUrl = "/give",
  secondButtonUrl = "/create",
  imageSrc = serverIllustrationImageSrc,
}) => {
  const logoLink = <LogoLink href="/">Exam Platform</LogoLink>;

  const navLinks = [
    <NavLinks key={1}>
      <NavLink href="/login">Login</NavLink>
      <PrimaryLink href="/signup">Sign Up</PrimaryLink>
    </NavLinks>,
  ];

  return (
    <AnimationRevealPage>
      <PrimaryBackgroundContainer>
        <Content2Xl>
          <Header logoLink={logoLink} links={navLinks} />
          <Container>
            <ContentWithVerticalPadding>
              <Row>
                <TextColumn>
                  <Heading>{heading}</Heading>
                  <Description>{description}</Description>
                  <PrimaryButton as="a" href="/login">
                    Login
                  </PrimaryButton>
                </TextColumn>
                <IllustrationColumn>
                  <Image src={imageSrc} />
                </IllustrationColumn>
              </Row>
            </ContentWithVerticalPadding>
          </Container>
        </Content2Xl>
      </PrimaryBackgroundContainer>
    </AnimationRevealPage>
  );
};

export default Home;
