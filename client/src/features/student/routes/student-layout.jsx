import { Outlet } from "react-router-dom";
import { requireStudent } from "../../auth/services/auth.service";


export async function studentLayoutLoader(){
    await requireStudent();
}

export default function StudentLayout(){
    return <Outlet/>
}