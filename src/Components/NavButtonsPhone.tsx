import "bootstrap-icons/font/bootstrap-icons.css";
import { VStack } from "@chakra-ui/react";
import Cart from "./CartComponent";
import { useState } from "react";

interface Props {
  isLoggedIn: boolean;
}

const NavButtonsPhone = ({ isLoggedIn }: Props) => {
  const [isMenuActive, setMenuActive] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <i
        onClick={() => setMenuActive(!isMenuActive)}
        className={!isMenuActive ? "bi bi-list" : "bi bi-x-circle"}
        style={{ fontSize: 40, marginRight: "10px" }}
      />
      {isLoggedIn && (
        <div style={{ marginRight: "5px" }}>
          <Cart />
        </div>
      )}
    </div>
  );
};

export default NavButtonsPhone;
