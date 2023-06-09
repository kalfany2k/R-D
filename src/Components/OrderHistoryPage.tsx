import { Flex, Grid, GridItem, HStack, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, getUser } from "../services/user-auth";
import "bootstrap-icons/font/bootstrap-icons.css";
import ColorModeSwitch from "./ColorModeSwitch";
import apiClient from "../services/api-client";
import { Event } from "../Hooks/useEvent";
import { CartItem } from "../services/cart-services";

interface History {
  id: number;
  customer: number;
  placed_at: string;
  payment_status: string;
  items: CartItem[];
}

function OrderHistoryPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>();
  const [history, setHistory] = useState<History[]>([]);

  const getHistory = async (accessToken: string) => {
    try {
      const response = await apiClient.get("/product/customers/history/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "JWT " + localStorage.getItem("accessToken"),
        },
      });
      setHistory(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getHistory(localStorage.getItem("accessToken") ?? "");
  }, []);

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
  }, []);

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
              onClick={() => navigate("/")}
              className="bi bi-ticket-perforated"
              style={{ fontSize: 50, paddingRight: 10 }}
            ></i>
            <Text
              onClick={() => navigate("/")}
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

            <Flex flexDirection="column" overflow="auto">
              {history.length > 0 ? (
                history.map((order) => (
                  <Flex
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    className="profile-back-button"
                    borderRadius="15px"
                    gap={2}
                    marginTop={5}
                    padding="15px"
                  >
                    <Text>{order.placed_at.slice(0, 10)}</Text>
                    {order.items.map((cartItem) => (
                      <Flex flexDir="row" gap={4}>
                        <Text>{cartItem.event.title}</Text>
                        <Text>{cartItem.event.price}</Text>
                        <Text>{cartItem.quantity}</Text>
                      </Flex>
                    ))}
                  </Flex>
                ))
              ) : (
                <Text>No items found</Text>
              )}
            </Flex>

            <HStack flex="1" alignSelf="center">
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

export default OrderHistoryPage;
