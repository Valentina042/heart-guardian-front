import React from "react";
import "./InfoMessage.scss";
import { Message } from "primereact/message";

export type InfoMessageProps = {
  actualBpm: number;
  userAvgBpm: number;
  bpms: number[];
};

const InfoMessage: React.FC<InfoMessageProps> = (props: InfoMessageProps) => {
  const minValue = Math.min(...props.bpms);
  const maxValue = Math.max(...props.bpms);
  if (props.actualBpm <= minValue) {
    return (
      <>
        <Message
          severity="warn"
          text="Tu ritmo cardiaco está por debajo de lo normal"
        />
      </>
    );
  }
  if (props.actualBpm >= maxValue) {
    return (
      <>
        <Message
          severity="error"
          text="Tu ritmo cardiaco está por encima de lo normal"
        />
      </>
    );
  }
  return (
    <>
      <Message severity="success" text="Te encuentras en un nivel estable" />
    </>
  );
};

export default InfoMessage;
