import "bootstrap-icons/font/bootstrap-icons.css";
import { VStack } from "@chakra-ui/react";

interface Props {
  onActiveMenu: () => void;
  isMenuActive: boolean;
}

const NavButtonsPhone = ({ onActiveMenu, isMenuActive }: Props) => {
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
        onClick={onActiveMenu}
        className={isMenuActive ? "bi bi-list" : "bi bi-x-circle"}
        style={{ fontSize: 40 }}
      ></i>
      {isMenuActive ? <VStack></VStack> : ""}
    </div>
  );
};

export default NavButtonsPhone;
