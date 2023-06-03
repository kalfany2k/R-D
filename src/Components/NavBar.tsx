
import { HStack, Show,Text } from "@chakra-ui/react";
import "bootstrap-icons/font/bootstrap-icons.css";
import NavButtonsPC from "./NavButtonsPC";
import NavButtonsPhone from "./NavButtonsPhone";

interface Props {
  setMenuActive: () => void;
  isMenuActive: boolean;
  setShowHowItWorks: React.Dispatch<React.SetStateAction<boolean>>;
  setShowBecomeaPartner:React.Dispatch<React.SetStateAction<boolean>>;
}

const NavBar = ({ setMenuActive, isMenuActive, setShowHowItWorks, setShowBecomeaPartner}: Props) => {
  return (
    <HStack display="flex" justifyContent="space-between">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          paddingLeft: 15,
        }}
      >
        <i
          className="bi bi-ticket-perforated"
          style={{ fontSize: 50, paddingRight: 10 }}
        ></i>
        <Text fontSize="4xl" fontWeight="bold">
          Ticket
        </Text>
      </div>

      <div style={{ paddingRight: 15 }}>
        <Show above="md">
          <NavButtonsPC setShowHowItWorks={setShowHowItWorks}
          setShowBecomeaPartner={setShowBecomeaPartner} /></Show>

        <Show below="md">
          <NavButtonsPhone
            isMenuActive={isMenuActive}
            onActiveMenu={setMenuActive}
          />
        </Show>
      </div>
    </HStack>
  );
};

export default NavBar;
