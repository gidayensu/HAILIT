import { TailSpin } from "react-loader-spinner"
export default function Loader ({color} : {color:string}) {
    return (
        <TailSpin
  visible={true}
  height="30"
  width="30"
  color={color}
  ariaLabel="oval-loading"
  wrapperStyle={{}}
  wrapperClass=""
  /> 
    )
}