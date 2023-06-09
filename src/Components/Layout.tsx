import { Grid, GridItem } from "@chakra-ui/react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "./NavBar";
import SearchBar from "./SearchBar";
import EventGrid from "./EventGrid";

function Layout({children} : {children: React.ReactNode}) {
  const [isMenuActive, setMenuActive] = useState(false);
  const location = useLocation();

  const isHomePage = location.pathname === "/";

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
            isHomePage={isHomePage} 
          />
          {isHomePage && <SearchBar />}
        </GridItem>

        <GridItem area="main">
        {children}
        </GridItem>
      </Grid>
    </div>
  );
}

export default Layout;



