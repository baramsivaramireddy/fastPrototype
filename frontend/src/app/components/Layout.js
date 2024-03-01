"use client";

import useAuth, { useToken } from "@/hooks/useAuth";
import getRoleFromToken from "@/utils/getRole";
import Link from "next/link";
import { useRouter } from "next/navigation";
const Layout = ({ children }) => {
  return (
    <>
      <div className="h-1/6 shadow-sm border-b-2 px-3">
        <Header />
      </div>
      <div className="h-5/6">{children}</div>
    </>
  );
};

export default Layout;
const Header = () => {
  return (
    <div className="flex justify-between items-center px-8 py-4 bg-white text-black">
      <div>
        {/* title */}
        <Title />
      </div>
      <div>
        {/* secondary nav */}
        <SecondaryNav />
      </div>
      <div className="flex gap-5">
        {/* user nav */}
        <UserNav />
      </div>
    </div>
  );
};

const Title = () => {
  return <p className="text-2xl font-bold">system name</p>;
};

const SecondaryNav = () => {
  const token = useToken();
  let presentUser = getRoleFromToken(token);

  if (presentUser == "user") {
    return (
      <div className="flex gap-5 ">

        <Link href="/" className="underline text-blue-500">
          Home
        </Link>
      </div>
    );
  } else {
    return (
      <div className="flex gap-5 ">
        <Link href="/" className="underline text-blue-500">
          Home
        </Link>
      </div>
    );
  }
};
const UserNav = () => {
  const token = useToken();
  const { logout } = useAuth();
   let router = useRouter()

  if (!token) {
    return (
      <div className="flex space-x-4">
        <button className="text-black bg-white border border-black hover:bg-gray-300 hover:text-black px-3 py-1 rounded">
          <Link href="/login">Login</Link>
        </button>

        <button className="text-black bg-white border border-black hover:bg-gray-300 hover:text-black px-3 py-1 rounded">
          <Link href="/signup">Signup</Link>
        </button>
      </div>
    );
  }




    return (
      <div className="flex items-center gap-2">
        
        <button
          onClick={() => {
            logout();
            router.push('/')
            
          }}
          className="text-black bg-white border border-black hover:bg-gray-300 hover:text-black px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    );
  

};