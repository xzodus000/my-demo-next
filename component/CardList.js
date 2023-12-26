// src/components/CardList.js
import React from "react";
import { Card, Image } from "antd";
import Item from "antd/es/list/Item";
const { Meta } = Card;
const CardList = ({ data }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        padding: "20px",
      }}
    >
      {data.map((item, index) => (
        <Card
          key={item.code}
          hoverable
          style={{ width: 240 }}
          cover={<Image alt="example" src={item.imageFlag} />}
        >
          <Meta
            title={`${item.name} (${item.code})`}
            description={`${item.languages.map((Item) => {
              return Item.name;
            })}`}
          />
        </Card>
      ))}
    </div>
  );
};

export default CardList;
