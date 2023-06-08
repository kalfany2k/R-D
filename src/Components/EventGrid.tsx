import { useEffect, useState } from "react";
import useEvent from "../Hooks/useEvent";
import EventCard from "./EventCard";
import EventCardContainer from "./EventCardContainer";
import { Button, Flex, Text } from "@chakra-ui/react";
import EventCardSkeleton from "./EventCardSkeleton";
import { Link } from "react-router-dom";
import { EventQuery } from "../App";

interface Props {
  eventQuery: EventQuery;
}

const EventGrid = ({ eventQuery }: Props) => {
  const [searchEmpty, setSearchEmpty] = useState(true);
  const { data, error, isLoading } = useEvent(eventQuery, searchEmpty);
  const [displayCount, setDisplayCount] = useState(5);
  const skeletons = [1, 2, 3, 4, 5];

  useEffect(() => {
    if (eventQuery.searchText !== null) setSearchEmpty(false);
  }, [eventQuery.searchText]);

  const handleShowMore = () => {
    setDisplayCount(displayCount + 5);
  };

  return (
    <Flex
      flexDirection="column"
      justifyItems="center"
      alignItems="center"
      gap={5}
      paddingTop={5}
    >
      {error && <Text>{error}</Text>}
      {isLoading &&
        skeletons.map((skeleton) => (
          <EventCardContainer key={skeleton}>
            <EventCardSkeleton />
          </EventCardContainer>
        ))}
      {!isLoading &&
        data.slice(0, displayCount).map((event) => (
          <EventCardContainer key={event.id}>
            <Link to={"/events/event/" + event.id}>
              <EventCard event={event} />
            </Link>
          </EventCardContainer>
        ))}
      {displayCount < data.length && (
        <Button onClick={handleShowMore} marginBottom={5}>
          Show more
        </Button>
      )}
    </Flex>
  );
};

export default EventGrid;
