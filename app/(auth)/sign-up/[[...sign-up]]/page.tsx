"use client";

import Image from "next/image";
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
      <div className="flex justify-center items-center">
        <Image
          src="/appImages/login.jpg"
          alt="login"
          width={500}
          height={500}
          className="object-cover"
        />
      </div>

      <div className="flex justify-center items-center p-10">
        <SignUp />
      </div>
    </div>
  );
}
