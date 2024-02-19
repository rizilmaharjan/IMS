import {useEffect, useState } from "react"
import { useAxios } from "../hooks/post/usePost"
import { useParams } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
const PasswordReset = () => {
    const {id} = useParams();
    const {datas, fetchData, fetchError, setData} = useAxios()
    const [value, setValue] = useState({
        password:"",
        confirmpassword:""

    })

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setValue((prev)=>({
            ...prev,
            [e.target.name] : e.target.value
        }))
    }


    const handleResetPassword = ()=>{
        fetchData(`http://localhost:8000/user/api/resetpassword/${id}`, value)


    }
    useEffect(()=>{
        if(datas?.status === 200){
            toast.success(datas.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
                setValue(prev=>({
                    ...prev,
                    password:"",
                    confirmpassword:""
                }))
                setData(null)
 

        }

    },[datas,fetchError])
  return (
    <>
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white box-shadow rounded-lg w-[500px] h-[350px] py-4 px-3">
                <div className="flex justify-center mb-6">
                    <h1 className="text-4xl font-semibold">User Details</h1>
                </div>
                <div>
                    <label className="font-semibold">New Password</label><br />
                    <input onChange={handlePasswordChange} value={value.password} name="password" className="border border-black mt-1 py-2 w-10/12 rounded-md outline-blue-500 px-3" placeholder="New Password" autoComplete="off" type="password" />
                </div>
                <div className="mt-4">
                    <label className="font-semibold">Confirm Password</label><br />
                    <input onChange={handlePasswordChange} name="confirmpassword" value={value.confirmpassword} className="border border-black  mt-1 py-2 w-10/12 rounded-md outline-blue-500 px-3" type="password" autoComplete="off" placeholder="Confirm New Password" />
                </div>

                <button onClick={handleResetPassword} className="border border-blue-500 bg-blue-500 text-white px-2 py-2 w-40  mt-4 rounded-md">Continue</button>
            </div>
            <ToastContainer />
        </div>
      
    </>
  )
}

export default PasswordReset
