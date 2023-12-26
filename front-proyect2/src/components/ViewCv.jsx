import React from 'react'

export function ViewCv({view}) {
    
  return (
        <embed src={view.secure_url} width="50%" height="90%" className=' m-auto z-20 my-10 movil:my-0 movil:m-0'/>
  )
}

