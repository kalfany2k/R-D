import ColorModeSwitch from "./ColorModeSwitch";
import { Text, Button } from "@chakra-ui/react";
import LoginButton from "./LoginButton";
import UserDropdown from "./UserDropdown";

export const navOptionList = ["How it works", "Become a partner"];

interface Props {
  isLoggedIn: boolean;
}

const NavButtonsPC = ({ isLoggedIn }: Props) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "500px",
      }}
    >
      <ColorModeSwitch />
      {navOptionList.map((option) => {
        return (
          <Text
            className="nav-buttons-responsive"
            key={option}
            fontSize="1xl"
            fontWeight="semibold"
          >
            {option}
          </Text>
        );
      })}

      {isLoggedIn ? <UserDropdown /> : <LoginButton />}
    </div>
  );
};

export default NavButtonsPC;
