import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import type { StyleFunctionProps } from "@chakra-ui/styled-system";
import { mode } from "@chakra-ui/theme-tools";
import bgDark from "../src/assets/pexels-belle-co-799959.jpg";
import bgLight from "../src/assets/pexels-daniel-dinu-849.jpg";

const config: ThemeConfig = {
  initialColorMode: "dark",
};

const theme = extendTheme({
  config,
  colors: {
    secondarySiteColor: "#8bd3dd",
    secondarySiteColorDark: "#e26e5d",
  },
  breakpoints: {
    sm: "30em", // 480px
    md: "48em", // 768px
    lg: "62em", // 992px
    xl: "80em", // 1280px
  },
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        bg: mode("#f3d2c1", "#0c2d3e")(props),
        color: mode("#172c66", "#e8d399")(props),
      },
      ".nav-search": {
        backgroundImage: mode(bgLight, bgDark)(props),
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      },
      ".login": {
        color: props.colorMode === "light" ? "white" : "#e8d399",
      },
      ".nav-buttons-responsive": {
        textShadow:
          props.colorMode === "light"
            ? "2px 2px 4px rgba(255, 255, 255, 0.7)"
            : "2px 2px 4px rgba(0, 0, 0, 0.7)",
      },
      ".search-bar-responsive": {
        width: { base: "85%", md: "70%", lg: "60%", xl: "50%" },
      },
      ".nav-log-in-button-theme": {
        bg: mode("secondarySiteColor", "secondarySiteColorDark")(props),
      },
      ".nav-welcome-button-theme": {
        backgroundColor: mode("secondarySiteColor", "#0c2d3e80")(props),
        _hover: { backgroundColor: mode("#1f77a380", "#8bd3dd")(props) },
        cursor: "pointer",
      },
      ".search-bar-theme": {
        backgroundColor: mode("", "rgba(255, 255, 255, 0.1)")(props),
        borderRadius: 20,
        color: "black",
      },
      ".euro-theme": {
        color: mode("green.700", "greenyellow")(props),
      },
      ".event-image-backdrop": {
        backdropFilter: mode(
          "blur(10px) brightness(1.2)",
          "blur(10px) brightness(0.5)"
        )(props),
      },
    }),
  },
});

export default theme;
