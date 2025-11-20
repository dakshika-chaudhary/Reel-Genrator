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

export default function SelectTopic({ onUserSelect }: SelectTopicProps) {
  const options = ["Custom Prompt", "Random AI Story", "Scary Story", "Hidden Story"];
  const [selectedOption, setSelectedOption] = useState<string>("");

  return (
    <div className="p-3">
      <h1 className="font-bold text-2xl text-primary">Content</h1>
      <p className="text-gray-500">What is the topic of your video?</p>

      <Select
        onValueChange={(value: string) => {
          setSelectedOption(value);
          if (value !== "Custom Prompt" && onUserSelect) {
            onUserSelect("topic", value);
          }
        }}
      >
        <SelectTrigger className="w-full mt-2 p-4 text-lg">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>

        <SelectContent>
          {options.map((item, index) => (
            <SelectItem key={index} value={item}>
              {item}
            </SelectItem>
             
          ))}
        </SelectContent>
      </Select>

      {selectedOption === "Custom Prompt" && (
        <Textarea
          className="mt-3"
          onChange={(e)=>onUserSelect && onUserSelect('topic',e.target.value)}
          placeholder="Enter your custom prompt here on which you want to generate the video"
        />
      )}
    </div>
  );
}
