import { useState } from "react";
import AlertContext from "./AlertContext";



const AlertState = (props) => {

  const [alertMsg, setAlertMsg] = useState(null); 



   // Method for showing alert message for alert  

   const showAlert = (alrtmsg)=>{
    setAlertMsg(alrtmsg); 

    setTimeout(() => {
      setAlertMsg(null); 
    }, 1500);

    
  }; 

return(
  <AlertContext.Provider value={{alertMsg, showAlert}}>
    {props.children}
</AlertContext.Provider>
);
};
export default AlertState;