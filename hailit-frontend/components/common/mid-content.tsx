//previous dark background: bg-[#242323]
export default function MidContent({
  children,
  className,
}: {
  children: any;
  className: string;
}) {
  return (
    <div
      className={`gap-3 bg-white dark:bg-[#121212] w-full -mt-20 rounded-tr-[50px] md:rounded-none ${className}`}
    >
      {children}
    </div>
  );
}
