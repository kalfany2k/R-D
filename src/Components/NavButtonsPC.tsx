import ColorModeSwitch from "./ColorModeSwitch";
import { Text, Button } from "@chakra-ui/react";

export const navOptionList = ["How it works", "Become a partner", "Log in"];

interface Props {
  setShowHowItWorks: React.Dispatch<React.SetStateAction<boolean>>;
  setShowBecomeaPartner: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavButtonsPC = ({ setShowHowItWorks, setShowBecomeaPartner }: Props) => {
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
        if (option === 'How it works') {
          return (
            <Text 
              key={option} 
              fontSize="1xl" 
              fontWeight="semibold"
              onClick={() => setShowHowItWorks(prev => !prev)}
            >
              {option}
            </Text>
          );
        } else if (option === 'Become a partner') {
          return (
            <Text 
              key={option} 
              fontSize="1xl" 
              fontWeight="semibold"
              onClick={() => setShowBecomeaPartner(prev => !prev)}
            >
              {option}
            </Text>
          );
        } else {
          return (
            <Text key={option} fontSize="1xl" fontWeight="semibold">
              {option}
            </Text>
          );
        }
      })}

      <Button size="md" colorScheme="green">
        Sell tickets
      </Button>
    </div>
  );
};

export default NavButtonsPC;
