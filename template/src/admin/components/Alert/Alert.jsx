/* eslint-disable react/prop-types */
import React, { useEffect} from "react";
import "./alert.css";

function Alert({type, message, show, setShow, setCount, count}) {    
        type === 'warning'? type = "warning" : "success"
            
        useEffect(() => {
          if (count === 0) {
            setShow(false)
          } else {
            const timer = setTimeout(() => setCount(count - 1), 1000);
            return () => clearTimeout(timer);
          }
        }, [count]);
    

        
    return(
    <>
    {show && (
    <div>
      <p className={type}>{message}</p>
    </div>
     )} 
    </>
);

}

export default Alert;