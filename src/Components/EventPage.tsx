import { useEffect, useState } from "react";
import { getEvent } from "../services/retrievers";
import { Event } from "../Hooks/useEvent";
import { useParams } from "react-router-dom";
import {
  Alert,
  AlertIcon,
  Button,
  Flex,
  Grid,
  GridItem,
  HStack,
  Image,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import NavBar from "./NavBar";
import "bootstrap-icons/font/bootstrap-icons.css";
import LoginButton from "./LoginButton";
import CategoryMapper from "./CategoryMapper";
import apiClient from "../services/api-client";

interface Props {
  isLoggedIn: boolean;
}

const EventPage = ({ isLoggedIn }: Props) => {
  const [event, setEvent] = useState<Event>();
  const { eventId } = useParams();
  const [isMenuActive, setMenuActive] = useState(false);
  const [quantity, setQuantity] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        if (eventId) {
          const event = await getEvent(eventId);
          setEvent(event);
        }
      } catch (error) {
        console.log("error");
      }
    };
    fetchEvent();
  }, []);

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (Number(value) <= 10) {
      setQuantity(value);
      setError(false);
    } else {
      setError(true);
    }
  };

  const addToCart = async (
    event_id: number,
    quantity: number,
    cart_id: number
  ) => {
    try {
      const response = apiClient.post(
        "/product/carts/" + localStorage.getItem("cartId") + "/items/",
        { event_id, quantity, cart_id },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "JWT " + localStorage.getItem("accessToken"),
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToCart = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    addToCart(
      Number(eventId),
      Number(quantity),
      Number(localStorage.getItem("cartId"))
    );
    const tempId = localStorage.getItem("cartId");
    localStorage.setItem("cartId", "");
    localStorage.setItem("cartId", tempId ?? "");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

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
        <GridItem area="nav" className="nav-search">
          <NavBar
            isMenuActive={isMenuActive}
            setMenuActive={() => setMenuActive(!isMenuActive)}
          />
        </GridItem>

        <GridItem
          area="main"
          style={{
            backgroundImage: "url(https://wallpapercave.com/wp/wp7488230.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "100%",
            borderBottomLeftRadius: "20px",
            borderBottomRightRadius: "20px",
          }}
        >
          <Flex
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            zIndex="2"
            className="event-image-backdrop"
            overflow="hidden"
            borderBottomLeftRadius="20px"
            borderBottomRightRadius="20px"
          >
            <Image
              marginTop="70px"
              src="https://wallpapercave.com/wp/wp7488230.jpg"
              width={{ base: "350px", md: "400px", lg: "450px" }}
              height="auto"
              borderRadius="20px"
              marginBottom="10px"
            />
            <Text
              textAlign="center"
              padding="20px"
              fontSize={{ base: "2xl", lg: "4xl" }}
              fontWeight="bold"
            >
              {event?.title}
            </Text>
            <HStack>
              <i
                className="bi bi-calendar"
                style={{ fontSize: "20px", marginBottom: "26px" }}
              />
              <Text paddingBottom="25px" fontSize="18px">
                {event?.start_date.slice(0, 10)}
              </Text>
            </HStack>
            <CategoryMapper eventId={event?.id ?? 0} />
            <Flex
              flexDirection={{ base: "column", md: "row" }}
              gap="20px"
              justifyContent={{ base: "center" }}
              alignItems={{ base: "center" }}
              fontSize={{ base: "15px", md: "20px" }}
            >
              <HStack>
                <i className="bi bi-geo-alt-fill" />
                <Text marginTop="2.5px" fontSize={18}>
                  {event?.location.name}
                </Text>
              </HStack>
              <HStack>
                <HStack>
                  <i className="bi bi-map-fill" />
                  <Text marginTop="2.5px" fontSize={18}>
                    {event?.location.address}
                  </Text>
                </HStack>
                <HStack>
                  <i className="bi bi-star-fill" />
                  <Text marginTop="3px">{event?.location.rating}</Text>
                </HStack>
              </HStack>
              <HStack marginTop="2px" className="euro-theme">
                <i
                  className="bi bi-currency-euro"
                  style={{
                    fontSize: "25px",
                    fontWeight: "bolder",
                    marginRight: "-5px",
                  }}
                />
                <Text marginTop="2.5px" fontSize={25} fontWeight="semibold">
                  {event?.price}
                </Text>
              </HStack>
            </Flex>
            <Flex
              alignSelf="center"
              width={{ base: "90vw", sm: "70vw", md: "50vw", lg: "30vw" }}
              paddingTop="20px"
              fontSize="18px"
              fontWeight="semibold"
              textAlign="center"
            >
              {event?.description}
            </Flex>
            <Flex flexDirection="row" paddingTop="30px" paddingBottom="70px">
              {isLoggedIn ? (
                <Flex
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  gap="10px"
                >
                  <form onSubmit={handleAddToCart}>
                    <Flex flexDirection="row" color="white">
                      <Button
                        leftIcon={<i className="bi bi-bag-fill" />}
                        sx={{
                          borderRightRadius: "0",
                          borderLeftRadius: "15px",
                        }}
                        type="submit"
                      >
                        <Text marginTop="4px">Add to cart</Text>
                      </Button>
                      <Input
                        sx={{
                          borderLeftRadius: "0",
                          borderRightRadius: "15px",
                        }}
                        type="text"
                        value={quantity}
                        onChange={(event) => handleQuantityChange(event)}
                        width="50px"
                        paddingTop="4px"
                        placeholder="0"
                        _placeholder={{ color: "white" }}
                      />
                    </Flex>
                  </form>
                  {error && (
                    <Alert status="warning" borderRadius="15px">
                      <AlertIcon />
                      You cannot purchase more than 10 tickets
                    </Alert>
                  )}
                </Flex>
              ) : (
                <LoginButton>Log in to purchase</LoginButton>
              )}
            </Flex>
          </Flex>
        </GridItem>
      </Grid>
    </div>
  );
};

export default EventPage;
