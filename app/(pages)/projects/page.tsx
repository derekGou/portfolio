"use client"

import Glass from "@/app/components/glass/glass";
import Project from "@/app/components/project/project";
import { projectlist } from "@/app/components/project/projectlist";

export default function Projects() {
    const lst = projectlist

    return (
        <>
            <h3 className="mb-4">Projects</h3>
            <Glass className="w-full min-h-fit block! overflow-visible!">
                <div className="flex flex-col gap-4 p-4 items-start justify-start w-full h-auto! min-h-fit box-border">
                    {lst.map((item, index) => (
                        <Project name={item.name} image={item.image} dates={item.dates} href={item.href} skills={item.skills} winner = {item.winner} key = {index}>
                            {item.children}
                        </Project>
                    ))}
                </div>
            </Glass>
        </>
    );
}