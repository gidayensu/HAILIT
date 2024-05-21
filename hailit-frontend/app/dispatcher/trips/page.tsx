import { RecentTripTable } from "@/components/Dashboard/RecentTripTable";
import Container from "@/components/ui/container";

export default function RiderTrips () {
    return (
    <main className="flex flex-col items-center justify-center p-4 w-full">
    <h1 className="font-bold mb-5 text-lg">All Trips of Rara Agyenim</h1>
    <Container className="flex items-center justify-center h-full w-5/6 bg-white rounded-xl">
        
        <RecentTripTable/>
    </Container>
    </main>)

}