import "bootstrap-icons/font/bootstrap-icons.css";
import { useState } from "react";
import { navOptionList } from "./NavButtonsPC";
import { VStack } from "@chakra-ui/react";

interface Props {
  onActiveMenu: () => void;
  isMenuActive: boolean;
}

const NavButtonsPhone = ({ onActiveMenu, isMenuActive }: Props) => {
  return (
    <>
      <i
        onClick={onActiveMenu}
        className={isMenuActive ? "bi bi-list" : "bi bi-x-circle"}
        style={{ fontSize: 40 }}
      ></i>
      {isMenuActive ? <VStack></VStack> : ""}
    </>
  );
};

export default NavButtonsPhone;
