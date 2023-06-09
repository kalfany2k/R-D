import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { categories } from "./CategoryMapper";

interface Props {
  handleSelectCategory: (selectedCategory: string) => void;
}

const CategorySelector = ({ handleSelectCategory }: Props) => {
  return (
    <Flex width="100vw" alignItems="center" justifyContent="center">
      <SimpleGrid
        paddingTop="20px"
        columns={{ base: 5, lgXl: 5, xl: 9 }}
        paddingLeft={{ base: "15px", sm: "35px", md: "50px" }}
        paddingRight={{ base: "20px", md: "50px" }}
        gap={4}
        w={{
          sm: "container.sm",
          md: "container.md",
          lg: "container.lg",
          xl: "container.xl",
        }}
      >
        {categories.map((category) => (
          <Flex
            key={category.label}
            className="category-buttons"
            boxSize={{ base: "60px", sm: "80px", md: "100px" }}
            justifyContent="center"
            alignItems="center"
            borderRadius="30px"
            fontSize={{ base: "35px", md: "50px" }}
            cursor="pointer"
            onClick={() => handleSelectCategory(category.label)}
          >
            <i
              className={category.value}
              style={{
                marginTop: "5px",
              }}
            />
          </Flex>
        ))}
      </SimpleGrid>
    </Flex>
  );
};

export default CategorySelector;
