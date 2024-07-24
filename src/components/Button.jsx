import React from 'react'

function Button({children ,type="button" , bgColor= "bg-blue-500" , textColor="text-white" , hoverBgColor="hover:bg-blue-700" , hoverTextColor="hover:text-white" , ...props}) {
  return (
  <button className={`inline-block px-6 py-2 duration-200 ${bgColor} ${textColor} ${hoverBgColor} ${hoverTextColor} rounded-full`} type={type}    {...props} >
    {children}
  </button>
  )
}

export default Button
