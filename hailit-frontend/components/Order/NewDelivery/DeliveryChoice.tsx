
import Container from "../../ui/container"

interface ChoicesProps {
    handleDeliveryOption: (deliveryOption:string)=>void,
    deliveryOption: string,
    elementOption: string,
    MainIcon: any,
    CheckIcon: any,
     
    children: React.ReactNode
}
export  const DeliveryChoices:React.FC<ChoicesProps> = ({handleDeliveryOption, deliveryOption, MainIcon, CheckIcon, elementOption, children})=> {
    return (
        <>
        <div className="w-full" onClick={()=>handleDeliveryOption(elementOption)}>

<Container className={`flex flex-col items-center justify-center w-full h-40 md:h-44  rounded-lg p-3 ${deliveryOption === elementOption || !deliveryOption  ? '': 'text-slate-300'} cursor-pointer`}>
  <MainIcon className={`text-3xl mb-2 ${deliveryOption === elementOption || !deliveryOption  ? 'text-blue-600': 'text-slate-300'}`}/>
  <p className="font-bold text-[12px] md:text-sm text-center">{elementOption.toUpperCase()}</p>
  {children}
  <span
        className={`flex items-center justify-center mt-1  border border-rose-500 md:h-8 md:w-8 h-6 w-6 rounded-full    ${
          deliveryOption === elementOption
            ? "bg-rose-500 text-white"
            : "hidden"
        }`}
      >
        <CheckIcon className={`${deliveryOption !== elementOption && 'hidden'}`} />
      </span>
</Container>
  </div>
  </>
    )
}