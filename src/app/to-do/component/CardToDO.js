// src/components/CardToDO.js
import React from "react";
import { Card, Image } from "antd";
import Item from "antd/es/list/Item";
const { Meta } = Card;
const CardToDO = ({ data }) => {
  return (
    <div className="my-card">
      <Card title="Card title" bordered={false}>
        Card content
      </Card>
    </div>
  );
};

export default CardToDO;
