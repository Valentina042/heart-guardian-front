import React, { useEffect, useState } from "react";
import { Card } from "primereact/card";
import "./Home.css";
import HeartRate from "../../components/HeartRate/HeartRate";

import { Divider } from "primereact/divider";
import InfoMessage from "../../components/InfoMessage/InfoMessage";
import SecurityQuestions from "../../components/SecurityQuestions/SecurityQuestions";

export type HomeProps = {
  message?: string;
};

interface User {
  age: number;
  e_age: number;
  e_email: string;
  e_last_name: string;
  e_name: string;
  e_relation: string;
  e_telephone: string;
  email: string;
  id: string;
  last_name: string;
  password: string;
  telephone: string;
}

interface Bpms {
  bpms: number[];
  email: string;
  id: string;
  avg: number;
}

const Home: React.FC<HomeProps> = () => {
  const [bpm, setBpm] = useState(0);
  const [user, setUser] = useState<User | null>(null);
  const [bpms, setBpms] = useState<Bpms | null>(null);
  const handleHeartClick = () => {
    setBpm(generateNumber(35, 200));
  };
  const header = (
    <div className="image-container-home">
      <img src="/logo_remove.png" alt="Your Image" onClick={handleHeartClick} />
    </div>
  );
  console.log(user);
  useEffect(() => {
    setBpm(generateNumber(35, 200));
    const userStored = localStorage.getItem("userStored");
    const parsedUserStored: User | null = userStored
      ? JSON.parse(userStored)
      : null;
    setUser(parsedUserStored);
    fetch(
      `https://heart-guardian-service.vercel.app//bpm/${parsedUserStored?.email}`
    )
      .then((response) => response.json())
      .then((data: Bpms) => {
        setBpms(data);
      });
  }, []);

  const generateNumber = function (min: number, max: number): number {
    if (min > max) {
      throw new Error("Minimum value should be smaller than maximum value.");
    }
    const range: number = max - min;
    return Math.trunc(min + range * Math.random());
  };
  return (
    <div className="card flex justify-content-center">
      <Card
        title="Heart Guardian"
        subTitle="Estamos cuidando de ti..."
        header={header}
        className="md:w-25rem"
      >
        <Divider />
        <div>
          <div className="container">
            <div className="columns">
              <div className="column"></div>
              <div className="column">
                <HeartRate bpm={bpm} />
              </div>
              <div className="column"></div>
            </div>
          </div>
        </div>
        <Divider />
        <InfoMessage
          actualBpm={bpm}
          userAvgBpm={bpms ? bpms.avg : 0}
          bpms={bpms ? bpms?.bpms : []}
        ></InfoMessage>
        <Divider />
        <SecurityQuestions
          actualBpm={bpm}
          userAvgBpm={bpms ? bpms.avg : 0}
          bpms={bpms ? bpms?.bpms : []}
        />
      </Card>
    </div>
  );
};

export default Home;
