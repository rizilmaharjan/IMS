import { useEffect, useState } from "react"
import { useAxios } from "../../hooks/post/usePost"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
interface IProps{
    openmodal:(value: React.SetStateAction<boolean>) => void
}
const Modal:React.FC<IProps> = ({openmodal}) => {
    const {datas, fetchError, fetchData} = useAxios()
    const [email, setEmail] = useState<string>("")
    const userEmail = {
        email: email
    }
    const handleRequestLink = ()=>{
        fetchData("http://localhost:8000/user/api/forget-password", userEmail)

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
                setEmail("")
        }

        if(fetchError?.status === 404){
            toast.error(fetchError.message,{
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",

            })
        }

    },[datas, fetchError])
  return (
    <>
        <div className="fixed w-full top-0 left-0 h-screen modal-background flex items-center justify-center">
            <div className="w-[500px] h-[320px] bg-white px-3 rounded-lg">
                <h1 className="text-3xl mt-3 font-bold">Forget Your Password</h1>
                <p className="mt-3 text-gray-600">Please enter the email address you'd like your password reset information sent to</p>

                <div className="mt-5">
                    <label className="text-gray-500 font-semibold" htmlFor="forgetPassword">Enter email address</label><br />
                    <input onChange={(e)=>setEmail(e.target.value)} name="email" value={email} className="border mt-1 w-11/12 border-black px-3 text-gray-500 font-semibold outline-blue-700 py-1.5" type="text"/>
                </div>

                {/* request reset link */}
                <button onClick={handleRequestLink} className="bg-blue-950 text-white mt-3 w-11/12 py-2 rounded-lg">Request reset link</button>

                {/* back to login */}
                 <p onClick={()=>openmodal(false)} className="text-blue-600 font-bold text-center mt-4 cursor-pointer">Back To Login</p>
                

            </div>
            <ToastContainer />
        </div>
      
    </>
  )
}

export default Modal
