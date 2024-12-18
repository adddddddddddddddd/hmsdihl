import React from "react";
import Card from "../components/Card";
import Nav from "../components/Nav";
import walkingman2 from "../assets/images/9800.png";

function About() {
  return (
    <div>
      <Nav></Nav>

      <div className="w-full h-svh flex justify-center items-center -z-10">
        <div className="h-svh w-full flex justify-center items-center">
          <div className="w-1/2 -ml-40">
          <img className="" src={walkingman2} alt="walkingman2" />
          </div>
          <div>
            <Card header={"About"} stylehdiw={"bg-background py-2"}>
              <p className="mt-7">
                I'm a student in engineering school in France. I want to make
                money with webdev.I am autodidactil. <br /> Hope it will help
                you to trust in my skills/potential.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
