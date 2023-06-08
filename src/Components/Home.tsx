import { Grid, GridItem, Text } from "@chakra-ui/react";
import { useState } from "react";
import NavBar from "./NavBar";
import SearchBar from "./SearchBar";
import EventGrid from "./EventGrid";
import { EventQuery } from "../App";
import { useNavigate } from "react-router-dom";

function Home() {
  const [isMenuActive, setMenuActive] = useState(false);
  const [eventQuery, setEventQuery] = useState<EventQuery>({} as EventQuery);
  const navigate = useNavigate();

  return (
    <div>
      <Grid
        templateAreas={{
          base: '"nav" "main"',
        }}
        templateColumns={{
          base: "1fr",
        }}
      >
        <GridItem
          area="nav"
          className="nav-search"
          position="fixed"
          width="100vw"
          height="300px"
          zIndex={5}
        >
          <NavBar
            isMenuActive={isMenuActive}
            setMenuActive={() => setMenuActive(!isMenuActive)}
          />
          <SearchBar
            onInput={(searchText) => {
              setEventQuery({ ...eventQuery, searchText });
              navigate("/events/search_events/" + searchText);
            }}
          />
        </GridItem>

        <GridItem
          area="main"
          overflow="auto"
          marginTop="300px"
          height="calc(100vh - 300)"
        >
          <EventGrid eventQuery={eventQuery} />
        </GridItem>
      </Grid>
    </div>
  );
}

export default Home;
