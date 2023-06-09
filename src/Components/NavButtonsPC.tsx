import ColorModeSwitch from "./ColorModeSwitch";
import { Text, Button } from "@chakra-ui/react";
import LoginButton from "./LoginButton";
import UserDropdown from "./UserDropdown";
import Cart from "./CartComponent";
import { useNavigate } from "react-router-dom";

export const navOptionList = ["How it works", "Create an event"];

interface Props {
  isLoggedIn: boolean;
}

const NavButtonsPC = ({ isLoggedIn }: Props) => {
  const navigate = useNavigate();

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
          <Text
            onClick={() =>
              navigate("/" + option.toLowerCase().replace(/ /g, "-"))
            }
            key={option}
            fontSize="1xl"
            fontWeight="semibold"
          >
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
