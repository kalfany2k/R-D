import { Grid, GridItem } from "@chakra-ui/react";
import { useState } from "react";
import NavBar from "./NavBar";
import SearchBar from "./SearchBar";
import EventGrid from "./EventGrid";
import LocationGrid from "./LocationGrid";

function App() {
  const [isMenuActive, setMenuActive] = useState(false);

  return (
    <>
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
            <SearchBar />
          </GridItem>

          <GridItem area="main">
            <EventGrid />
            <LocationGrid />
          </GridItem>
        </Grid>
      </div>
    </>
  );
}

export default App;
