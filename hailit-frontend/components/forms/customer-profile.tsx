import { Input } from "@/components/ui/input";

export default function CustomerProfile () {
    const inputAndLabeClass = 'w-full max-w-sm items-center';
    const labelClass = "text-sm font-medium mb-1";
    return (
        
                <>
                <div className="grid grid-cols-2 gap-4">
                    <div className={inputAndLabeClass}>
                        <h3 className={labelClass}>First Name</h3>
                        <Input  type="text" placeholder="First Name" className="h-14" />
                    </div>
                    <div className={inputAndLabeClass}>
                        <h3 className={labelClass}>Last Name</h3>
                        <Input  type="text" placeholder="Last Name" className="h-14" />
                    </div>
              </div>
                <div className={inputAndLabeClass}>
                        <h3 className={labelClass}>Email</h3>
                        <Input  type="email" placeholder="email@example.com" className="h-14" />
                </div>
                <div className={inputAndLabeClass}>
                        <h3 className={labelClass}>Phone Number</h3>
                        <Input  type="number" placeholder="024 123 4567" className="h-14" />
                    </div>
                <div>
                
              </div>

              </>
 

    )
}