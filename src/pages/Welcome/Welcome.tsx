import React from "react";
import "./Welcome.scss";
import { useNavigate } from "react-router-dom";

import { ProgressSpinner } from "primereact/progressspinner";

export type WelcomeProps = {
  message?: string;
};

const Welcome: React.FC<WelcomeProps> = () => {
	const navigate = useNavigate();

	setTimeout(() => {
		navigate("/login")
	}, 4000);

  return (
    <div className="card body">
      <img src="circlelogo-modified.png"  />
    <div className="spinner-container">
          <ProgressSpinner
          style={{ width: "40px", height: "40px" }}
          animationDuration="8s"
        />
        </div>
  </div>
  );
};

export default Welcome;
