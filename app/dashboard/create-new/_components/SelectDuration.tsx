"use client";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface SelectTopicProps {
  value?: string;
  onUserSelect?: (key: string, value: string) => void;
}

export default function SelectDuration({
  value,
  onUserSelect,
}: SelectTopicProps) {
  const [isCustom, setIsCustom] = useState(false);
  const [customDuration, setCustomDuration] = useState("");

  const handleSelect = (val: string) => {
    if (val === "custom") {
      setIsCustom(true);
      onUserSelect?.("duration", "");
    } else {
      setIsCustom(false);
      onUserSelect?.("duration", val);
    }
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCustomDuration(val);
    if (val) {
      onUserSelect?.("duration", `${val} Seconds`);
    }
  };

  return (
    <div className="p-6 mt-7 rounded-xl bg-white/5 border border-white/20 text-white">
      <h1 className="text-2xl font-semibold">Duration</h1>

      <Select value={isCustom ? "custom" : value} onValueChange={handleSelect}>
        <SelectTrigger className="mt-4">
          <SelectValue placeholder="Select Duration" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="30 Seconds">30 Seconds</SelectItem>
          <SelectItem value="60 Seconds">60 Seconds</SelectItem>
          <SelectItem value="custom">Custom</SelectItem>
        </SelectContent>
      </Select>

      {isCustom && (
        <div className="mt-4">
          <Input
            type="number"
            min={1}
            placeholder="Enter duration in seconds"
            value={customDuration}
            onChange={handleCustomChange}
            className="bg-black/30 text-white"
          />
        </div>
      )}
    </div>
  );
}
