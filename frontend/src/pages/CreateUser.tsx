import {useState, ChangeEvent, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';

import {ClockLoader} from "react-spinners";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { toast } from 'react-toastify';
import { Checkbox } from '@mui/material';

import { regex, regexPhone } from '../utils';
import { Address, useCreateUserMutation } from '../__generated__/types';

const CreateUser = () => {
    const [createUser, {data, loading}] = useCreateUserMutation()
    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [phoneNumber, setPhoneNumber] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const [confirmPassword, setConfirmPassword] = useState<string>("")
    const [showAddressForm, setShowAddressForm] = useState<boolean>(false)
    const [showPreferencesForm, setShowPreferencesForm] = useState<boolean>(false)
    const [address, setAddress] = useState<Address>({
        block: "",
        street: "",
        houseNumber: "",
    })
    
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [showConfirmationPassword, setShowConfirmationPassword] = useState<boolean>(false)
    const navigate = useNavigate()

    const switchPassword = ()=>{
        setShowPassword(!showPassword)
    }
    const switchConfirmationPassword = ()=>{
        setShowConfirmationPassword(!showConfirmationPassword)
    }

    const onChangeName = (value: string)=>{
        setName(value)
    }
    const onChangeEmail = (value: string)=>{
        setEmail(value)
    }
    const onChangePhone = (value: string)=>{
        setPhoneNumber(value)
    }
    const onChangePassword = (value: string)=>{
        setPassword(value)
    }
    const onChangeConfirmationPassword = (value: string)=>{
        setConfirmPassword(value)
    }

    const handleChangeAddressForm = (e: ChangeEvent<HTMLInputElement>)=>{
        setShowAddressForm(e.target.checked)
    }
    const handleChangePreferencesForm = (e: ChangeEvent<HTMLInputElement>)=>{
        setShowPreferencesForm(e.target.checked)
    }

    const handleSubmit = ()=>{
        if(Object.values([name, email, password, confirmPassword]).includes("")){
            toast.error("Todos los campos son obligatorios")
            return
        }
        if(!regex.test(email)){
            toast.error("El correo cuenta con un formato incorrecto, intenta colocar un correo como: correo@correo.com")
            return
        }
        if(!regexPhone.test(phoneNumber)){
            toast.error("Coloca el teléfono en el formato indicado: 123-456-0000")
        }
        createUser({
            variables: {
                userInput: {
                    name,
                    email,
                    password,
                    phoneNumber,
                    address,
                }
            }
        })
    }

    const goToLogin = ()=>{
        navigate("/login")
    }

    useEffect(()=>{
        if(!loading){
            if(data?.createUser?.status !== 200){
                toast.error(data?.createUser?.message)
            }else{
                toast.success("Creamos tu cuenta con éxito. Ahora podrás participar en nuestro programa de lealtad y obtener recompensas exclusivas")
                setTimeout(() => {
                    navigate("/login")
                }, 3000);
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[data, loading])

  return (
    <div className='min-h-screen bg-gradient-to-tl from-yellow-main from-50% to-50% to-light-gray'>
      <div className='absolute top-[5%] right-[40%] bg-white p-10 rounded shadow-2xl'>
        <div className='w-full p-2 flex items-center justify-center'>
          <ClockLoader 
              loading={loading}
              color="#E4A400" 
          />
        </div>
        <div 
            className='absolute top-5 left-5 cursor-pointer flex items-center gap-2' 
            onClick={goToLogin}
        >
            <ArrowBackIcon 
                sx={{
                    color: "#E4A400"
                }}
            />
            <p className='font-extraligh text-lg'>Volver</p>
        </div>
        <div className='flex flex-col items-center gap-1'>
          <img 
              src="logo.png" 
              alt="Logo" 
              className='h-20 w-20'
          />
          <h1 className='text-mobile-3xl md:text-3xl font-medium cursor-pointer'>
            <Link to={"/"}>Casa Della Pizza</Link>
          </h1>
          <p className='text-mobile-xl md:text-xl'>Bienvenido.</p>
          <p className='text-mobile-2xl md:text-2xl'>Crea una cuenta y</p>
          <span className='text-mobile-2xl md:text-2xl font-bold text-yellow-dark'>recibe de recompensas exclusivas</span>
        </div>
        <form action="" method="POST" className='mt-5 w-full'>
            <div className='flex '>
                <div>
                    <div className='flex flex-col gap-2 mb-2'>
                        <label className='font-extraligh text-mobile-lg md:text-lg' htmlFor="name">Nombre:</label>
                        <input 
                        value={name} 
                        onChange={((e: ChangeEvent<HTMLInputElement>) => onChangeName(e.target.value))}
                        className='p-2 border border-black rounded border-opacity-40' 
                        type="text" 
                        id='name' 
                        placeholder='Ej: Juan García'
                        />
                    </div>
                    <div className='flex flex-col gap-2 mb-2'>
                        <label className='font-extraligh text-mobile-lg md:text-lg' htmlFor="email">Correo Electrónico:</label>
                        <input 
                        value={email} 
                        onChange={((e: ChangeEvent<HTMLInputElement>) => onChangeEmail(e.target.value))}
                        className='p-2 border border-black rounded border-opacity-40' 
                        type="email" 
                        id='email' 
                        placeholder='Ej: correo@gmail.com'
                        />
                    </div>
                    <div className='flex flex-col gap-2 mb-2'>
                        <label className='font-extraligh text-mobile-lg md:text-lg' htmlFor="phoneNumber">Número Telefónico:</label>
                        <input 
                        value={phoneNumber} 
                        onChange={((e: ChangeEvent<HTMLInputElement>) => onChangePhone(e.target.value))}
                        className='p-2 border border-black rounded border-opacity-40' 
                        type="email" 
                        id='phoneNumber' 
                        placeholder='Ej: XXX-XXX-XXXX'
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label className='font-extraligh text-mobile-lg md:text-lg' htmlFor="password">Contraseña:</label>
                        <div className="flex gap-2 items-center">
                        <input 
                            value={password} 
                            onChange={((e: ChangeEvent<HTMLInputElement>) => onChangePassword(e.target.value))}
                            className='p-2 border w-full border-black rounded border-opacity-40 ' 
                            type={showPassword ? "text" : "password"} 
                            id='password' 
                            placeholder='Asegúrate de utilizar mayúsculas, minusculas, números y símbolos (*, _, ., !)'
                        />
                        <RemoveRedEyeIcon 
                            onClick={switchPassword}
                            sx={{
                            color: '#E4A400',
                            cursor: "pointer"
                            }}
                        />
                        </div>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label className='font-extraligh text-mobile-lg md:text-lg' htmlFor="confirmPassword">Confirmar Contraseña:</label>
                        <div className="flex gap-2 items-center">
                        <input 
                            value={confirmPassword} 
                            onChange={((e: ChangeEvent<HTMLInputElement>) => onChangeConfirmationPassword(e.target.value))}
                            className='p-2 border w-full border-black rounded border-opacity-40 ' 
                            type={showConfirmationPassword ? "text" : "password"} 
                            id='confirmPassword' 
                            placeholder='Asegúrate de utilizar mayúsculas, minusculas, números y símbolos (*, _, ., !)'
                        />
                        <RemoveRedEyeIcon 
                            onClick={switchConfirmationPassword}
                            sx={{
                            color: '#E4A400',
                            cursor: "pointer"
                            }}
                        />
                        </div>
                    </div>
                    <div className='flex items-center justify-between'>
                        <div className="flex items-center gap-2">
                            <Checkbox 
                                checked={showAddressForm}
                                name="addressForm"
                                onChange={handleChangeAddressForm}
                                value="addressForm"
                                id="addressForm"
                                inputProps={{
                                    'aria-label': 'addressForm',
                                }}
                            />
                            <label htmlFor="addressForm">Registrar Dirección</label>
                        </div>
                        <div className="flex items-center gap-2">
                            <Checkbox 
                                checked={showPreferencesForm}
                                name="preferencesForm"
                                onChange={handleChangePreferencesForm}
                                value="preferencesForm"
                                id="preferencesForm"
                                inputProps={{
                                    'aria-label': 'preferencesForm',
                                }}
                            />
                            <label htmlFor="preferencesForm">Registrar Preferencias</label>
                        </div>
                    </div>
                </div>
                <div>
                    {showAddressForm && (
                        <div>
                            <p>mostrar 3 inputs para llenar la dirección del user</p>
                        </div>
                    )}   
                    {showPreferencesForm && (
                        <div>
                            <p>mostrar form de preferencias</p>
                        </div>
                    )}
                </div>
            </div>
            <div className='w-full text-center mt-4'>
                <input 
                    onClick={()=>handleSubmit()}
                    type="button" 
                    value="Crear Usuario"
                    className='w-1/2 bg-yellow-main hover:bg-yellow-dark py-2 transition-all rounded text-center text-md font-bold cursor-pointer'
                />
            </div>
        </form>
      </div>
    </div>
  )
}

export default CreateUser