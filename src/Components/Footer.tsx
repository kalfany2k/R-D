import RedirectButton from "./RedirectButton";
import { BsStarFill } from "react-icons/bs";
import "../Footer.css";
import {
  Button,
  Text,
  Stack,
  VStack,
  Flex,
  Heading,
  HStack,
  Icon,
} from "@chakra-ui/react";

const MenuButtonConfigurations = [
  { url: "/", name: "Home" },
  { url: "/how-it-works", name: "How it works" },
  { url: "/partners", name: "Become a partner" },
  { url: "/contact", name: "Contact" },
  { url: "/terms", name: "Terms of Service" },
];

const FollowButtonConfigurations = [
  { name: "Facebook" },
  { name: "Twitter" },
  { name: "Instagram" },
  { name: "TikTok" },
];

const Footer = () => {
  const stars = [];

  return (
    <Flex
      justifyContent="space-evenly"
      borderTop="1px solid black"
      borderBottom="1px solid black"
      marginTop="10px"
      marginBottom="10px"
    >
      <Flex
        marginTop="30px"
        marginBottom="30px"
        flexDirection={{ sm: "column", md: "row" }}
      >
        <Flex
          flexDirection="column"
          marginLeft={{
            base: "30px",
            sm: "30px",
            md: "40px",
            lg: "100px",
            xl: "220px",
          }}
          marginBottom={{ sm: "20px" }}
        >
          <Heading
            marginBottom="4px"
            fontSize={{
              base: "17px",
              sm: "17px",
              md: "17px",
              lg: "18px",
              xl: "19px",
            }}
          >
            Menu
          </Heading>
          {MenuButtonConfigurations.map((config, index) => (
            <RedirectButton key={index} url={config.url} name={config.name} />
          ))}
        </Flex>
        <Flex
          flexDirection="column"
          marginLeft={{
            base: "30px",
            sm: "30px",
            md: "40px",
            lg: "100px",
            xl: "220px",
          }}
        >
          <Flex flexDirection="column">
            <Heading
              marginBottom="4px"
              fontSize={{
                base: "17px",
                sm: "17px",
                md: "17px",
                lg: "18px",
                xl: "19px",
              }}
            >
              Follow us
            </Heading>
            {FollowButtonConfigurations.map((config, index) => (
              <RedirectButton key={index} url={""} name={config.name} />
            ))}
          </Flex>
          <Flex
            flexDirection="column"
            marginTop="23px"
            marginBottom={{ sm: "20px" }}
          >
            <Heading
              marginBottom="4px"
              fontSize={{
                base: "17px",
                sm: "17px",
                md: "17px",
                lg: "18px",
                xl: "19px",
              }}
            >
              Support
            </Heading>
            <RedirectButton url={""} name={"Help & FAQs"} />
          </Flex>
        </Flex>
        <Flex>
          <Stack
            spacing={4}
            direction="column"
            display="flex"
            marginLeft={{
              base: "30px",
              sm: "30px",
              md: "40px",
              lg: "100px",
              xl: "220px",
            }}
          >
            <HStack>
              <Button
                leftIcon={<i className="bi bi-apple footer-app"></i>}
                colorScheme="white"
                variant="solid"
                size="lg"
                height="40px"
                width="135px"
                className="footer-button"
              >
                <VStack
                  spacing="-0.6px"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                  paddingRight="18px"
                  className="footer-app"
                >
                  <Text fontSize="10px">Download on the </Text>
                  <Text fontSize="17px">App Store</Text>
                </VStack>
              </Button>
            </HStack>
            <HStack>
              <Button
                leftIcon={
                  <i
                    style={{ paddingLeft: "20px" }}
                    className="bi bi-google-play footer-app"
                  ></i>
                }
                colorScheme="white"
                variant="solid
                size="lg"
                height="40px"
                width="135px"
                className="footer-button"
              >
                <VStack
                  spacing="-0.6px"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                  paddingRight="18px"
                  className="footer-app"
                >
                  <Text fontSize="10px">Get it on </Text>
                  <Text fontSize="17px">Google Play</Text>
                </VStack>
              </Button>
            </HStack>
          </Stack>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Footer;
