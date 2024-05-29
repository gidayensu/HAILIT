import PackageDestinationChoice from "../Order/NewDelivery/PackageDestinationChoice"
import DeliveryDayChoice from "../Order/NewDelivery/DeliveryDayChoice"
import DeliveryMediumChoice from "../Order/NewDelivery/DeliveryMediumChoice"
export default function SendPackage () {


  
    return (
      <>
        <div className="mt-5 flex flex-col items-center justify-center md:4/6 w-5/6 rounded-2xl gap-3">
          <h2 className="font-bold text-xl text-center mb-2"> SELECT PACKAGE DESTINATION </h2>
          <div className="flex flex-col md:flex-row md:w-4/6 w-full items-center justify-center gap-2 md:items-start">
{/* Delivery City */}
            <PackageDestinationChoice/>
          </div>
        </div>

        {/* Delivery Day */}

        { (
          <>
            <div className="mt-5 flex flex-col items-center justify-center md:4/6 w-5/6 rounded-2xl gap-3">
              <h2 className="font-bold text-xl text-center my-2">SELECT DELIVERY DAY </h2>
              <div className="flex w-full md:flex-row md:w-4/6 items-center justify-center gap-2 md:items-start">

              <DeliveryDayChoice/> 
              </div>
            </div>
          </>
        )}

        {/* Delivery Medium */}
        { (
          <>
            <div className="mt-5 flex flex-col items-center justify-center md:4/6 w-5/6 rounded-2xl gap-3">
              <h2 className="font-bold text-xl text-center my-2">
                
                SELECT DELIVERY MODE
              </h2>
              <div className="flex w-full md:flex-row md:w-4/6 items-center justify-center gap-2 md:items-start">
              <DeliveryMediumChoice/>  
              </div>
            </div>
          </>
        )}
      </>
    );
}