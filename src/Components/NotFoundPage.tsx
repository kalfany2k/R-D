import { Flex, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Flex onClick={() => navigate("/")}>
      <Text>Take me back</Text>
    </Flex>
  );
};

export default NotFoundPage;
