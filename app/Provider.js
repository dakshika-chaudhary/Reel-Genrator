"use client"
import React,{useEffect} from "react";
import {eq} from "drizzle-orm";
import {db} from "@/configs/db.ts";
import {Users} from "@/configs/schema.ts";
import {useUser} from "@clerk/nextjs";

function Provider({children}){
    
    const {user} = useUser();

    useEffect(()=>{
        user && isNewUser();
    },[user]);

    const isNewUser = async()=>{
        const result = await db.select().from(Users)
        .where(eq(Users.email,user?.primaryEmailAddress?.emailAddress));
        
        console.log(result);
        if(!result[0]){
            await db.insert(Users).value({
                name:user.fullName,
                email:user?.primaryEmailAddress?.emailAddress,
                imageUrl:user?.imageUrl
            });     
        }
    }
    return(
        <div>
           {children}
        </div>
    )
}

export default Provider;