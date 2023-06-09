import { Grid, GridItem } from "@chakra-ui/react";
import { useState } from "react";
import NavBar from "./NavBar";
import SearchBar from "./SearchBar";
import EventGrid from "./EventGrid";

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
        

        <GridItem area="main">
          <EventGrid />
        </GridItem>
      </Grid>
    </div>
  );
}

export default App;
