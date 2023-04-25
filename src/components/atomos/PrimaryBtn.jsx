import React from "react";

const PrimaryBtn = ({ value, id, name, class_, click }) => {
  return (
    <div className="flex w-[100%] justify-end">
      <button onClick={click} className={class_ ? class_ : "text-sm md:text-base w-[100%] md:w-[50%] px-2 py-2 rounded-lg bg-blue-500 hover:rounded-lg hover:bg-blue-600 text-white font-bold my-3"}>
        {value}
      </button>
    </div>
  );
};

export default PrimaryBtn;
