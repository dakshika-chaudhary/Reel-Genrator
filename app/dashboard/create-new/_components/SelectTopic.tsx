

"use client";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface SelectTopicProps {
  value?: string;
  onUserSelect?: (key: string, value: string) => void;
}

export default function SelectTopic({ value, onUserSelect }: SelectTopicProps) {
  const options = ["Custom Prompt", "Random AI Story", "Scary Story", "Hidden Story"];
  const [selectedOption, setSelectedOption] = useState<string>(value || "");

  // 🔥 THIS FIXES EDIT PAGE PREFILL
  useEffect(() => {
    if (value) setSelectedOption(value);
  }, [value]);

  return (
    <div className="p-6 rounded-xl bg-white/5 border border-white/20 text-white">
      <h1 className="text-2xl font-semibold">Content</h1>

      <Select
        value={selectedOption}
        onValueChange={(val) => {
          setSelectedOption(val);
          onUserSelect?.("topic", val);
        }}
      >
        <SelectTrigger className="mt-4">
          <SelectValue placeholder="Select Topic" />
        </SelectTrigger>

        <SelectContent>
          {options.map((item) => (
            <SelectItem key={item} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Custom Prompt */}
      {selectedOption === "Custom Prompt" && (
        <Textarea
          className="mt-4"
          placeholder="Enter your custom prompt..."
          onChange={(e) =>
            onUserSelect?.("customPrompt", e.target.value)
          }
        />
      )}
    </div>
  );
}
