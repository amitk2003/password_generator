import { useState, useCallback, useRef, useEffect } from 'react'
import { IoCopy } from "react-icons/io5";
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passref = useRef(null);

  // Copy password function
  const copyPasswordToClipboard = useCallback(() => {
    passref.current?.select();
    passref.current?.setSelectionRange(0, 30);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  // Password generator
  const passwordGen = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*(){}[]+=-_`~?<>/,";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numAllowed, charAllowed, setPassword]);

  useEffect(() => { passwordGen() }, [length, numAllowed, charAllowed, passwordGen]);

  return (
    <>
      <h1 className='text-3xl sm:text-4xl text-center text-white my-6 font-bold'>Password Generator</h1>
      
      <div className='w-full max-w-md mx-auto bg-gray-800 rounded-2xl p-6 shadow-xl'>
        
        {/* Password display with Copy button */}
        <div className='flex flex-col sm:flex-row items-stretch bg-gray-700 rounded-lg overflow-hidden shadow-lg mb-4'>
          <input
            type="text"
            value={password}
            placeholder='Generated Password'
            readOnly
            ref={passref}
            className='flex-1 px-4 py-2 bg-gray-800 text-white placeholder-gray-400 outline-none text-sm sm:text-base'
          />
          <button
            onClick={copyPasswordToClipboard}
            className='flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium transition sm:rounded-r-lg rounded-b-lg sm:rounded-b-none'
          >
            Copy <IoCopy />
          </button>
        </div>

        {/* Controls (responsive layout) */}
        <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center mt-4 gap-4'>
          
          {/* Length slider */}
          <div className='flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-1/2'>
            <input
              type="range"
              min={8}
              max={100}
              value={length}
              className='cursor-pointer w-full accent-blue-600'
              onChange={(e) => setLength(e.target.value)}
            />
            <label className='font-semibold text-white text-sm sm:text-base'>Length: {length}</label>
          </div>

          {/* Checkboxes side by side */}
          <div className='flex flex-wrap items-center gap-4'>
            <div className='flex items-center gap-x-1'>
              <input
                type="checkbox"
                checked={numAllowed}
                id="numberInput"
                className="w-4 h-4 accent-green-500"
                onChange={() => setNumAllowed(prev => !prev)}
              />
              <label htmlFor="numberInput" className="text-white text-sm sm:text-base">Numbers</label>
            </div>

            <div className='flex items-center gap-x-1'>
              <input
                type="checkbox"
                checked={charAllowed}
                id="charInput"
                className="w-4 h-4 accent-pink-500"
                onChange={() => setCharAllowed(prev => !prev)}
              />
              <label htmlFor="charInput" className="text-white text-sm sm:text-base">Characters</label>
            </div>
          </div>
        </div>

        {/* Regenerate Button */}
        <div className="mt-6 text-center">
          <button
            onClick={passwordGen}
            className="w-full sm:w-auto px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-md transition"
          >
            🔄 Regenerate Password
          </button>
        </div>
      </div>
    </>
  );
}

export default App
