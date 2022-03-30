import React from "react";
import ReactSVG from "react-svg";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import cero from "../assets/img/PlanPaso0Desact.svg";
import one from "../assets/img/PlanPaso1Desact.svg";
import two from "../assets/img/PlanPaso2Desact.svg";
import three from "../assets/img/PlanPaso3Desact.svg";
import four from "../assets/img/PlanPaso4Desact.svg";
import five from "../assets/img/PlanPaso5Desact.svg";

class ProgressMenu extends React.Component {

  render() {
    const { step, data } = this.props;
    if (data.fastPlan) {
      return (
        <div className="progressBar">
          <ProgressBar
            hasStepZero={true}
            percent={25 * (step - 1)}
            filledBackground="white"
          >
            <Step>
              {() => (
                <div className="">
                  <ReactSVG
                    src={cero}
                    className={step > 1 ? "step-done" : ""}
                  />
                  <span className="h4 text-white"></span>
                </div>
              )}
            </Step>
            <Step>
              {() => (
                <div className="">
                  <ReactSVG src={one} className={step > 2 ? "step-done" : ""} />
                  <span className="h4 text-white"></span>
                </div>
              )}
            </Step>
            <Step>
              {() => (
                <div className="">
                  <ReactSVG src={two} className={step > 3 ? "step-done" : ""} />
                  <span className="h4 text-white"></span>
                </div>
              )}
            </Step>
            <Step className="progressBarStep">
              {({ accomplished }) => (
                <div className="">
                  <ReactSVG
                    src={three}
                    className={step > 4 ? "step-done" : ""}
                  />
                  <span className="h4 text-white"></span>
                </div>
              )}
            </Step>
            <Step className="progressBarStep">
              {({ accomplished }) => (
                <div className="">
                  <ReactSVG
                    src={four}
                    className={step > 8 ? "step-done" : ""}
                  />
                  <span className="h4 text-white"></span>
                </div>
              )}
            </Step>
          </ProgressBar>
        </div>
      );
    } else {
      return (
        <div className="progressBar">
          <ProgressBar percent={20 * (step - 1)} filledBackground="white">
            <Step>
              {() => (
                <div className="">
                  <ReactSVG
                    src={cero}
                    className={step > 1 ? "step-done" : ""}
                  />
                  <span className="h4 text-white"></span>
                </div>
              )}
            </Step>
            <Step>
              {() => (
                <div className="">
                  <ReactSVG src={one} className={step > 2 ? "step-done" : ""} />
                  <span className="h4 text-white"></span>
                </div>
              )}
            </Step>
            <Step>
              {() => (
                <div className="">
                  <ReactSVG src={two} className={step > 3 ? "step-done" : ""} />
                  <span className="h4 text-white"></span>
                </div>
              )}
            </Step>
            <Step className="progressBarStep">
              {({ accomplished }) => (
                <div className="">
                  <ReactSVG
                    src={three}
                    className={step > 4 ? "step-done" : ""}
                  />
                  <span className="h4 text-white"></span>
                </div>
              )}
            </Step>
            <Step className="progressBarStep">
              {({ accomplished }) => (
                <div className="">
                  <ReactSVG
                    src={four}
                    className={step > 5 ? "step-done" : ""}
                  />
                  <span className="h4 text-white"></span>
                </div>
              )}
            </Step>
            <Step className="progressBarStep">
              {({ accomplished }) => (
                <div className="">
                  <ReactSVG
                    src={five}
                    className={step > 6 ? "step-done" : ""}
                  />
                  <span className="h4 text-white"></span>
                </div>
              )}
            </Step>
          </ProgressBar>
        </div>
      );
    }
  }
}

export default ProgressMenu;
