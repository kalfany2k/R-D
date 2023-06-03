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
    }),
  },
});

export default theme;
