import { Grid, GridItem } from "@chakra-ui/react";
import { useState } from "react";
import NavBar from "./Components/NavBar";
import SearchBar from "./Components/SearchBar";
import EventGrid from "../src/Components/EventGrid";
import axios from "axios";

function App() {
  const [isMenuActive, setMenuActive] = useState(false);

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
          <SearchBar />
        </GridItem>

        <GridItem area="main">
          <EventGrid />
        </GridItem>
      </Grid>
    </div>
  );
}

export default App;
