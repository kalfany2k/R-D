import { Flex, Grid, GridItem, HStack, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, getUser } from "../services/user-auth";
import "bootstrap-icons/font/bootstrap-icons.css";
import ColorModeSwitch from "./ColorModeSwitch";

function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getUser();
        setUser(user);
      } catch (error) {
        console.log("error");
      }
    };
    fetchData();
  }, [localStorage.getItem("accessToken")]);

  return (
    <div>
      <Grid
        templateAreas={{
          base: '"nav" "main"',
        }}
        templateColumns={{
          base: "1fr",
        }}
      >
        <GridItem
          area="nav"
          className="nav-search"
          position="fixed"
          width="100vw"
          height="100vh"
          zIndex={5}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              paddingLeft: 15,
              cursor: "pointer",
            }}
          >
            <i
              onClick={() => navigate("/profile/")}
              className="bi bi-ticket-perforated"
              style={{ fontSize: 50, paddingRight: 10 }}
            ></i>
            <Text
              onClick={() => navigate("/profile/")}
              fontSize="4xl"
              fontWeight="bold"
              paddingTop="2.5px"
              paddingRight="20px"
            >
              Ticket
            </Text>
            <ColorModeSwitch />
          </div>

          <Flex
            marginLeft="20px"
            className="profile-background"
            flexDirection="column"
            width={{ base: "90vw", sm: "80vw", md: "70vw", lg: "60vw" }}
            height="80vh"
            borderRadius="15px"
            justifyContent="flex-start"
            alignItems="center"
            fontSize="20px"
          >
            <HStack fontSize="30px" flex="1">
              <i
                style={{ fontWeight: "bold" }}
                className="bi bi-arrow-return-right"
              />
              <Text fontWeight="extrabold">Welcome, {user?.first_name}</Text>
            </HStack>
            <HStack flex="1">
              <i className="bi bi-telephone-fill" />
              <Text>Phone number: {user?.phone}</Text>
            </HStack>
            <HStack flex="1">
              <i className="bi bi-balloon-fill" />
              <Text>Birth date: {user?.birth_date}</Text>
            </HStack>
            <VStack flex="1">
              <i className="bi bi-person-vcard-fill" />
              <HStack>
                <Text>First name: {user?.first_name}</Text>
              </HStack>
              <HStack flex="1">
                <Text>Last name: {user?.last_name}</Text>
              </HStack>
            </VStack>
            <HStack flex="1">
              <Flex
                onClick={() => navigate("/")}
                cursor="pointer"
                className="profile-back-button"
                padding="20px"
                justifyContent="center"
                alignItems="center"
                borderRadius="20px"
              >
                <Text>Go back to main page</Text>
              </Flex>
            </HStack>
          </Flex>
        </GridItem>
      </Grid>
    </div>
  );
}

export default Home;
