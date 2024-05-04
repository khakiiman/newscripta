import { useRef, useState } from "react"

export default function IconButton({ children, text, color, ...props }) {
    const [hovered, setHovered] = useState(false)
    const ref = useRef(null)
    return (
        <button
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className={`flex p-2 items-center rounded-lg text-black font-bold ${color || "bg-white"}`}

            {...props}>
            {children}
            <div
                style={{ width: hovered ? ref.current?.offsetWidth || 0 : 0 }}
                className="overflow-x-hidden hidden xs:flex xs:transition-all xs:duration-300 xs:ease-out">
                <span ref={ref} className="px-1.5">{text}</span>
            </div>
        </button>
    )
}