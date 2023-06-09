import { Flex, Select, useBreakpointValue } from "@chakra-ui/react";
import React from "react";
import RedirectButton from "./RedirectButton";

const BottomButtonConfigurations = [
  { name: "Conditions" },
  { name: "Privacy" },
  { name: "Responsible Disclosure" },
];

const Bottom = () => {
  const showButtons = useBreakpointValue({
    base: false,
    sm: false,
    md: true,
    lg: true,
    xl: true,
  });

  return (
    <Flex justifyContent="space-evenly" marginTop="10px" marginBottom="10px">
      <Flex marginTop="20px" marginBottom="30px">
        {showButtons && (
          <Flex>
            {BottomButtonConfigurations.map((config, index) => (
              <RedirectButton key={index} url={""} name={config.name} />
            ))}
          </Flex>
        )}
        <Flex>
          <Select>
            <option>English</option>
            <option>Deutsch (Deutschland)</option>
            <option>Nederlands (Nederland)</option>
            <option>Francais (France)</option>
            <option>Espanol (Espana)</option>
            <option>Italiano (Italia)</option>
            <option>Polski (Polska)</option>
            <option>Portugues (Brasil)</option>
          </Select>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Bottom;
