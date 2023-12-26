import React from 'react'

import {NavLink} from 'react-router-dom'

export function LinkSkill({ to, children }) {
    return (
      <NavLink
        className=" text-sm font-bold text-center bg-greenDark m-2 p-1 rounded-xl hover:bg-grayWhite hover:cursor-pointer"
        to={`/${to}`}
      >
        {children}
      </NavLink>
    );
  }