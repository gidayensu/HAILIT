'use client'
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import Container from "@/components/ui/container"
import { Input } from "@/components/ui/input"
import { FaPhone, FaWhatsapp } from "react-icons/fa"
import Loader from "@/components/Shared/Loader"
import { useRouter } from "next/navigation"
export default function TrackOrder () {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const inputRef = useRef<any>(null);
  const router = useRouter();

  
  
  const handleSubmit = ()=> {
    setIsLoading(true);
    const tripId = inputRef.current?.value;
    router.push(`/track/${tripId}`)
  }
    return (
        <>
        <div className="flex w-full max-w-xl items-center space-x-2 justify-center mt-10 ">
        <Input
          type="text"
          placeholder="Trip ID"
          className="w-full border-2 border-slate-400"
          ref={inputRef}
          />
        {!isLoading && 
        
        <Button type="submit" className="w-full" onClick={handleSubmit}>
          Submit
        </Button>
        }
        {isLoading && <Button type="submit" className="w-full" disabled>
          <Loader color="red"/>
        </Button>}
      </div>
      <span className="flex items-start justify-start">

      <h3 className="font-bold  text-lg mt-4 -mb-1">Additional Tracking</h3>
      </span>
      
      <Container className="flex flex-col items-center justify-center rounded-xl h-auto p-4 gap-3 w-full">
      
          <p className="text-center"> Could not find package or cannot reach assigned courier?</p>
          <Button variant={"outline"} className="w-2/3 ">
             <FaPhone className="text-md mr-2"/> Call Management
          </Button>

          <Button className="w-2/3 bg-green-500 text-white">
             <FaWhatsapp className="text-lg mr-2"/> WhatsApp
          </Button>
        
        
      </Container>
      </>
    )
}