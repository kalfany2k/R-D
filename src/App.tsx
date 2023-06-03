import { Grid, GridItem } from "@chakra-ui/react";
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
        <GridItem area="nav" bg="purple">
          <NavBar
            isMenuActive={isMenuActive}
            setMenuActive={() => setMenuActive(!isMenuActive)}
            setShowHowItWorks={setShowHowItWorks}
            setShowBecomeaPartner={setShowBecomeaPartner}
          />
          <SearchBar />
        </GridItem>
        <GridItem area="aside">
          <EventCategoryList />
        </GridItem>
        <GridItem area="main" bg="#67568c">
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
