import React, { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Flex } from "@chakra-ui/react";

const Cart = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <Flex flexDirection="column" position="relative">
        <i
          className="bi bi-basket3-fill"
          style={{ fontSize: "25px", cursor: "pointer" }}
          onClick={() => setIsCartOpen(!isCartOpen)}
        />
        {isCartOpen && (
          <Flex
            backgroundColor="green"
            height="300px"
            width="300px"
            position="absolute"
            top="36px"
            left="-270px"
            borderRadius="20px"
            zIndex={10}
          ></Flex>
        )}
      </Flex>
    </>
  );
};

export default Cart;
