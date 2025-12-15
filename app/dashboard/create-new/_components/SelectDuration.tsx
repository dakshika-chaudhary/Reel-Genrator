
"use client";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectTopicProps {
  value?:string,
  onUserSelect?: (key: string, value: string) => void;
}



export default function SelectDuration({ value, onUserSelect }: SelectTopicProps) {
  return (
    <div className="p-6 mt-7 rounded-xl bg-white/5 border border-white/20 text-white">
      <h1 className="text-2xl font-semibold">Duration</h1>

      <Select
        value={value}
        onValueChange={(val) => onUserSelect?.("duration", val)}
      >
        <SelectTrigger className="mt-4">
          <SelectValue placeholder="Select Duration" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="30 Seconds">30 Seconds</SelectItem>
          <SelectItem value="60 Seconds">60 Seconds</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
