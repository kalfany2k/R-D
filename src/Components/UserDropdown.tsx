import { useEffect, useState } from "react";
import { getUser } from "../services/user-auth";
import { Box, Flex, Text } from "@chakra-ui/react";
import { User } from "../services/user-auth";

const UserDropdown = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [data, setData] = useState<User>();

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
      borderRadius="10px"
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
          width="300px"
          height="300px"
          position="absolute"
          zIndex="20"
          top="55px"
          right="10px"
          borderRadius="15px"
          borderTopRightRadius="0"
        ></Flex>
      )}
    </Flex>
  );
};

export default UserDropdown;
function useHook(arg0: () => void) {
  throw new Error("Function not implemented.");
}
