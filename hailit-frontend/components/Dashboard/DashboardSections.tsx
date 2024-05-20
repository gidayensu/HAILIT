export default function DashboardSections({
    children,
    dashMin,
    sectionName,
    activeSection,
    onClickFunc,
  }: {
    children: React.ReactNode;
    dashMin: boolean;
    sectionName: string;
    activeSection: string;
    onClickFunc: (section: string) => void;
  }) {
    return (
      <div
        onClick={() => onClickFunc(sectionName)}
        className={`flex h-10 p-2  items-center w-full hover:text-blue-500 hover:bg-white rounded-md text-sm ${
          dashMin ? "justify-center" : "md:justify-between justify-center"
        }  cursor-pointer ${
          activeSection === sectionName ? "bg-white text-blue-500" : ""
        }`}
      >
        <div className="flex items-center justify-center gap-2 ">
          {children}
          {!dashMin && (
            <p className="hidden md:inline text-md font-bold"> {sectionName} </p>
          )}
        </div>
      </div>
    );
  }
  