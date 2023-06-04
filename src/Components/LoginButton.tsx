import React, { useState } from "react";
import {
  Button,
  Text,
  FormControl,
  FormLabel,
  HStack,
  Input,
} from "@chakra-ui/react";
import "bootstrap-icons/font/bootstrap-icons.css";

const LoginButton = () => {
  const [isLoginPopupOpen, setLoginPopupOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log(username);
    console.log(password);

    setUsername("");
    setPassword("");
  };

  return (
    <div>
      <Button colorScheme="green" onClick={() => setLoginPopupOpen(true)}>
        Log in
      </Button>

      {isLoginPopupOpen && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
          }}
        >
          <div
            style={{
              position: "fixed",
              top: "40%",
              left: "40%",
              width: "20%",
              height: "20%",
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
                Login
              </Text>
              <i
                className="bi bi-x"
                onClick={() => setLoginPopupOpen(false)}
                style={{ fontSize: "2rem" }}
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
              <Button type="submit" marginTop="10px">
                Login
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginButton;
