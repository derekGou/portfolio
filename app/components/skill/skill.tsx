import { ReactNode } from "react";
import Glass from "../glass/glass";
import { IconContext } from "react-icons";

interface Props {
    icon: ReactNode,
    name: string,
}

export default function Skill({icon, name}: Props){
    return(
        <Glass dark={true} className="hover:bg-[#444] hover:border-[#fffb]! transition-all cursor-default">
            <div className="mx-4 my-2 flex flex-row gap-2 items-center justify-center w-full">
                <IconContext.Provider value={{ color: "#fff", size: "18" }}>
                    {icon}
                </IconContext.Provider>
                <p className="w-auto! text-[0.8rem]">{name}</p>
            </div>
        </Glass>
    )
}