import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  
  const trips = [
    {
        tripId: "INV001",
        orderedBy: "Kwame Nkrumah",
        bookedOn: "2024-01-01",
        pickup: "Accra",
        pickupContact: "0241234567",
        dropOff: "Kumasi",
        dropOffContact: "0247654321",
        deliveredOn: "2024-01-02",
        amount: "GHS 250.00",
        paymentStatus: "Paid",
        paymentMethod: "Credit Card",
        deliveryStatus: "Delivered",
    },
    {
        tripId: "INV002",
        orderedBy: "Ama Asante",
        bookedOn: "2024-02-10",
        pickup: "Tamale",
        pickupContact: "0242223344",
        dropOff: "Takoradi",
        dropOffContact: "0245566778",
        deliveredOn: "---",
        amount: "GHS 300.00",
        paymentStatus: "Unpaid",
        paymentMethod: "Mobile Money",
        deliveryStatus: "Picked Up",
    },
    {
        tripId: "INV003",
        orderedBy: "Kojo Mensah",
        bookedOn: "2024-03-15",
        pickup: "Cape Coast",
        pickupContact: "0249988776",
        dropOff: "Tema",
        dropOffContact: "0248877665",
        deliveredOn: "2024-03-16",
        amount: "GHS 150.00",
        paymentStatus: "Paid",
        paymentMethod: "Cash",
        deliveryStatus: "Delivered",
    },
    {
        tripId: "INV004",
        orderedBy: "Akosua Agyemang",
        bookedOn: "2024-04-01",
        pickup: "Ho",
        pickupContact: "0245544332",
        dropOff: "Bolgatanga",
        dropOffContact: "0243322114",
        deliveredOn: "2024-04-03",
        amount: "GHS 400.00",
        paymentStatus: "Paid",
        paymentMethod: "Credit Card",
        deliveryStatus: "Delivered",
    },
    {
        tripId: "INV005",
        orderedBy: "Yaw Osei",
        bookedOn: "2024-05-05",
        pickup: "Sunyani",
        pickupContact: "0242233445",
        dropOff: "Tamale",
        dropOffContact: "0245566778",
        deliveredOn: "2024-05-07",
        amount: "GHS 275.00",
        paymentStatus: "Unpaid",
        paymentMethod: "Mobile Money",
        deliveryStatus: "In Transit",
    },
    {
        tripId: "INV006",
        orderedBy: "Esi Badu",
        bookedOn: "2024-06-10",
        pickup: "Sekondi",
        pickupContact: "0241122334",
        dropOff: "Hohoe",
        dropOffContact: "0244433221",
        deliveredOn: "---",
        amount: "GHS 320.00",
        paymentStatus: "Paid",
        paymentMethod: "Credit Card",
        deliveryStatus: "Picked Up",
    },
    {
        tripId: "INV007",
        orderedBy: "Nana Yaa",
        bookedOn: "2024-07-15",
        pickup: "Koforidua",
        pickupContact: "0245566778",
        dropOff: "Sunyani",
        dropOffContact: "0249988776",
        deliveredOn: "---",
        amount: "GHS 210.00",
        paymentStatus: "Paid",
        paymentMethod: "Mobile Money",
        deliveryStatus: "Booked",
    }
];

  
  
  export function RecentTripTable() {
    return (
      <Table>
    
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Trip id</TableHead>
            
            <TableHead>Booked On</TableHead>
            <TableHead>Pickup</TableHead>
            
            <TableHead>Drop off</TableHead>
            
            <TableHead>Delivered On</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead >Payment Status</TableHead>
            
            <TableHead >Delivery Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {trips.map((trip) => (
            <TableRow key={trip.tripId}>
              <TableCell className="font-medium">{trip.tripId}</TableCell>
              
              <TableCell>{trip.bookedOn}</TableCell>
              <TableCell>{trip.pickup}</TableCell>
              
              <TableCell>{trip.dropOff}</TableCell>
              
              <TableCell>{trip.deliveredOn}</TableCell>
              <TableCell>{trip.amount}</TableCell>
              <TableCell className="">
                <div className={`flex item-center justify-center rounded-md w-16 text-white text-[12px] ${trip.paymentStatus === 'Paid' ? 'bg-green-600 ': 'bg-red-500 '}`}>
                    <p>
                        {trip.paymentStatus}
                    </p>
                </div>
                </TableCell>
              
              <TableCell><div className={`flex item-center justify-center rounded-md w-16 text-white text-[12px] ${trip.deliveryStatus === "Delivered"
                ? "  bg-green-500"
                : trip.deliveryStatus === "Picked Up"
                ? "  bg-sky-600"
                : trip.deliveryStatus === "In Transit"
                ? " bg-amber-500 "
                : trip.deliveryStatus === "Booked"
                ? " bg-slate-600 dark:text-slate-50"
                : " bg-red-500"}`}>
                    <p>
                        {trip.deliveryStatus}
                    </p>
                </div></TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }
  
  