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
      ".footer-app": {
        color: props.colorMode === "light" ? "white" : "black ",
      },
      ".footer-button": {
        backgroundColor: props.colorMode === "light" ? "black" : "white",
      }
    }),
  },
});

export default theme;
