import React, { ReactNode, useEffect, useState } from "react";
import {
  Button,
  Text,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Flex,
  Box,
} from "@chakra-ui/react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate } from "react-router-dom";
import { login } from "../services/user-auth";
import { Cart } from "../services/cart-services";
import apiClient from "../services/api-client";

interface Props {
  children: ReactNode;
}

const LoginButton = ({ children }: Props) => {
  const [isLoginPopupOpen, setLoginPopupOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cart, setCart] = useState<Cart>();
  const navigate = useNavigate();

  const handleCreateAccount = () => {
    navigate("/register");
  };

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

  const handleSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await login(username, password);
      const createdCard = await createCart();
      localStorage.setItem("cartId", createdCard.id.toString());
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Button
        paddingTop="3px"
        colorScheme="none"
        className="nav-log-in-button-theme"
        onClick={() => setLoginPopupOpen(true)}
      >
        {children}
      </Button>

      {isLoginPopupOpen && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            zIndex: "10",
          }}
          className="login"
        >
          <div
            style={{
              position: "fixed",
              top: "35%",
              left: "40%",
              width: "20vw",
              height: "auto",
              zIndex: "10",
            }}
          >
            <HStack
              style={{
                display: "flex",
                justifyContent: "space-between",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                padding: "5px",
                borderRadius: "20px",
              }}
            >
              <Text fontSize="1xl" fontWeight="bold" paddingLeft="5px">
                Log in
              </Text>
              <i
                className="bi bi-x"
                onClick={() => setLoginPopupOpen(false)}
                style={{ fontSize: "2rem", cursor: "pointer" }}
              />
            </HStack>
            <form onSubmit={handleSubmitForm}>
              <FormControl id="username" paddingTop="10px">
                <FormLabel>Username</FormLabel>
                <Input
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  value={username}
                ></Input>
              </FormControl>
              <FormControl id="password" paddingTop="10px">
                <FormLabel>Password</FormLabel>
                <Input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  value={password}
                ></Input>
              </FormControl>

              <Flex flexDirection="row" alignItems="center">
                <Button type="submit" marginTop="10px">
                  Login
                </Button>
                <Text
                  paddingTop="0.6rem"
                  paddingLeft="1rem"
                  fontSize={18}
                  cursor="pointer"
                  onClick={handleCreateAccount}
                >
                  Don't have an account?
                </Text>
              </Flex>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginButton;
