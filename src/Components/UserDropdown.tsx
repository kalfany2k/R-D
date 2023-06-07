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
    <Box
      className="nav-welcome-button-theme"
      paddingRight="10px"
      paddingLeft="3px"
      paddingTop="4px"
      borderRadius="10px"
      onClick={() => setDropdownOpen(true)}
    >
      <Text fontSize={20} fontWeight="bold" paddingLeft="5px">
        {"Hi, " + data?.last_name + "!"}
      </Text>
      {dropdownOpen && <Flex></Flex>}
    </Box>
  );
};

export default UserDropdown;
function useHook(arg0: () => void) {
  throw new Error("Function not implemented.");
}
