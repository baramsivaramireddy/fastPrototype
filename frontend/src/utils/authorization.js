"use client"
import { useToken } from "@/hooks/useAuth"
import { PresentUserRole } from "./tokenHelpers"
import Link from "next/link"



const AuthorizationWrapper = ({ allowedRoles,children }) => {


    let token = useToken()


    if (token == null) {

        return (
            <>

                <div className="flex justify-center items-center h-full ">

                    <div className=" bg-white p-5 rounded  ">
                        <p className="capitalize">
                            you need to  <Link className="text-blue-500" href={`/login`}> Login</Link>

                        </p>
                    </div>
                </div>
            </>
        )
    }
    const UserRole = PresentUserRole(token)

    if (allowedRoles.includes(UserRole)) {
        
        return (
            <>
                {children}
            </>
        )
    }

    return (
        <p className="text-red-500">
            you do not have enough permissions
        </p>

    )
}
export default AuthorizationWrapper 