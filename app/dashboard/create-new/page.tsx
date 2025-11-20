"use client";
import React from "react";
import SelectTopic from "./_components/SelectTopic";
import { useState } from "react";
import SelectStyle from "./_components/SelectStyle";
import SelectDuration from "./_components/SelectDuration";


export default function CreateNewPage(){
    const [formData ,setFormData] = useState({
        topic:"",
        customPrompt:""
    });

    const onHandleInputChange = (fieldName:string,fieldValue:string)=>{
        console.log(fieldName,fieldValue);

    }
    return (
        <div className="p-3">
            <h1 className="font-bold text-4xl text-primary text-center">Create New Dashboard</h1>
            <div className="mt-10 shadow-md p-10">
                <SelectTopic onUserSelect={onHandleInputChange} />
              <SelectStyle onUserSelect={onHandleInputChange} />
              <SelectDuration onUserSelect={onHandleInputChange} />
            </div>
        </div>
    );
}
