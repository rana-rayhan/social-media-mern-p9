import React from "react";

import "./trenddata.css";
import { TrendData } from "../../data/trendData";

const TrendCard = () => {
  return (
    <div className="TrendCard">
      <h3>Trends for you</h3>
      {TrendData.map((trend, index) => {
        return (
          <div key={index} className="trend">
            <span>#{trend.name}</span>
            <span>{trend.shares}k shares</span>
          </div>
        );
      })}
    </div>
  );
};

export default TrendCard;
