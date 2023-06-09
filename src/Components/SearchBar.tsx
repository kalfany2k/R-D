import {
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  VStack,
} from "@chakra-ui/react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useEffect, useState } from "react";

const SearchBar = () => {
  const [paddingTop, setPaddingTop] = useState(
    window.innerWidth < 768 ? "50px" : "100px"
  );

  useEffect(() => {
    const handleResize = () => {
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <VStack paddingTop={paddingTop} paddingBottom="50px">
      <Text fontSize="2xl" fontWeight="semibold">
        The best ticket marketplace
      </Text>
      <form
        style={{ width: window.innerWidth <= 768 ? "85vw" : "50vw" }}
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <InputGroup>
          <InputLeftElement children={<i className="bi bi-search" />} />
          <Input
            borderRadius={20}
            placeholder="Search for an event, artist, or city"
            variant="filled"
          />
        </InputGroup>
      </form>
    </VStack>
  );
};

export default SearchBar;
