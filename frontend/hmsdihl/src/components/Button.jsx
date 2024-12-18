import React from "react";

function Button(props) {
  //state

  //comportement

  //render
  return (
    <div
      onClick={props.onClick}
    //   className={`w-fit rounded ${props.bgColor} p-2 px-4 ${props.text} mx-3
    // hover:cursor-pointer hover:`}
    className={`py-3 px-5 rounded-xl font-body tracking-tight ${props.bgColor} ${props.buttonBorderColorInfo} ${props.text}
     flex justify-center items-center font-semibold m-3 hover:cursor-pointer ease-in duration-100 max-w-60
     ${props.buttonHoverInfo}`}
    >
      {props.children}
    </div>
  );
}

export default Button;
