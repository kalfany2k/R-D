import React, { useEffect, useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Button, Flex, Text } from "@chakra-ui/react";
import apiClient from "../services/api-client";
import { Cart } from "../services/cart-services";
import { useNavigate } from "react-router-dom";

const CartComponent = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState<Cart>();
  const navigate = useNavigate();

  const createCart = async () => {
    try {
      const response = await apiClient.post(
        "/product/carts/",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "JWT " + localStorage.getItem("accessToken"),
          },
        }
      );
      const createdCart = response.data;
      setCart(createdCart);
      return createdCart;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitPurchase = async (accessToken: string, cart_id: number) => {
    try {
      const response = await apiClient.post(
        "/product/orders/",
        {
          accessToken,
          cart_id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "JWT " + localStorage.getItem("accessToken"),
          },
        }
      );
      localStorage.removeItem("cartId");
      try {
        const createdCard = await createCart();
        localStorage.setItem("cartId", createdCard.id.toString());
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCart = async () => {
    try {
      const response = await apiClient.get<Cart>(
        "/product/carts/" + localStorage.getItem("cartId") + "/",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "JWT " + localStorage.getItem("accessToken"),
          },
        }
      );
      setCart(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCart();
  }, [localStorage.getItem("cartId")]);

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
            className="nav-welcome-button-theme"
            height="300px"
            width="300px"
            position="absolute"
            top="36px"
            left="-270px"
            borderRadius="20px"
            zIndex={10}
            flexDirection="column"
            alignItems="center"
            justifyContent="space-between"
            fontSize="20px"
            fontWeight="semibold"
          >
            <Text paddingTop="20px">This is your cart</Text>
            {cart?.events.map((event) => (
              <Flex
                overflow="auto"
                key={event.id}
                className="dropdown-options-hover"
                width="100%"
                justifyContent="center"
                alignItems="center"
                borderRadius="15px"
                onClick={() => {
                  navigate("/events/event/" + event.id);
                  window.location.reload();
                }}
              >
                <Text fontSize="17px">
                  {event.title} {event.price}
                </Text>
              </Flex>
            ))}
            {cart?.total_price ? cart.total_price : "Your cart is empty"}
            <Flex paddingBottom="20px">
              <Button
                onClick={() =>
                  handleSubmitPurchase(
                    localStorage.getItem("accessToken") ?? "",
                    Number(localStorage.getItem("cartId")) ?? ""
                  )
                }
              >
                <Text marginTop="3px">Purchase</Text>
              </Button>
            </Flex>
          </Flex>
        )}
      </Flex>
    </>
  );
};

export default CartComponent;
