import ColorModeSwitch from "./ColorModeSwitch";
import { Text, Button } from "@chakra-ui/react";

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
        return (
          <Text key={option} fontSize="1xl" fontWeight="semibold">
            {option}
          </Text>
        );
      })}

      <Button size="md" colorScheme="green">
        Sell tickets
      </Button>
    </div>
  );
};

export default NavButtonsPC;
