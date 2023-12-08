import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom'
import {get} from 'idb-keyval';

import AdminSidebar from '../admin/AdminSidebar'
import useGeneralStore from '../../stores/generalStore/useGeneralStore'
import { UserType } from '../../stores/generalStore/types';
import WarningModal from '../WarningModal';
const AdminLayout = () => {

  const {setUser} = useGeneralStore()
  const user = useGeneralStore(store => store.user)
  const navigate = useNavigate()

  useEffect(()=>{
    get<UserType>("user")
      .then(userStorage => {
        if(userStorage){
          if(userStorage.userType === "user" || !userStorage.userType || userStorage.userType.length === 0){
            navigate("/")
          }
          setUser(user)
        }else if(user.userType === "user" || !user.userType || user.userType.length === 0){
          navigate("/")
        }
      }
    )
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className='flex'>
        <AdminSidebar/>
        <div className='px-6 bg-gray w-full'>
          <div className='mt-32'>
            <WarningModal />
            <Outlet/>
          </div>
        </div>
    </div>
  )
}

export default AdminLayout