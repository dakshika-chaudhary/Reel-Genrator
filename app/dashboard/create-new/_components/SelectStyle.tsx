// "use client"
// import React from "react";
// import Image from "next/image";

// interface SelectStyleProps {
//   onUserSelect: (fieldName: string, fieldValue: string) => void;
// }


// export default function SelectStyle({ onUserSelect }: SelectStyleProps) {
//     const styleOptions=[
//         {
//             name:'Realistic',
//             image:'/appImages/realistic.png'
//         },
//         {
//             name:'Cartoon',
//             image:'/appImages/cartoon.png'
//         },
//         {
//             name:'Anime',
//             image:'/appImages/anime.png'
//         },
//         {
//             name:'Sketch',
//             image:'/appImages/sketch.png'
//         },
//         {
//             name:'Pixel Art',
//             image:'/appImages/pixelArt.png'
//         },
//         {
//             name:'3D',
//             image:'/appImages/3d.png'
//         },
//         {
//             name:'Watercolor',
//             image:'/appImages/watercolor.png'
//         }
//     ]

//     const [selectedOption, setSelectedOption] = React.useState<string>('');
//     const handleSelect = (style: string) => {
//     setSelectedOption(style);
//     onUserSelect("imageStyle", style);
//   };
//     return (
//         <div>   
//             <h2 className="font-bold text-2xl text-primary">Style</h2>
//             <p className="text-gray-500">Select your video style</p>
//             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5">
//                 {
//                     styleOptions.map((item,index)=>(
//                      <div key={index} className={`grid grid-rows-1 relative hover:scale-105 transition-all cursor-pointer
//                       ${selectedOption===item.name?'border-4 border-blue-500 rounded-lg':''}
//                      `}>
//                         <Image src={item.image} width={100} height={100} alt={item.name} 
//                          className="h-40 object-cover rounded-lg w-full"
//                          onClick={()=>handleSelect(item.name)}/>
//                         <h2 className="text-center bg-black text-white text-sm mt-1">{item.name}</h2>
//                      </div>      

//                     ))
//                 }
//             </div>
//         </div>
//     );
// }

"use client";
import React from "react";
import Image from "next/image";

interface SelectStyleProps {
  onUserSelect: (fieldName: string, fieldValue: string) => void;
}

export default function SelectStyle({ onUserSelect }: SelectStyleProps) {
  const styleOptions = [
    { name: "Realistic", image: "/appImages/realistic.png" },
    { name: "Cartoon", image: "/appImages/cartoon.png" },
    { name: "Anime", image: "/appImages/anime.png" },
    { name: "Sketch", image: "/appImages/sketch.png" },
    { name: "Pixel Art", image: "/appImages/pixelArt.png" },
    { name: "3D", image: "/appImages/3d.png" },
    { name: "Watercolor", image: "/appImages/watercolor.png" },
  ];

  const [selectedOption, setSelectedOption] = React.useState<string>("");

  const handleSelect = (style: string) => {
    setSelectedOption(style);
    onUserSelect("imageStyle", style);
  };

  return (
    <div
      className="
        p-6 rounded-xl 
        bg-white/5 backdrop-blur-xl 
        border border-white/20 
        shadow-lg shadow-black/30
        text-white mt-5
      "
    >
      {/* Title */}
      <h2 className="text-2xl font-semibold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
        Style
      </h2>

      <p className="text-gray-300 mt-1">Select your video style</p>

      {/* Style grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 mt-5">
        {styleOptions.map((item, index) => {
          const isActive = selectedOption === item.name;

          return (
            <div
              key={index}
              onClick={() => handleSelect(item.name)}
              className={`
                group cursor-pointer rounded-xl overflow-hidden relative 
                backdrop-blur-lg border transition-all duration-300
                ${
                  isActive
                    ? "border-purple-500 shadow-lg shadow-purple-800/40 scale-105"
                    : "border-white/10 hover:border-white/30 hover:scale-105"
                }
              `}
            >
              {/* Image */}
              <Image
                src={item.image}
                width={200}
                height={200}
                alt={item.name}
                className="
                  w-full h-40 object-cover 
                  transition-all group-hover:brightness-110
                "
              />

              {/* Name label */}
              <div
                className="
                  absolute bottom-0 w-full 
                  bg-black/50 backdrop-blur-md 
                  text-center py-2 text-sm text-white font-medium
                "
              >
                {item.name}
              </div>

              {/* Glow Selection Overlay */}
              {isActive && (
                <div className="absolute inset-0 bg-purple-600/20 pointer-events-none"></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
