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
  return (
    <VStack
      paddingTop={{ base: "50px", sm: "75px", md: "100px" }}
      paddingBottom="50px"
    >
      <Text fontSize="2xl" fontWeight="semibold">
        The best ticket marketplace
      </Text>
      <form
        className="search-bar-responsive"
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
