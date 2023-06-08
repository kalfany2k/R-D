import React, { ReactNode, useEffect, useState } from "react";
import {
  Button,
  Text,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Flex,
} from "@chakra-ui/react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate } from "react-router-dom";
import { login } from "../services/user-auth";
import { createCart } from "../services/cart-services";

interface Props {
  children: ReactNode;
}

const LoginButton = ({ children }: Props) => {
  const [isLoginPopupOpen, setLoginPopupOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleCreateAccount = () => {
    navigate("/register");
  };

  const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    login(username, password).then(() => {
      navigate("/" + localStorage.getItem("sessionToken")?.substring(0, 10));

      window.location.reload();
      createCart();
    });
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
              top: "40%",
              left: "40%",
              width: "20%",
              height: "20%",
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
