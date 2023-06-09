import { useEffect, useState } from "react";
import { getUser } from "../services/user-auth";
import { Flex, Text } from "@chakra-ui/react";
import { User } from "../services/user-auth";
import { useNavigate } from "react-router-dom";

const UserDropdown = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const [data, setData] = useState<User>();

  const handleLogOut = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  const handleVisitProfile = () => {
    navigate("/profile/" + localStorage.getItem("sessionToken")?.slice(0, 10));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getUser();
        setData(user);
      } catch (error) {
        console.log("error");
      }
    };
    fetchData();
  }, [localStorage.getItem("accessToken")]);

  return (
    <Flex
      flexDirection="column"
      className="nav-welcome-button-theme"
      paddingRight="10px"
      paddingLeft="3px"
      paddingTop="4px"
      borderRadius="15px"
      onClick={() => setDropdownOpen(!dropdownOpen)}
      style={{
        borderBottomRightRadius: dropdownOpen ? "0" : "15px",
        borderBottomLeftRadius: dropdownOpen ? "0" : "15px",
      }}
    >
      <Text fontSize={20} fontWeight="bold" paddingLeft="5px">
        {"Hi, " + data?.last_name + "!"}
      </Text>
      {dropdownOpen && (
        <Flex
          className="nav-welcome-button-theme"
          flexDirection="column"
          justifyContent="space-between"
          alignItems="center"
          width="300px"
          height="300px"
          position="absolute"
          zIndex="20"
          top="55px"
          right="10px"
          borderRadius="15px"
          borderTopRightRadius="0"
          fontSize="17px"
          fontWeight="semibold"
          overflow="hidden"
        >
          <Flex
            width="100%"
            justifyContent="center"
            alignItems="center"
            flex="1"
          >
            <Text>Welcome to your own menu!</Text>
          </Flex>
          <Flex
            width="80%"
            justifyContent="center"
            alignItems="center"
            flex="1"
            className="dropdown-options-hover"
            onClick={handleVisitProfile}
            borderRadius="15px"
          >
            <Text>Visit profile page</Text>
          </Flex>
          <Flex
            width="80%"
            justifyContent="center"
            alignItems="center"
            flex="1"
            className="dropdown-options-hover"
            borderRadius="15px"
          >
            <Flex flexDirection="row" gap="3px" onClick={handleLogOut}>
              <Text marginTop="9px">Log out</Text>
              <i
                className="bi bi-escape"
                style={{ fontSize: "30px", color: "red" }}
              />
            </Flex>
          </Flex>
        </Flex>
      )}
    </Flex>
  );
};

export default UserDropdown;
