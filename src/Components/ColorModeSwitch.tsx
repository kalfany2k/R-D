import { HStack, Switch, Text, useColorMode } from "@chakra-ui/react";

const ColorModeSwitch = () => {
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <HStack>
      <Switch
        paddingBottom={1}
        isChecked={colorMode === "dark"}
        onChange={toggleColorMode}
      />
      <Text
        className="nav-buttons-responsive"
        fontSize="1xl"
        fontWeight="semibold"
      >
        Dark Mode
      </Text>
    </HStack>
  );
};

export default ColorModeSwitch;
