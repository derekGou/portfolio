import Image from "next/image";

interface Props {
    children?: string;
}

export default function ListItem({children}: Props) {
    return (
        <div className="flex flex-row gap-4 items-center justify-center">
            <Image
                alt="bullet point"
                className="h-4 w-4"
                src="/LogoPF.svg"
                width={16}
                height={16}
            />
            <p>{children}</p>
        </div>
    )
}