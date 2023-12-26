import React from 'react'
import {Button} from '../components/Button'
import {useNavigate} from 'react-router-dom'

export function Catalog() {
    const navigate = useNavigate()
    
  return (
    <div className="my-10 flex justify-center movil:overflow-x-scroll movil:justify-normal">
          <Button onClick={()=>navigate(`/category/cardiologist`)} key="cardiologist">Cardiologist</Button>
          <Button onClick={()=>navigate(`/category/nephrologist`)} key="nephrologist">Nephrologist</Button>
          <Button onClick={()=>navigate(`/category/immunologist`)} key="immunologist">Immunologist</Button>
          <Button onClick={()=>navigate(`/category/gastroenterologist`)} key="gastroente">Gastroenterologist</Button>
          <Button onClick={()=>navigate(`/category/infectious-disease`)} key="infectious disease">Infectious disease</Button>
          <Button onClick={()=>navigate(`/category/endocrinologist`)} key="endocrino">Endocrinologist</Button>
          <Button onClick={()=>navigate(`/category/ophthalmologist`)} key="ophthal">Ophthalmologist</Button>
      </div>
  )
}

export default Catalog