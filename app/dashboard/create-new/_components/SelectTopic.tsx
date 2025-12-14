// "use client";
// import React, { useState } from "react";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Textarea } from "@/components/ui/textarea";

// interface SelectTopicProps {
//   onUserSelect?: (key: string, value: string) => void;
// }

// export default function SelectTopic({ onUserSelect }: SelectTopicProps) {
//   const options = ["Custom Prompt", "Random AI Story", "Scary Story", "Hidden Story"];
//   const [selectedOption, setSelectedOption] = useState<string>("");

//   return (
//     <div className="p-3">
//       <h1 className="font-bold text-2xl text-primary">Content</h1>
//       <p className="text-gray-500">What is the topic of your video?</p>

//       <Select
//         onValueChange={(value: string) => {
//           setSelectedOption(value);
//           if (value !== "Custom Prompt" && onUserSelect) {
//             onUserSelect("topic", value);
//           }
//         }}
//       >
//         <SelectTrigger className="w-full mt-2 p-4 text-lg">
//           <SelectValue placeholder="Theme" />
//         </SelectTrigger>

//         <SelectContent>
//           {options.map((item, index) => (
//             <SelectItem key={index} value={item}>
//               {item}
//             </SelectItem>
             
//           ))}
//         </SelectContent>
//       </Select>

//       {selectedOption === "Custom Prompt" && (
//         <Textarea
//           className="mt-3"
//           onChange={(e)=>onUserSelect && onUserSelect('topic',e.target.value)}
//           placeholder="Enter your custom prompt here on which you want to generate the video"
//         />
//       )}
//     </div>
//   );
// }

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
    <div
      className="
        p-6 rounded-xl 
        bg-white/5 backdrop-blur-xl 
        border border-white/20 
        shadow-lg shadow-black/30
        text-white
      "
    >
      {/* Title */}
      <h1 className="text-2xl font-semibold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
        Content
      </h1>

      <p className="text-gray-300 text-sm mt-1">
        What is the topic of your video?
      </p>

      {/* SELECT DROPDOWN */}
      <Select
        onValueChange={(value: string) => {
          setSelectedOption(value);
          if (value !== "Custom Prompt" && onUserSelect) {
            onUserSelect("topic", value);
          }
        }}
      >
        <SelectTrigger
          className="
            w-full mt-4 p-4 
            bg-white/10 border border-white/20 
            text-white rounded-xl 
            hover:bg-white/20 transition
          "
        >
          <SelectValue placeholder="Select Topic" />
        </SelectTrigger>

        <SelectContent
          className="
            bg-black/40 backdrop-blur-xl 
            border border-white/10 text-white
          "
        >
          {options.map((item, index) => (
            <SelectItem
              key={index}
              value={item}
              className="
                cursor-pointer 
                hover:bg-white/10 text-white
              "
            >
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* CUSTOM PROMPT TEXTAREA */}
      {selectedOption === "Custom Prompt" && (
        <Textarea
          className="
            mt-4 p-4 h-28
            bg-white/10 border border-white/20
            text-white placeholder-gray-400
            rounded-xl
            focus:ring-2 focus:ring-purple-500/40
          "
          onChange={(e) =>
            onUserSelect && onUserSelect("topic", e.target.value)
          }
          placeholder="Enter your custom prompt here..."
        />
      )}
    </div>
  );
}
