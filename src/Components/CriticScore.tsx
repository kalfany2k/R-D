import { Badge } from "@chakra-ui/react";
import React from "react";

interface Props {
  rating: number;
}

const CriticScore = ({ rating }: Props) => {
  let color = rating > 4 ? "green" : rating > 2.5 ? "yellow" : "red";

  return (
    <Badge colorScheme={color} fontSize="10px" paddingX={2} borderRadius="4px">
      {rating}
    </Badge>
  );
};

export default CriticScore;
