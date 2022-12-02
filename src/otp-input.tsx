import React, { ChangeEvent, useEffect, useRef, KeyboardEvent } from "react";
import { useState } from "react"

interface Props  {
    length : number
}
let otpCurrentIndex : number = 0 
const OTPInput = ({length}:Props) => {
    const [otp, setOtp] = useState(new Array(length).fill(''))
    const [activeOTPBox,setActiveOTPBox] = useState<number>(0)
    const inputRef = useRef<HTMLInputElement>(null)
    const onChangeHandler =({preventDefault,target:{value}} : ChangeEvent<HTMLInputElement>) =>{
        if(!isNaN(Number(value))){
        const newOTP:string[] = [...otp]
        newOTP[otpCurrentIndex] = value.substring(value.length-1) 
        if(!value) setActiveOTPBox(otpCurrentIndex-1 )
        else setActiveOTPBox(otpCurrentIndex+1)
        setOtp(newOTP)
        }
    }

    const onKeyDownHandler = ({preventDefault,key,currentTarget:{value}}:KeyboardEvent<HTMLInputElement> , index:number) => {
        if(['e', 'E', '+', '-'].includes(key)) preventDefault()
        else{
            otpCurrentIndex = index
            if(key==="Backspace"&&value=="" ) setActiveOTPBox(otpCurrentIndex-1)
        }
       
    }

    useEffect(()=>{
        inputRef.current?.focus()      
    },[activeOTPBox])

    return(
        <div className="h-screen flex justify-center items-center space-x-2">
          {otp.map((_, index) => {
            return (
              <React.Fragment key={index}>
                <input
                  value={otp[index]}
                  onKeyDown={(e)=>onKeyDownHandler(e,index)}
                  ref={index === activeOTPBox ? inputRef :null }
                  onChange={onChangeHandler}
                  type="text"
                  className="w-12 h-12 border-2 rounded bg-transparent outline-none text-center font-semibold text-xl spin-button-none border-gray-400 focus:border-orange-400 focus:text-orange-400 text-gray-400 transition"
                />

              </React.Fragment>
            );
          })}
        </div>
      );
}


export default OTPInput 