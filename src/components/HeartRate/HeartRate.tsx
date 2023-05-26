import React from "react";
import "./HeartRate.scss";

import { Card } from "primereact/card";

export type HeartRateProps = {
  bpm: number;
};

const HeartRate: React.FC<HeartRateProps> = (props: HeartRateProps) => {
  return (
    <div id="bpm" className="has-text-centered">
      <Card>
        <h2 id="bpm-title">{props.bpm}</h2>
        <p className="m-0">bpm</p>
      </Card>
    </div>
  );
};

export default HeartRate;
