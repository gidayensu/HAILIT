import OrderHistory from "@/components/Order/OrderHistory"
import { Separator } from "@/components/ui/separator"
import Container from "@/components/ui/container"
import { ThemeToggle } from "@/components/Theme/ThemeToggle"

export default function Dispatcher () {
    return (
        <main className="flex flex-col gap-3 p-4 items-center w-full justify-center mb-24">
            <div className="flex justify-between items-start md:justify-center gap-3 w-5/6 mb-2">
                <div className="flex gap-2 ml-1">
                <div className=" flex items-center justify-center w-16 h-16 bg-black text-white dark:bg-white dark:text-black rounded-md">
                    <p className="font-bold text-sm">RA</p>
                </div>
                <span className="space-y-1">

                <h3 className="font-bold leading-4">
                    Rama <br/> Agyenim
                </h3>
                <p className="text-[12px]">
                    Motor  Rider
                </p>
                </span>

                </div>
                <div className="md:hidden">
                    <ThemeToggle/>
                </div>
            </div>
            <Container className="flex w-4/5 md:w-3/5 h-44 rounded-xl p-2 gap-2">
                <div className="flex flex-col items-center justify-center gap-3 w-1/3">
                        <span className="flex items-center justify-center text-[12px] w-full bg-amber-500 dark:text-black font-medium h-6 rounded-md"><p>Active</p></span>
                        <p className="text-5xl font-bold">3</p>
                </div>
                <Separator orientation="vertical" className="dark:bg-slate-200 dark:opacity-10"/>
                <div className="flex flex-col items-center justify-center gap-3 w-1/3">
                        <span className="flex items-center justify-center text-[12px] w-full bg-green-500 dark:text-black font-medium h-6 rounded-md"><p>Completed</p></span>
                        <p className="text-5xl font-bold">19</p>
                </div>
                <Separator orientation="vertical" className="dark:bg-slate-200 dark:opacity-10"/>
                <div className="flex flex-col items-center justify-center gap-3 w-1/3">
                        <span className="flex items-center justify-center text-[12px] w-full bg-teal-500 font-medium h-6 dark:text-black rounded-md"><p>Earnings</p></span>
                        <p className="text-5xl font-bold">1.2K</p>
                </div>
            </Container>
            <OrderHistory/>
        </main>
    )
}