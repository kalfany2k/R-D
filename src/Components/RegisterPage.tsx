import { Button, Flex, FormControl, FormLabel, Input } from "@chakra-ui/react";
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
        width: "100%",
        height: "50vw",
        overflow: "hidden",
      }}
    >
      <Flex direction="column" align="flex-start">
        <form onSubmit={handleRegisterRequest}>
          <FormControl id="username" paddingTop="5px">
            <FormLabel>Username</FormLabel>
            <Input
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              value={username}
            />
          </FormControl>
          <FormControl id="password" paddingTop="10px">
            <FormLabel>Password</FormLabel>
            <Input
              onChange={(e) => setPassword(e.target.value)}
              type="text"
              value={password}
            />
          </FormControl>
          <FormControl id="email" paddingTop="10px">
            <FormLabel>Email</FormLabel>
            <Input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              value={email}
            />
          </FormControl>
          <FormControl id="phone" paddingTop="10px">
            <FormLabel>Phone</FormLabel>
            <Input
              onChange={(e) => setPhone(e.target.value)}
              type="tel"
              value={phone}
            />
          </FormControl>
          <FormControl id="birthDate" paddingTop="10px">
            <FormLabel>Birth Date</FormLabel>
            <Input
              onChange={(e) => setBirthDate(e.target.value)}
              type="date"
              value={birthDate}
            />
          </FormControl>
          <FormControl id="firstName" paddingTop="10px">
            <FormLabel>First name</FormLabel>
            <Input
              onChange={(e) => setFirstName(e.target.value)}
              type="string"
              value={firstName}
            />
          </FormControl>
          <FormControl id="lastName" paddingTop="10px">
            <FormLabel>Last name</FormLabel>
            <Input
              onChange={(e) => setLastName(e.target.value)}
              type="string"
              value={lastName}
            />
          </FormControl>
          <Button type="submit">Submit</Button>
        </form>
      </Flex>
    </div>
  );
};

export default RegisterPage;
