import React from 'react'

export function Button({ onClick, children }) {
    return (
      <button
        className=" bg-greenDark p-2 font-bold rounded-xl m-2 hover:bg-grayWhite hover:cursor-pointer"
        onClick={onClick}
      >
        {children}
      </button>
    );
  }