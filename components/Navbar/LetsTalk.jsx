import React from "react";
import { useSpring, animated } from "@react-spring/web";

// Same address used in `Contact` and `SiteFooter`. If any of these change,
// keep all three places in sync.
const EMAIL = "lakshrajsingh1000@gmail.com";

const LetsTalk = () => {
  const [springs, api] = useSpring(() => ({
    from: { x: 0 },
    x: -10,
  }));

  const [opacitySprings, opacityApi] = useSpring(() => ({
    opacity: 1,
    x: 0,
  }));

  const [opacitySpringsReverse, opacityApiReverse] = useSpring(() => ({
    opacity: 0,
    x: -10,
  }));

  const handleEmailClick = (e) => {
    // Open Gmail webmail compose in new tab if native mailto fails
    setTimeout(() => {
      window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}`, "_blank");
    }, 100);
  };

  return (
    <a
      href={`mailto:${EMAIL}`}
      onClick={handleEmailClick}
      aria-label={`Email ${EMAIL}`}
      className="nav_btn_lg nav_btn_dark flex items-center justify-center hover:bg-brblue py-6"
      onMouseEnter={() => {
        api.start({ x: 20 });
        opacityApi.start({ opacity: 0, x: 5 });
        opacityApiReverse.start({ opacity: 1, x: 3 });
      }}
      onMouseLeave={() => {
        api.start({ x: 0 });
        opacityApi.start({ opacity: 1, x: 0 });
        opacityApiReverse.start({ opacity: 0, x: -10 });
      }}
    >
      <animated.span style={opacitySpringsReverse} className="opacity-0">➔</animated.span>
      <animated.span style={springs}>LET'S TALK &nbsp;</animated.span>
      <animated.span style={opacitySprings}>&nbsp;•&nbsp;</animated.span>
    </a>
  );
};

export default LetsTalk;
