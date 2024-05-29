import React from "react";

export default function TrackOrderContainer ({headingText, children}: {headingText:string, children:React.ReactNode}) {
    return (
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <h3 className="font-bold text-sm">{headingText}</h3>
          {children}
        </div>
    )
}