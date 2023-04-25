import React from "react";

const Input_Label = ({
  placeholder,
  name,
  value,
  value_label,
  inhabilitado,
  type_,
  changue_
}) => {
  return (
    <div className="grid grid-cols-12 gap-2 mt-2 items-center">
      <label className="p-2 md:w-12/12 text-left col-span-4 hidden md:block" htmlFor={name}>
        {value_label}
      </label>
      {!inhabilitado ? (
        <input
          className="col-span-12 md:col-span-8 p-2 w-[100%] rounded-lg border hover:ring-1 hover:ring-blue-500 hover:ring-inset ring-1 ring-blue-300"
          type={type_ ? type_ : "text"}
          placeholder={placeholder}
          id={name}
          name={name}
          defaultValue={value}
          required
          onChange={changue_}
          autoComplete="off"
        />
      ) : (
        <input
          className="col-span-12 md:col-span-8 p-2 w-[100%] rounded-lg border hover:ring-1 hover:ring-blue-500 hover:ring-inset ring-1 ring-blue-300"
          type={type_ ? type_ : "text"}
          disabled
          required
          placeholder={placeholder}
          id={name}
          name={name}
          defaultValue={value}
          onChange={changue_}
          autoComplete="off"
        />
      )}
    </div>
  );
};

export default Input_Label;
