import React, {ChangeEvent} from 'react'

import { Modal, Select, MenuItem } from '@mui/material'

import MainButton from '../../reusable/MainButton'
const CategoriesForm = () => {
  return (
    <Modal
        open={false}
        onClose={()=>{}}
    >
        <form className='absolute top-[25%] right-[35%] bg-white rounded py-4 px-8'>
            <h3 className='text-center text-xl font-bold mb-5'>Crea un nuevo ingrediente</h3>
            <div className='flex flex-col gap mb-3'>
                <label className='font-light text-lg' htmlFor="name">Nombre: </label>
                <input 
                    className='p-2 border border-black border-opacity-50'
                    
                    type="text" 
                    name="name" 
                    id="name" 
                    placeholder='Ej: Pepperoni, Salami, Tocino, Pollo'
                />
            </div>
            <div className='flex flex-col gap mb-3'>
                <label className='font-light text-lg' htmlFor="pricePerPortion">Precio por porción: </label>
                <input
                    className='p-2 border border-black border-opacity-50'
                    type="number"
                    
                    
                    name="pricePerPortion" 
                    id="pricePerPortion" 
                    placeholder='Ej: 0, 53, 26'
                />
            </div>
            <div className='flex flex-col gap mb-3'>
                <label className='font-light text-lg' htmlFor="zIndex">Orden en el motor de personalización</label>
                <Select
                    className='p-2 border border-black border-opacity-50'
                    name="zIndex"
                    
                    
                >
                    <MenuItem value="one">1</MenuItem>
                    <MenuItem value="two">2</MenuItem>
                    <MenuItem value="three">3</MenuItem>
                </Select>
            </div>
            <div className='flex flex-col gap mb-3'>
                <label className='font-light text-lg' htmlFor="image">Imagen: </label>
                <input 
                    type="file" 
                    accept='image/*' 
                    
                    name="image" 
                    id="image"
                />
            </div>
            <div className='flex flex-row items-center gap-2 mb-3'>
                <label className='font-light text-lg' htmlFor="avaliable">Disponible: </label>
                <input 
                    type="checkbox"
                    name="avaliable"
                    
                    
                />
            </div>
            <div className='w-full text-center'>

                <MainButton 
                    content='Crear Ingrediente'
                    action={()=>{}}
                    classes='text-md w-fit mx-auto'
                />
            </div>
        </form>
    </Modal>
  )
}

export default CategoriesForm