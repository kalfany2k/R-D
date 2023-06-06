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
      backgroundColor="rgba(255, 255, 255, 0.6)"
      borderRadius={10}
      overflow="hidden"
    >
      {children}
    </Box>
  );
};

export default EventCardContainer;
