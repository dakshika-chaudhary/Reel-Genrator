
"use client";

import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import Image from "next/image";
function CustomLoading({ loading }: { loading: boolean }){
    return(
        <div>
             <AlertDialog open={loading}>
      
      <AlertDialogContent>
  <AlertDialogHeader>
    <AlertDialogTitle>Loading</AlertDialogTitle>
    <AlertDialogDescription>
      Please wait while we process your request.
    </AlertDialogDescription>
  </AlertDialogHeader>

  <div className="bg-white flex flex-col items-center my-10 justify-center">
<Image src="/process.png" alt="Loading" width={50} height={50} />
    <h2>Generating your video...</h2>
  </div>
</AlertDialogContent>

    </AlertDialog>
        </div>
    )
}

export default CustomLoading;