import React, { useId } from "react";

function Select({ options, className, label, ...props }, ref) {
  const id = useId();
  return (
    <div className="w-full">
      {label && <label className="inline-block mb-1 pl-1" htmlFor={id}></label>} 
      <select
        id={id}
        ref={ref}
        {...props}
        className={`px-3 py-2 rounded-lg ${className} bg-white text-black outline-none focus:bg-gray-50 
      duration-200 border-gray-200 w-full`}
      >
        {options?.map((option)=>(
            <option key={option} value={option}>
            {option}
        </option>))}
      </select>
    </div>
  );
}

export default React.forwardRef(Select);
