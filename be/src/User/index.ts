import { Router } from "express";
import { createUser, forgetPassword, getUserInfo, loginUser, resetpassword, fetchUsers, deleteUser } from "./controller";
import { verifyToken } from "./middlewares";
const router = Router();

const userRoutes = ()=>{
    router.post("/api/register", createUser);
    router.post("/api/login", loginUser)
    router.get("/api/profile", verifyToken,getUserInfo)
    router.get("/api/users",verifyToken, fetchUsers)
    router.post("/api/forget-password", forgetPassword)
    router.post("/api/resetpassword/:id", resetpassword)
    router.delete("/api/users/:id",verifyToken, deleteUser)
    return router;
}

export default userRoutes;