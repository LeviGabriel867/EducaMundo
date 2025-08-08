import { useState, useEffect } from "react";
import UploadActivities from "../InteracionComponent/UploadActivities";
function Pictures({ category }) { 
    return(
        <UploadActivities category={category}/>

    ) 
}

export default Pictures;