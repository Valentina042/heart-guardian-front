import React, { useEffect, useState } from "react";
import "./SecurityQuestions.scss";

import { TabView, TabPanel } from "primereact/tabview";
import { SelectButton } from "primereact/selectbutton";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
export type SecurityQuestionsProps = {
  message?: string;
  actualBpm: number;
  userAvgBpm: number;
  bpms: number[];
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
const SecurityQuestions: React.FC<SecurityQuestionsProps> = (
  props: SecurityQuestionsProps
) => {
  const [user, setUser] = useState<User | null>(null);
  const options = ["Si", "No"];
  const [firstQuestion, setFirstQuestion] = useState(options[1]);
  const [secondtQuestion, setSecondQuestion] = useState(options[1]);
  const [thirdQuestion, setThirdQuestion] = useState(options[1]);

  const [firstQuestionHidden] = useState(false);
  const [secondtQuestionHidden, setSecondQuestionHidden] = useState(true);
  const [thirdQuestionHidden, setThirdQuestionHidden] = useState(true);

  const [questions, setQuestions] = useState([""]);

  const MySwal = withReactContent(Swal);

  useEffect(() => {
    const userStored = localStorage.getItem("userStored");
    const parsedUserStored: User | null = userStored
      ? JSON.parse(userStored)
      : null;
    setUser(parsedUserStored);
    fetch("https://heart-guardian-service.vercel.app//questions")
      .then((response) => response.json())
      .then((data) => setQuestions(data));
  }, []);

  const notifyEmergencyContact = () => {
    console.log("notify to emergency contact");
    fetch(`https://heart-guardian-service.vercel.app//emergency/${user?.email}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw response.json();
        }
      })
      .then((data: any) => {
        MySwal.fire({
          position: "center",
          icon: "success",
          title: data,
          showConfirmButton: true,
          timer: 2500,
        }).catch((error) => {
          error.then((errorMessage: any) => {
            MySwal.fire({
              position: "center",
              icon: "error",
              title: errorMessage,
              showConfirmButton: true,
              timer: 2500,
            });
          });
        });
      });
  };
  const handleFirstQ = (value: any) => {
    setFirstQuestion(value);
    setSecondQuestionHidden(false);
  };

  const handleSecondQ = (value: any) => {
    setSecondQuestion(value);
    setThirdQuestionHidden(false);
  };

  const handleThirdQ = (value: any) => {
    setThirdQuestion(value);
    if (value === options[0]) {
      notifyEmergencyContact();
      return;
    }
    MySwal.fire({
      position: "center",
      icon: "success",
      title: "Te seguiremos monitoreando",
      showConfirmButton: true,
      timer: 2500,
    });
  };
  const minValue = Math.min(...props.bpms);
  const maxValue = Math.max(...props.bpms);
  console.log("actualBpm: ", props.actualBpm);
  console.log("minValue: ", minValue);
  console.log("maxValue: ", maxValue);

  const showContent = !(
    props.actualBpm >= minValue && props.actualBpm <= maxValue
  );

  useEffect(() => {
    if (showContent) {
      const timeoutId = setTimeout(() => {
        console.log("hey: ", showContent);
        notifyEmergencyContact();
      }, 6000);
      return () => clearTimeout(timeoutId);
    }
  });

  const full_content = (
    <div className="card">
      <TabView>
        <TabPanel header="Pregunta I" disabled={firstQuestionHidden}>
          <p className="m-0">{questions[0]}</p>
          <div className="card flex justify-content-center">
            <SelectButton
              value={firstQuestion}
              onChange={(e) => handleFirstQ(e.value)}
              options={options}
            />
          </div>
        </TabPanel>
        <TabPanel header="Pregunta II" disabled={secondtQuestionHidden}>
          <p className="m-0"> {questions[1]}</p>
          <div className="card flex justify-content-center">
            <SelectButton
              value={secondtQuestion}
              onChange={(e) => handleSecondQ(e.value)}
              options={options}
            />
          </div>
        </TabPanel>
        <TabPanel header="Pregunta III" disabled={thirdQuestionHidden}>
          <p className="m-0"> {questions[2]}</p>
          <div className="card flex justify-content-center">
            <SelectButton
              value={thirdQuestion}
              onChange={(e) => handleThirdQ(e.value)}
              options={options}
            />
          </div>
        </TabPanel>
      </TabView>
    </div>
  );
  if (showContent) {
    return full_content;
  } else {
    return <></>;
  }
};

export default SecurityQuestions;
