import React from "react";
import { Carousel } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
const contentStyle = {
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
  position: "center",
};
const settings = {
  nextArrow: <LeftOutlined />,
  prevArrow: <RightOutlined />,
};
export const CarrouselItem = ({ arrayOps, onChangePropiedad, ...props }) => {
  if (arrayOps) {
    const items = arrayOps.map((num, i) => (
      <div key={i}>
        <img
          width="300px"
          height="150px"
          alt="carousel"
          loading="lazy"
          src={num.downloadLink ? num.downloadLink : ""}
          onClick={onChangePropiedad}
        />
      </div>
    ));
    return (
      <Carousel dots={false} arrows={settings}>
        {items}
      </Carousel>
    );
  } else {
    return (
      <Carousel>
        <div>
          <h3 style={contentStyle}></h3>
        </div>
      </Carousel>
    );
  }
};
