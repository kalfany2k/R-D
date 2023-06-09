import ColorModeSwitch from "./ColorModeSwitch";
import { Text, Button, background } from "@chakra-ui/react";
import LoginButton from "./LoginButton";
import {Link} from "react-router-dom";
import { color } from "framer-motion";

export const navOptionList = ["How it works", "Become a partner", "Log in"];

const NavButtonsPC = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "600px",
      }}
    >
      <ColorModeSwitch />
      {navOptionList.map((option) => {
        let linkTo="/";
        switch (option){
          case "How it works":
            linkTo="/how-it-works";
            

            break;
          case "Become a partner":
              linkTo="/become-a-partner";
              break;
          default:
                break;
        }
        return (
          <Link key={option} to={linkTo}>
          <Text  fontSize="1xl" fontWeight="semibold">
            {option}
          </Text>
          </Link>
        );
      })}

      <LoginButton />
    </div>
  );
};

export default NavButtonsPC;
