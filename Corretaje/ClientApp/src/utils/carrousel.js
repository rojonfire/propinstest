import React from "react";
import { Carousel } from "react-bootstrap";

export const CarrouselItem = ({ arrayOps, ...props }) => {
  const items = arrayOps.map((num, i) => (
    <Carousel.Item key={i}>
      <img width={num.w} height={num.h} src={num.url} />
    </Carousel.Item>
  ));
  return <Carousel>{items}</Carousel>;
};
