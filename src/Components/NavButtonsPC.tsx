import ColorModeSwitch from "./ColorModeSwitch";
import { Text, Button } from "@chakra-ui/react";
import LoginButton from "./LoginButton";
import UserDropdown from "./UserDropdown";
import Cart from "./Cart";

export const navOptionList = ["How it works", "Create an event"];

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
        width: "550px",
      }}
    >
      <ColorModeSwitch />
      {navOptionList.map((option) => {
        return (
          <Text key={option} fontSize="1xl" fontWeight="semibold">
            {option}
          </Text>
        );
      })}
      {isLoggedIn ? (
        <>
          <Cart />
          <UserDropdown />
        </>
      ) : (
        <LoginButton>Log in</LoginButton>
      )}
    </div>
  );
};

export default NavButtonsPC;
