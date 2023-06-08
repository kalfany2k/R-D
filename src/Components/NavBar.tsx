import { HStack, Show, Text } from "@chakra-ui/react";
import "bootstrap-icons/font/bootstrap-icons.css";
import NavButtonsPC from "./NavButtonsPC";
import NavButtonsPhone from "./NavButtonsPhone";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  setMenuActive: () => void;
  isMenuActive: boolean;
}

const NavBar = ({ setMenuActive, isMenuActive }: Props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

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
        onClick={() => navigate("/")}
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          paddingLeft: 15,
          cursor: "pointer",
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
          <NavButtonsPhone isLoggedIn={isLoggedIn} />
        </Show>
      </div>
    </HStack>
  );
};

export default NavBar;
