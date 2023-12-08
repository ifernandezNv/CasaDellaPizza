import {ChangeEvent, FormEvent, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import {toast} from "react-toastify";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import {set} from 'idb-keyval';
import {ClockLoader} from "react-spinners";

import { useAuthUserLazyQuery, UserTypeEnum } from '../__generated__/types';
import { regex } from '../utils';
import useGeneralStore from '../stores/generalStore/useGeneralStore';
const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const {setUser} = useGeneralStore()

  const [authUser, {loading, data}] = useAuthUserLazyQuery()

  const onChangePassword = (value: string)=>{
    setPassword(value)
  }
  const onChangeEmail = (value: string)=>{
    setEmail(value)
  }
  
  const handleSubmit = async (e: FormEvent)=>{
    e.preventDefault()
    if(Object.values([email, password]).includes("")){
      toast.error("Todos los campos son obligatorios");
      return;
    }
    if(!regex.test(email)){
      toast.error("El correo debe de tener el siguiente formato: palabra@palabra.com");
      return;
    }
    authUser({
      variables: { 
        userCredentialsInput: {email, password}
      }
    })

    if(!loading && data?.authUser?.status !== 200){
      toast.error(data?.authUser?.message);
      return;
    }
    if(data?.authUser?.id){
      set("user", {
        id: data?.authUser?.id as string,
        email: data?.authUser?.email as string,
        name: data?.authUser?.name as string,
        userType: data?.authUser?.userType as UserTypeEnum,
      })
      set("sessionToken", data?.authUser?.token)

      toast.success("Validamos tu información correctamente, en breve serás redireccionado al menú principal")
      setUser({
        id: data?.authUser?.id as string,
        email: data?.authUser?.email as string,
        name: data?.authUser?.name as string,
        userType: data?.authUser?.userType as UserTypeEnum,
      })
      setTimeout(() => {
        (data?.authUser?.userType === "admin" ? navigate("/admin") : navigate("/") ) 
      }, 3000);
    }
  }
  const switchPassword = ()=>{
    setShowPassword(!showPassword)
  }


  return (
    <div className='min-h-screen bg-gradient-to-tl from-yellow-main from-50% to-50% to-light-gray'>
      <div className='absolute top-[20%] right-[40%] bg-white p-10 rounded shadow-2xl'>
        <div className='w-full p-2 flex items-center justify-center'>
          <ClockLoader 
              loading={loading}
              color="#E4A400" 
          />
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
          <p className='text-mobile-2xl md:text-2xl'>Ingresa en tu cuenta y</p>
          <span className='text-mobile-2xl md:text-2xl font-bold text-yellow-dark'>mira lo que tenemos para ti</span>
        </div>
        <form action="" method="POST" className='mt-5 w-full'>
          <div className='flex flex-col gap-2 mb-5'>
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
          <div className='flex justify-end my-3'>
           <Link to={"/create"} className='text-extraligh text-md underline'>Crear Cuenta</Link>
          </div>
          <div className='w-full text-center mt-4'>
            <input 
              onClick={handleSubmit}
              type="button" 
              value="Iniciar Sesión"
              className='w-1/2 bg-yellow-main hover:bg-yellow-dark py-2 transition-all rounded text-center text-md font-bold cursor-pointer'
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login