import OTPInput from "./otp-input";


function App() {
  return (
    <div className="h-full w-full">
   <div className='w-full h-full bg-slate-900'>
    <OTPInput length={6}/>
   </div>
    </div>
  );
}

export default App;
