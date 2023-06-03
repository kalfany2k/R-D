import { Grid, GridItem, Show } from "@chakra-ui/react";
import { useState } from "react";
import NavBar from "./Components/NavBar";
import SearchBar from "./Components/SearchBar";
import EventCategoryList from "./Components/EventCategoryList";

function App() {
  const [isMenuActive, setMenuActive] = useState(false);

  return (
    <div>
      <Grid
        templateAreas={{
          base: '"nav" "main"',
          lg: '"nav nav" "aside main"',
        }}
        templateColumns={{
          base: "1fr",
          lg: "400px 1fr",
        }}
      >
        <GridItem area="nav" bg="purple">
          <NavBar
            isMenuActive={isMenuActive}
            setMenuActive={() => setMenuActive(!isMenuActive)}
          />
          <SearchBar />
        </GridItem>
        <Show above="lg">
          <GridItem area="aside" bg="pink">
            <EventCategoryList />
          </GridItem>
        </Show>
        <GridItem area="main" bg="grey">
          Main
        </GridItem>
      </Grid>
    </div>
  );
}

export default App;
