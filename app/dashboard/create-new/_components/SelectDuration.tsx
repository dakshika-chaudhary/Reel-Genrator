
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
  onUserSelect?: (key: string, value: string) => void;
}

export default function SelectDuration({ onUserSelect }: SelectTopicProps) {
  const [selectedOption, setSelectedOption] = useState<string>("");

  return (
    <div
      className="
        p-6 mt-7 
        rounded-xl 
        bg-white/5 backdrop-blur-xl 
        border border-white/20  
        shadow-lg shadow-black/30
        text-white
      "
    >
      {/* Title */}
      <h1 className="text-2xl font-semibold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
        Duration
      </h1>

      <p className="text-gray-300 text-sm mt-1">
        What is the duration of your video?
      </p>

      {/* Select Dropdown */}
      <Select
        onValueChange={(value: string) => {
          setSelectedOption(value);
          onUserSelect && onUserSelect("duration", value);
        }}
      >
        <SelectTrigger
          className="
            w-full mt-4 p-4 text-lg
            bg-white/10 border border-white/20 
            text-white rounded-xl 
            hover:bg-white/20 transition
          "
        >
          <SelectValue placeholder="Select Duration" />
        </SelectTrigger>

        <SelectContent
          className="
            bg-black/40 backdrop-blur-xl 
            border border-white/10 text-white
          "
        >
          <SelectItem
            value="30 Seconds"
            className="cursor-pointer hover:bg-white/10"
          >
            30 Seconds
          </SelectItem>

          <SelectItem
            value="60 Seconds"
            className="cursor-pointer hover:bg-white/10"
          >
            60 Seconds
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
