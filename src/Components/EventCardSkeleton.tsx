import { Card, CardBody, Skeleton, SkeletonText } from "@chakra-ui/react";
import React from "react";

const EventCardSkeleton = () => {
  return (
    <Card>
      <Skeleton height="100px" />
      <CardBody>
        <SkeletonText />
      </CardBody>
    </Card>
  );
};

export default EventCardSkeleton;
