"use client";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface SelectTopicProps {
  onUserSelect?: (key: string, value: string) => void;
}

export default function SelectDuration({ onUserSelect }: SelectTopicProps) {
  const [selectedOption, setSelectedOption] = useState<string>("");
  return (
    <div className="p-3 mt-7">
      <h1 className="font-bold text-2xl text-primary">Duration</h1>
      <p className="text-gray-500">What is the duration of your video?</p>

      <Select
        onValueChange={(value: string) => {
            
          onUserSelect && onUserSelect('duration',value)
        }}
      >
        <SelectTrigger className="w-full mt-2 p-4 text-lg">
          <SelectValue placeholder="Duration" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="30 Seconds">30 Seconds</SelectItem>
          <SelectItem value="60 Seconds">60 Seconds</SelectItem>
        </SelectContent>

      </Select>

    </div>
  );
}
