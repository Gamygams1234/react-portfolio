import React from "react";
import profilePicture from "../../../static/assets/images/bio/headshot.jpg";

export default function () {
  return (
    <div className="content-page-wrapper">
      <div className="left-column-about">
        <img src={profilePicture} />
      </div>
      <div className="right-column">Hey, my name's Gamaliel Burgos. I live in Riverside, California and am currently building web applications using different technologies such as React, Python, Javascript, SQL, and other technologies . My first bit of exposure to web development was through Bottega Coding School in 2019. In the course, we started with basic HTML/CSS, and continued to become proficient in both front and back end coding. I like to think that I've learned a lot since then! Check out some of my work, and feel free to shoot me an email if you'd like to work together.</div>
    </div>
  );
}
