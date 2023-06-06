import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { register } from "../services/user-auth";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigate = useNavigate();

  const handleRegisterRequest = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    register(
      username,
      password,
      email,
      phone,
      birthDate,
      firstName,
      lastName
    ).then(() => navigate("/"));
  };

  return (
    <div
      style={{
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <form onSubmit={handleRegisterRequest}>
        <Grid
          h="500px"
          templateColumns="repeat(2, 1fr)"
          gap={10}
          alignItems="center"
        >
          <GridItem colSpan={1}>
            <FormControl id="username">
              <FormLabel>Username</FormLabel>
              <Input
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                value={username}
              />
            </FormControl>
          </GridItem>
          <GridItem colSpan={1}>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                onChange={(e) => setPassword(e.target.value)}
                type="text"
                value={password}
              />
            </FormControl>
          </GridItem>
          <GridItem colSpan={2}>
            <FormControl id="email">
              <FormLabel>Email</FormLabel>
              <Input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                value={email}
              />
            </FormControl>
          </GridItem>
          <GridItem colSpan={1}>
            <FormControl id="phone">
              <FormLabel>Phone</FormLabel>
              <Input
                onChange={(e) => setPhone(e.target.value)}
                type="tel"
                value={phone}
              />
            </FormControl>
          </GridItem>
          <GridItem colSpan={1}>
            <FormControl id="birthDate">
              <FormLabel>Birth Date</FormLabel>
              <Input
                onChange={(e) => setBirthDate(e.target.value)}
                type="date"
                value={birthDate}
              />
            </FormControl>
          </GridItem>
          <GridItem colSpan={2}>
            <FormControl id="firstName">
              <FormLabel>First name</FormLabel>
              <Input
                onChange={(e) => setFirstName(e.target.value)}
                type="string"
                value={firstName}
              />
            </FormControl>
          </GridItem>
          <GridItem colSpan={2}>
            <FormControl id="lastName">
              <FormLabel>Last name</FormLabel>
              <Input
                onChange={(e) => setLastName(e.target.value)}
                type="string"
                value={lastName}
              />
            </FormControl>
          </GridItem>
          <GridItem
            colSpan={2}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Button type="submit">Submit</Button>
          </GridItem>
        </Grid>
      </form>
    </div>
  );
};

export default RegisterPage;
