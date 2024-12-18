import React, { useState } from "react";
// import { ReactComponent as infoIcon } from "../images/info-icon-svgrepo-com(1).svg";


function Card(props) {
  //state/////////////////////////////////:
//   const [displayInfoIcon, setDisplayInfoIcon] = useState(true);
  //comportement//////////////////////////

  //render///////////////////////////:
  return (
    <div
      className={`w-auto rounded-xl min-h-max bg-gradient-to-tl from-secondary-100 to-secondary-100 max-w-80 relative m-auto shadow-lg border-text  ${props.stylehdiw}`}
    >
      <div className="flex flex-col justify-center items-center m-10">
        {/* {displayInfoIcon ? {infoIcon} : null} */}
        <h1 className="font-bold mx-auto size-6 text-center text-xl leading-6 text-text w-fit h-max">
          {props.header}
        </h1>
        <div className="size-3 leading-5 text-text mx-auto w-fit h-max text-center">
          {props.children}
        </div>
      </div>
    </div>
  );
}

export default Card;
