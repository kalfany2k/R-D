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
        <InputGroup className="search-bar-theme">
          <InputLeftElement children={<i className="bi bi-search" />} />
          <Input
            borderRadius={20}
            paddingTop="3px"
            placeholder="Search for an event, artist, or city"
            _placeholder={{ color: "black" }}
            variant="filled"
          />
        </InputGroup>
      </form>
    </VStack>
  );
};

export default SearchBar;
