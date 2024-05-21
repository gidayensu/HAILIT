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
        deliveredOn: "2024-02-12",
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
        deliveryStatus: "New Order",
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
        deliveryStatus: "New Order",
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
        deliveredOn: "2024-06-12",
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
        deliveredOn: "2024-07-17",
        amount: "GHS 210.00",
        paymentStatus: "Paid",
        paymentMethod: "Mobile Money",
        deliveryStatus: "New Order",
    },
    {
        tripId: "INV008",
        orderedBy: "Yaw Amankwah",
        bookedOn: "2024-08-20",
        pickup: "Bolgatanga",
        pickupContact: "0244455667",
        dropOff: "Cape Coast",
        dropOffContact: "0243344556",
        deliveredOn: "2024-08-22",
        amount: "GHS 380.00",
        paymentStatus: "Unpaid",
        paymentMethod: "Cash",
        deliveryStatus: "Picked Up",
    },
    {
        tripId: "INV009",
        orderedBy: "Akua Anane",
        bookedOn: "2024-09-25",
        pickup: "Tema",
        pickupContact: "0247766554",
        dropOff: "Kumasi",
        dropOffContact: "0241122334",
        deliveredOn: "2024-09-27",
        amount: "GHS 290.00",
        paymentStatus: "Paid",
        paymentMethod: "Credit Card",
        deliveryStatus: "In Transit",
    },
    {
        tripId: "INV010",
        orderedBy: "Kwabena Boateng",
        bookedOn: "2024-10-30",
        pickup: "Takoradi",
        pickupContact: "0249988776",
        dropOff: "Sekondi",
        dropOffContact: "0245544332",
        deliveredOn: "2024-11-01",
        amount: "GHS 195.00",
        paymentStatus: "Unpaid",
        paymentMethod: "Mobile Money",
        deliveryStatus: "Cancelled",
    },
    {
        tripId: "INV011",
        orderedBy: "Adwoa Asare",
        bookedOn: "2024-11-04",
        pickup: "Wa",
        pickupContact: "0244433221",
        dropOff: "Ho",
        dropOffContact: "0246655443",
        deliveredOn: "2024-11-06",
        amount: "GHS 350.00",
        paymentStatus: "Paid",
        paymentMethod: "Credit Card",
        deliveryStatus: "New Order",
    },
    {
        tripId: "INV012",
        orderedBy: "John Doe",
        bookedOn: "2024-12-10",
        pickup: "Accra",
        pickupContact: "0249988776",
        dropOff: "Koforidua",
        dropOffContact: "0245566778",
        deliveredOn: "2024-12-12",
        amount: "GHS 250.00",
        paymentStatus: "Unpaid",
        paymentMethod: "Cash",
        deliveryStatus: "Delivered",
    },
    {
        tripId: "INV013",
        orderedBy: "Jane Smith",
        bookedOn: "2024-01-15",
        pickup: "Tamale",
        pickupContact: "0242233445",
        dropOff: "Bolgatanga",
        dropOffContact: "0248877665",
        deliveredOn: "2024-01-17",
        amount: "GHS 260.00",
        paymentStatus: "Paid",
        paymentMethod: "Mobile Money",
        deliveryStatus: "New Order",
    },
    {
        tripId: "INV014",
        orderedBy: "Peter Parker",
        bookedOn: "2024-02-20",
        pickup: "Takoradi",
        pickupContact: "0244455667",
        dropOff: "Cape Coast",
        dropOffContact: "0249988776",
        deliveredOn: "2024-02-22",
        amount: "GHS 300.00",
        paymentStatus: "Unpaid",
        paymentMethod: "Credit Card",
        deliveryStatus: "In Transit",
    },
    {
        tripId: "INV015",
        orderedBy: "Mary Johnson",
        bookedOn: "2024-03-25",
        pickup: "Tema",
        pickupContact: "0245566778",
        dropOff: "Hohoe",
        dropOffContact: "0246655443",
        deliveredOn: "2024-03-27",
        amount: "GHS 280.00",
        paymentStatus: "Paid",
        paymentMethod: "Cash",
        deliveryStatus: "Delivered",
    },
    {
        tripId: "INV016",
        orderedBy: "Kofi Annan",
        bookedOn: "2024-04-30",
        pickup: "Sunyani",
        pickupContact: "0241122334",
        dropOff: "Sekondi",
        dropOffContact: "0249988776",
        deliveredOn: "2024-05-02",
        amount: "GHS 310.00",
        paymentStatus: "Unpaid",
        paymentMethod: "Mobile Money",
        deliveryStatus: "Cancelled",
    },
    {
        tripId: "INV017",
        orderedBy: "Nana Addo",
        bookedOn: "2024-06-05",
        pickup: "Bolgatanga",
        pickupContact: "0247766554",
        dropOff: "Kumasi",
        dropOffContact: "0244433221",
        deliveredOn: "2024-06-07",
        amount: "GHS 330.00",
        paymentStatus: "Paid",
        paymentMethod: "Credit Card",
        deliveryStatus: "Delivered",
    },
    {
        tripId: "INV018",
        orderedBy: "Maya Angelou",
        bookedOn: "2024-07-10",
        pickup: "Cape Coast",
        pickupContact: "0246655443",
        dropOff: "Wa",
        dropOffContact: "0245544332",
        deliveredOn: "2024-07-12",
        amount: "GHS 370.00",
        paymentStatus: "Unpaid",
        paymentMethod: "Cash",
        deliveryStatus: "Delivered",
    },
    {
        tripId: "INV019",
        orderedBy: "Nelson Mandela",
        bookedOn: "2024-08-15",
        pickup: "Tamale",
        pickupContact: "0248877665",
        dropOff: "Takoradi",
        dropOffContact: "0246655443",
        deliveredOn: "2024-08-17",
        amount: "GHS 290.00",
        paymentStatus: "Paid",
        paymentMethod: "Mobile Money",
        deliveryStatus: "In Transit",
    },
    {
        tripId: "INV020",
        orderedBy: "Mother Teresa",
        bookedOn: "2024-09-20",
        pickup: "Tema",
        pickupContact: "0245566778",
        dropOff: "Sunyani",
        dropOffContact: "0249988776",
        deliveredOn: "2024-09-22",
        amount: "GHS 250.00",
        paymentStatus: "Unpaid",
        paymentMethod: "Credit Card",
        deliveryStatus: "Cancelled",
    }
];

  
  
  export function AllTripsTable() {
    return (
      <Table>
    
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Trip id</TableHead>
            <TableHead>Ordered by</TableHead>
            <TableHead>Booked On</TableHead>
            <TableHead>Pickup</TableHead>
            <TableHead>Pickup Contact</TableHead>
            <TableHead>Drop off</TableHead>
            <TableHead>Drop off Contact</TableHead>
            <TableHead>Delivered On</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead >Payment Status</TableHead>
            <TableHead >Payment Method</TableHead>
            <TableHead >Delivery Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {trips.map((trip) => (
            <TableRow key={trip.tripId}>
              <TableCell className="font-medium">{trip.tripId}</TableCell>
              <TableCell>{trip.orderedBy}</TableCell>
              <TableCell>{trip.bookedOn}</TableCell>
              <TableCell>{trip.pickup}</TableCell>
              <TableCell >{trip.pickupContact}</TableCell>
              <TableCell>{trip.dropOff}</TableCell>
              <TableCell>{trip.dropOffContact}</TableCell>
              <TableCell>{trip.deliveredOn}</TableCell>
              <TableCell>{trip.amount}</TableCell>
              <TableCell className="">
                <div className={`flex item-center justify-center rounded-md w-16 text-white text-[12px] ${trip.paymentStatus === 'Paid' ? 'bg-green-600 ': 'bg-red-500 '}`}>
                    <p>
                        {trip.paymentStatus}
                    </p>
                </div>
                </TableCell>
              <TableCell>{trip.paymentMethod}</TableCell>
              <TableCell><div className={`flex item-center justify-center rounded-md w-16 text-white text-[12px] ${trip.deliveryStatus === "Delivered"
                ? "  bg-green-500"
                : trip.deliveryStatus === "Picked Up"
                ? "  bg-sky-600"
                : trip.deliveryStatus === "In Transit"
                ? " bg-amber-500 "
                : trip.deliveryStatus === "New Order"
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
  
  