import { Flex, Image } from "@chakra-ui/react";

const LocationGrid = () => {
  const imageUrls = [
    //Sziget Festival (Budapest)
    "https://static.euronews.com/articles/stories/06/92/11/32/320x180_cmsv2_4664060d-b75e-59a9-80ab-90c76e05dd8c-6921132.jpg",
    "https://static.euronews.com/articles/stories/06/92/11/32/320x180_cmsv2_4664060d-b75e-59a9-80ab-90c76e05dd8c-6921132.jpg",
    "https://static.euronews.com/articles/stories/06/92/11/32/320x180_cmsv2_4664060d-b75e-59a9-80ab-90c76e05dd8c-6921132.jpg",
    "https://static.euronews.com/articles/stories/06/92/11/32/320x180_cmsv2_4664060d-b75e-59a9-80ab-90c76e05dd8c-6921132.jpg",
    "https://static.euronews.com/articles/stories/06/92/11/32/320x180_cmsv2_4664060d-b75e-59a9-80ab-90c76e05dd8c-6921132.jpg",
    "https://static.euronews.com/articles/stories/06/92/11/32/320x180_cmsv2_4664060d-b75e-59a9-80ab-90c76e05dd8c-6921132.jpg",
  ];

  return (
    <Flex
      flexDirection="row"
      flexWrap="wrap"
      justifyContent="center"
      gap={5}
      paddingTop={35}
    >
      {imageUrls.map((imageUrl, index) => (
        <Image
          key={index}
          src={imageUrl}
          alt={`Image ${index + 1}`}
          boxSize="200px"
          objectFit="cover"
          borderRadius="md"
          boxShadow="md"
          display="flex"
          height={150}
        />
      ))}
    </Flex>
  );
};

export default LocationGrid;
