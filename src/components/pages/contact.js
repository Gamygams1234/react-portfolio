import React from "react";
import loginImg from "../../../static/assets/images/auth/authentication-pic.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function () {
  return (
    <div className="content-page-wrapper">
      <div
        className="left-column contact-picture"
        style={{
          background: "url(" + loginImg + ") no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <div className="right-column">
        <h1>To get in touch with me.</h1>
        <div className="contact-bullet-points">
          <div className="bullet-point-group">
            <div className="icon">
              <FontAwesomeIcon icon="envelope" />
            </div>

            <div className="text">gamyburgos@gmail.com</div>
          </div>
          <div className="bullet-point-group">
            <div className="icon">
              <FontAwesomeIcon icon="laptop" />
            </div>

            <a href="https://github.com/Gamygams1234" className="text">
              github.com/Gamygams1234
            </a>
          </div>

          <div className="bullet-point-group">
            <div className="icon">
              <FontAwesomeIcon icon="map-marked-alt" />
            </div>

            <div className="text">Riverside, California</div>
          </div>
          <div className="bullet-point-group">
            <div className="icon">
              <FontAwesomeIcon icon="phone" />
            </div>

            <div className="text">951-824-0713</div>
          </div>
        </div>
      </div>
    </div>
  );
}
