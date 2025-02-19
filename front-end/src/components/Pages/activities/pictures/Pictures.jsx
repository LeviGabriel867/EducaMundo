import { useState, useEffect } from "react";
import UploadActivities from "../InteracionComponent/UploadActivities";
function Pictures({ category }) { // Recebe a categoria como prop
    return(
        <UploadActivities category={category}/>

    ) 
}

export default Pictures;