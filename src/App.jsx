import { useState ,useCallback,useRef,useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  // 
  const [length,setLength]=useState(8);
  const [numAllowed,setNumAllowed]=useState(false);
  const [charAllowed,setCharAllowed]=useState(false);
  
  const [password,setPassword]=useState("");
  const passref=useRef(null);
  const copyPasswordToClipboard=useCallback(()=>{
    passref.current?.select()
    
      passref.current?.setSelectionRange(0,30);
  
    window.navigator.clipboard.writeText(password)
  },[password])
  const passwordGen=useCallback(()=>{
  let pass=""
  let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  if (numAllowed) str+="0123456789"
  if(charAllowed) str+="!@#$%^&*(){}[]+=-_`~?<>/,"
  for(let i=1;i<=length;i++){
    let char=Math.floor(Math.random()* str.length +1);
    pass+=str.charAt(char)
  }
  setPassword(pass)
  },[length,numAllowed,charAllowed,setPassword])
  useEffect(()=>{passwordGen()},[length,numAllowed,charAllowed,passwordGen])
  // passwordGen();
  return(
     <>
     <h1 className='text-4xl text-center text-white my-6'>Password Generator</h1>
     <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-4 text-red-500 bg-gray-500'>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input type="text" value={password} placeholder='password' readOnly ref={passref}className='outline-none w-full py-1 px-3' />
        <button className='outline-none bg-blue-800 text-white px-4 py-2 shrink-5 hover:cursor-pointer hover:text-blue-300'onClick={copyPasswordToClipboard}>copy</button>
      </div>
      <div className='flex-text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input type="range" min={8} max={100} value={length} className='cursor-pointer' onChange={(e)=>{
            setLength(e.target.value)
          }} />
          <label >Length:{length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
         <input type="checkbox" defaultChecked={numAllowed} id="numberInput" onChange={()=>{setNumAllowed((prev)=>!prev)}} />
         <label htmlFor="numberInput">Numbers</label>

        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox" defaultChecked={charAllowed} id="charInput" onChange={()=>{
            setCharAllowed((prev)=>!prev)
          }} />
          <label htmlFor="charInput">characters</label>
        </div>
        
      </div>
      </div>
    
        
    </>
  


  );
   
}

export default App
