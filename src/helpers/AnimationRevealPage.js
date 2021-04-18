import React from "react";
import tw from "twin.macro";

/* framer-motion and useInView here are used to animate the sections in when we reach them in the viewport
 */

const StyledDiv = tw.div`font-display min-h-screen text-secondary-500 block overflow-visible`;
function AnimationReveal({ disabled, children }) {
  return <>{children}</>;
}

const AnimationRevealPage = (props) => (
  <StyledDiv className="App">
    <AnimationReveal {...props} />
  </StyledDiv>
);

export default AnimationRevealPage;
