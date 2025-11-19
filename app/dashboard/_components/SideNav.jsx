import { CircleUserIcon, FileVideo, PanelsTopLeft, ShieldPlus } from "lucide-react";
import React from "react";

function SideNav() {
    const MenuOption=[
        {
            id:1,
            name:'Dashboard',
            path:'/dashboard',
            icon:PanelsTopLeft
        },
        {
            id:1,
            name:'Create New',
            path:'/create-new',
            icon:FileVideo
        },
        {
            id:1,
            name:'Upgrade',
            path:'/upgrade',
            icon:ShieldPlus
        },
        {
            id:1,
            name:'Account',
            path:'/account',
            icon:CircleUserIcon
        }
    ]
    return <div>SideNav</div>;
}

export default SideNav;

