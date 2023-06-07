import { useEffect, useState } from "react";
import { getEvent } from "../services/retrievers";
import { Event } from "../Hooks/useEvent";
import { useParams } from "react-router-dom";
import {
  Button,
  Flex,
  Grid,
  GridItem,
  HStack,
  Image,
  Text,
} from "@chakra-ui/react";
import NavBar from "./NavBar";
import "bootstrap-icons/font/bootstrap-icons.css";

const EventPage = () => {
  const [event, setEvent] = useState<Event>();
  const { eventId } = useParams();
  const [isMenuActive, setMenuActive] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        if (eventId) {
          const user = await getEvent(eventId);
          setEvent(user);
        }
      } catch (error) {
        console.log("error");
      }
    };
    fetchEvent();
  }, []);

  const handleAddToCart = () => {};

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
              <Button
                leftIcon={<i className="bi bi-bag-fill" />}
                onClick={handleAddToCart}
              >
                <Text marginTop="4px">Add to cart</Text>
              </Button>
            </Flex>
          </Flex>
        </GridItem>
      </Grid>
    </div>
  );
};

export default EventPage;
