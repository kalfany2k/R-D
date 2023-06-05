import { Card, CardBody, Text } from "@chakra-ui/react";
import { Event } from "../Hooks/useEvent";

interface Props {
  event: Event;
}

const EventCard = ({ event }: Props) => {
  return (
    <Card>
      <CardBody>
        <Text>{event.title}</Text>
      </CardBody>
    </Card>
  );
};

export default EventCard;
