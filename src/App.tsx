import { Grid, GridItem, Show } from "@chakra-ui/react";
import { useState } from "react";
import NavBar from "./Components/NavBar";
import SearchBar from "./Components/SearchBar";
import HowItWorks from "./Components/HowItWorks";
import BecomeAPartner from "./Components/BecomeaPartner"; // Don't forget to create this component
import EventCategoryList from "./Components/EventCategoryList";

function App() {
  const [isMenuActive, setMenuActive] = useState(false);
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const [showBecomeaPartner, setShowBecomeaPartner] = useState(false);

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
        <GridItem area="nav" className="nav-search">
          <NavBar
            isMenuActive={isMenuActive}
            setMenuActive={() => setMenuActive(!isMenuActive)}
            setShowHowItWorks={setShowHowItWorks}
            setShowBecomeaPartner={setShowBecomeaPartner}
          />
          <SearchBar />
        </GridItem>

        <Show above="lg">
          <GridItem area="aside">
            <EventCategoryList />
          </GridItem>
        </Show>
        <GridItem area="main">
          {showHowItWorks ? (
            <HowItWorks />
          ) : showBecomeaPartner ? (
            <BecomeAPartner />
          ) : (
            "Main"
          )}
        </GridItem>
      </Grid>
    </div>
  );
}

export default App;
