import { Grid, GridItem } from "@chakra-ui/react";
import { useState } from "react";
import NavBar from "./NavBar";
import SearchBar from "./SearchBar";
import EventGrid from "./EventGrid";
import LocationGrid from "./LocationGrid";
import Footer from "./Footer";
import Bottom from "./Bottom";

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
            <Footer />
            <Bottom />
          </GridItem>
        </Grid>
      </div>
    </>
  );
}

export default App;
