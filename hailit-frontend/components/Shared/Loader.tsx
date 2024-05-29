import { TailSpin, DNA, Blocks, InfinitySpin } from "react-loader-spinner"
export default function Loader ({color} : {color:string}) {
    return (
        <TailSpin
  visible={true}
  height="25"
  width="25"
  color={color}
  ariaLabel="oval-loading"
  wrapperStyle={{}}
  wrapperClass=""
  /> 
    )
}