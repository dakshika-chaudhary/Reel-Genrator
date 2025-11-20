"use client"
import React from "react";
import Image from "next/image";

interface SelectStyleProps {
  onUserSelect: (fieldName: string, fieldValue: string) => void;
}


export default function SelectStyle({ onUserSelect }: SelectStyleProps) {
    const styleOptions=[
        {
            name:'Realistic',
            image:'/appImages/realistic.png'
        },
        {
            name:'Cartoon',
            image:'/appImages/cartoon.png'
        },
        {
            name:'Anime',
            image:'/appImages/anime.png'
        },
        {
            name:'Sketch',
            image:'/appImages/sketch.png'
        },
        {
            name:'Pixel Art',
            image:'/appImages/pixelArt.png'
        },
        {
            name:'3D',
            image:'/appImages/3d.png'
        },
        {
            name:'Watercolor',
            image:'/appImages/watercolor.png'
        }
    ]

    const [selectedOption, setSelectedOption] = React.useState<string>('');
    const handleSelect = (style: string) => {
    setSelectedOption(style);
    onUserSelect("style", style);
  };
    return (
        <div>   
            <h2 className="font-bold text-2xl text-primary">Style</h2>
            <p className="text-gray-500">Select your video style</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5">
                {
                    styleOptions.map((item,index)=>(
                     <div key={index} className={`grid grid-rows-1 relative hover:scale-105 transition-all cursor-pointer
                      ${selectedOption===item.name?'border-4 border-blue-500 rounded-lg':''}
                     `}>
                        <Image src={item.image} width={100} height={100} alt={item.name} 
                         className="h-40 object-cover rounded-lg w-full"
                         onClick={()=>setSelectedOption(item.name)}/>
                        <h2 className="text-center bg-black text-white text-sm mt-1">{item.name}</h2>
                     </div>      

                    ))
                }
            </div>
        </div>
    );
}