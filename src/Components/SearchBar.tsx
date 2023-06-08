import {
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  VStack,
} from "@chakra-ui/react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useEffect, useRef, useState } from "react";

interface Props {
  onInput: (input: string) => void;
}

const SearchBar = ({ onInput }: Props) => {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <VStack
      paddingTop={{ base: "50px", sm: "75px", md: "100px" }}
      paddingBottom="50px"
      zIndex="-1"
    >
      <Text fontSize="4xl" fontWeight="bold">
        The best ticket marketplace
      </Text>
      <form
        className="search-bar-responsive"
        onSubmit={(event) => {
          event.preventDefault();
          if (ref.current) onInput(ref.current.value);
        }}
      >
        <InputGroup className="search-bar-theme">
          <InputLeftElement
            children={<i className="bi bi-search" />}
            onClick={(event) => {
              event.preventDefault();
              if (ref.current) onInput(ref.current.value);
            }}
            cursor="pointer"
          />
          <Input
            ref={ref}
            borderRadius={20}
            paddingTop="3px"
            placeholder="Search for an event, artist, or city..."
            _placeholder={{ color: "black" }}
            variant="filled"
          />
        </InputGroup>
      </form>
    </VStack>
  );
};

export default SearchBar;
