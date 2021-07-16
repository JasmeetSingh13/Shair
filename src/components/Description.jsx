import React from "react";

const Description = ({title,carType,model})=>{
    return(
    <div>
    <h1>{title}</h1>
    <h2>{model}</h2>
    <p>{carType}</p>
  
    </div>
    );
}
export default Description;