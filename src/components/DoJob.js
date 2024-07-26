import { useEffect, useState } from "react";

export default function DoJob(props){
    let condition=false;
    if(props.job.length>0){
        condition=true
    }else{
        condition=false
    }
    if(props.id){
        console.log(props.id)
    }
    return(
        <>
            {condition&&<div className="written-jobs-container" >
                <div className="written-jobs">
                    <input  
                        type="checkbox"
                        className="done"
                        name="done"
                        // checked={props.done}
                        // onChange={props.handleChange}
                    >
                    </input>
                    <div  className="job-name">
                        {/* {props.job} */}
                    </div>
                </div>
            </div>}
        </>
    )
}