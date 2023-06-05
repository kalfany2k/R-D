import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const EventCardContainer = ({ children }: Props) => {
  return (
    <Box
      width={{ base: "80%", md: "70%", lg: "50%" }}
      height="100px"
      backgroundColor="green"
      borderRadius={10}
      overflow="hidden"
    >
      {children}
    </Box>
  );
};

export default EventCardContainer;
