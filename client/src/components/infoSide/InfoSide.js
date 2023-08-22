import React from "react";
import InfoLogo from "./InfoLogo";
import TrendCard from "./TrendCard";

const InfoSide = () => {
  return (
    <div className="d-flex flex-column gap-4">
      <InfoLogo />
      <TrendCard />

      <button className="btn btn-sm btn-warning px-3 py-2">Share</button>
    </div>
  );
};

export default InfoSide;
