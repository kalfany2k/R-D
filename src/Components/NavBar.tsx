import { HStack, Show, Text } from "@chakra-ui/react";
import "bootstrap-icons/font/bootstrap-icons.css";
import NavButtonsPC from "./NavButtonsPC";
import NavButtonsPhone from "./NavButtonsPhone";
import { useEffect, useState } from "react";

interface Props {
  setMenuActive: () => void;
  isMenuActive: boolean;
}

const NavBar = ({ setMenuActive, isMenuActive }: Props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (
      localStorage.getItem("accessToken") !== null &&
      localStorage.getItem("sessionToken") !== null
    )
      setIsLoggedIn(true);
  }, []);

  return (
    <HStack
      display="flex"
      justifyContent="space-between"
      className="nav-buttons-responsive"
    >
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
        <Text fontSize="4xl" fontWeight="bold" paddingTop="2.5px">
          Ticket
        </Text>
      </div>

      <div style={{ marginRight: 10 }}>
        <Show above="md">
          <NavButtonsPC isLoggedIn={isLoggedIn} />
        </Show>

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
