import React from "react";

export default function TopContent({
  className,
  children,
}: {
  className: string;
  children: React.ReactNode;
}) {

  const mdOrLargerClass ='md:items-center'
  return (
    <div
      className={`flex flex-col items-start justify-center gap-2 w-full h-80 bg-gradient-to-r from-blue-700 to-blue-500  p-4 text-white dark:bg-gradient-to-r dark:from-[#1e1e1e] dark:to-[#1e1e1e] ${mdOrLargerClass} ${className} `}
    >
      {children}
    </div>
  );
}
