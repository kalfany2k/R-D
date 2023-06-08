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
} from "@chakra-ui/react";
import NavBar from "./NavBar";
import "bootstrap-icons/font/bootstrap-icons.css";
import LoginButton from "./LoginButton";
import CategoryMapper from "./CategoryMapper";

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

  const handleAddToCart = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
              padding="20px"
              fontSize={{ base: "2xl", lg: "4xl" }}
              fontWeight="bold"
            >
              {event?.title}
            </Text>

            <CategoryMapper eventId={event?.id ?? 0} />
            <Flex
              flexDirection={{ base: "column", md: "row" }}
              gap="20px"
              justifyContent={{ base: "center" }}
              alignItems={{ base: "center" }}
            >
              <HStack>
                <i className="bi bi-geo-alt-fill" />
                <Text marginTop="2.5px" fontSize={18}>
                  {event?.location.name}
                </Text>
              </HStack>
              <HStack>
                <i className="bi bi-map-fill" />
                <Text marginTop="2.5px" fontSize={18}>
                  {event?.location.address}
                </Text>
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
