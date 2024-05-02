export default function TopContent ({className, children}:{className:string, children:any}) {
    return (
        <div className={`flex flex-col items-start justify-center gap-2 w-full h-80 bg-gradient-to-r from-amber-700 to-amber-500  p-4 text-white dark:bg-gradient-to-r dark:from-[#121212] dark:to-[#121212] ${className} `}>
            {children}
        </div>
    )
}