
import DispatcherBottomNav from "./DispatcherBottomNav"
import { DispatcherTopNav } from "./DispatcherTopNav"
export default function DispatcherNavWrapper ({children}:{children:React.ReactNode}) {
    return (
        <>
        <DispatcherTopNav/>
        {children}
        <DispatcherBottomNav/>
        </>
    )
}