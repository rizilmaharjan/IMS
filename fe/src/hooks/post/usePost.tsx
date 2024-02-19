import axios from 'axios'
import { useState } from 'react'
import Cookies from "js-cookie";
import { Product } from '../../context/context.types';

import { useCustomContext } from '../../context/Context';
interface IPostData{
    message: string;
    status: number;
    token?: string;
    data: Product
 }
 interface IProductData{
    name:string;
    amount:string;
    stock:string;
    image:string
}

 interface ILoginData{
    email?: string;
    password?: string;
    confirmpassword?:string;
  }

  
interface IProductOrderData{
    name:string;
    image:string;
    noOfProducts: number;
  }
  

export const useAxios = () => {
 const [datas,setData] = useState<IPostData | null>(null)
 const [fetchError, setFetchError] = useState<IPostData | null>(null)
 const [isLoading, setIsLoading] = useState<boolean>(false)
 const {setUserRole} = useCustomContext()


    const fetchData = async(url:string, userData:ILoginData | IProductData | IProductOrderData)=>{
        console.log("inside fetch data")
        setIsLoading(true)
        const headers = {
            Authorization: `Bearer ${Cookies.get("authToken")} `
        }
        const config = {
            headers: headers
        }
        try {
            const res = await axios.post(url, userData)
                console.log("fetching datas")
                setData(res.data)
                console.log(res.data)
                if(res.data.data && res.data.data.role){
                    setUserRole(res)
                    console.log("setting up")

                }
                setFetchError(null)
            
        } catch (error:any) {
            console.log(error)
                setFetchError(error.response?.data)
                setData(null)
            
        } finally{
            setIsLoading(false)
            
        }

    }


 return {datas, fetchError, isLoading, fetchData, setFetchError, setData}
}
