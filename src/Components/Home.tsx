import { Grid, GridItem, Text } from "@chakra-ui/react";
import { useState } from "react";
import NavBar from "./NavBar";
import SearchBar from "./SearchBar";
import EventGrid from "./EventGrid";
import { EventQuery } from "../App";

function Home() {
  const [isMenuActive, setMenuActive] = useState(false);
  const [eventQuery, setEventQuery] = useState<EventQuery>({} as EventQuery);

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
        <GridItem area="nav" className="nav-search">
          <NavBar
            isMenuActive={isMenuActive}
            setMenuActive={() => setMenuActive(!isMenuActive)}
          />
          <SearchBar
            onInput={(searchText) =>
              setEventQuery({ ...eventQuery, searchText })
            }
          />
        </GridItem>

        <GridItem area="main">
          <EventGrid eventQuery={eventQuery} />
        </GridItem>
        {/* <Text>{eventQuery.searchText}</Text> */}
      </Grid>
    </div>
  );
}

export default Home;
