import { Flex, Text } from "@chakra-ui/react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { getEvent } from "../services/retrievers";
import { useEffect, useState } from "react";
import { Event } from "../Hooks/useEvent";

interface Props {
  eventId: number;
}

export const categories = [
  { value: "bi bi-music-note", label: "Music" },
  { value: "bi bi-trophy-fill", label: "Sports" },
  { value: "bi bi-palette-fill", label: "Arts" },
  { value: "bi bi-easel", label: "Theatre" },
  { value: "bi bi-people-fill", label: "Workshop and Conferences" },
  { value: "bi bi-cup-fill", label: "Food and drinks" },
  { value: "bi bi-heart-pulse-fill", label: "Health and Wellness" },
  { value: "bi bi-currency-exchange", label: "Charity and Fundraising" },
  { value: "bi bi-emoji-smile-fill", label: "Comedy" },
  { value: "bi bi-mortarboard-fill", label: "Educational" },
];

// Music, Sports, Arts and Theatre, Workshops and Conferences, Food and Drinks, Health and Wellness, Charity and Fundraising, Comedy, Educational
const CategoryMapper = ({ eventId }: Props) => {
  const [event, setEvent] = useState<Event>();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        if (eventId) {
          const event = await getEvent(eventId.toString());
          setEvent(event);
        }
      } catch (error) {
        console.log("error");
      }
    };
    fetchEvent();
  }, [eventId]);

  const categoryList = categories.filter((categItem) => {
    return event?.category.includes(categItem.label);
  });

  return (
    <Flex
      zIndex={10}
      gap={4}
      marginTop="5px"
      marginBottom="30px"
      paddingBottom="7px"
      paddingTop="12px"
      className="event-page-categories"
      alignItems="center"
      justifyContent="center"
    >
      {categoryList.map((category) => (
        <Flex gap={1} key={category.label}>
          <i className={category.value} style={{ fontSize: "25px" }} />
          <Text fontSize={22} marginTop="3px">
            {category.label}
          </Text>
        </Flex>
      ))}
    </Flex>
  );
};

export default CategoryMapper;
