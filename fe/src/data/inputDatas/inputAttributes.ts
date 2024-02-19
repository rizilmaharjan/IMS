import { IInput } from "./inputDatas.types"
export const inputDatas:IInput[] = [
    {
        type:"text",
        msg:"This field is required",
        val:"username",
        regex:/^[a-zA-Z0-9_]{3,20}$/
    },
    {
        type:"text",
        msg:"This field is required",
        val:"name",
        
    },
    {
        type:"email",
        msg:"This field is required",
        val:"email",
        regex:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    },
    {
        type:"password",
        msg:"This field is required",
        val:"password",
        regex:/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    },
    {
        type:"password",
        msg:"This field is required",
        val:"confirmpassword",
        regex:/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    },
    {
        type:"text",
        msg:"This field is required",
        val:"role",
    },
    {
        type:"text",
        msg:"This field is required",
        val:"profile",
    },
]