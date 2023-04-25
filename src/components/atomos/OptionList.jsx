import React from 'react'

const OptionList = ({value_option, name, lista, value_label}) => {


  return (

    <div className='grid grid-cols-12 gap-2 mt-2'>
        <label className='p-2 md:w-12/12 text-left col-span-4 hidden md:block'>{value_label}</label>
        <select name={name} className='col-span-12 md:col-span-8 p-2 w-[100%] rounded-lg border hover:ring-1 hover:ring-blue-500 hover:ring-inset ring-1 ring-blue-300'>
            <option>{value_option}</option>
            {lista.map((item, index) => ( 
                <option value={item} key={index}  >{item}</option>
            ))}
        </select>
    </div>
  )
}

export default OptionList