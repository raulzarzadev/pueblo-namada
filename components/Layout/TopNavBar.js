import { logout } from "@/firebase/user";
import Image from "next/image";
import Link from "next/link";

export default function TopNavBar({ user }) {

  return <div className="navbar bg-base-100">
    <div className="flex-1">
      <Link href="/">
        <a className="btn btn-ghost normal-case text-xl">Peace-Parking</a>
      </Link>
    </div>
    <div className="flex-none">
      {!user && <div className="flex items-center">
        <Link href="/login">
          <a className="btn btn-primary">
            Iniciar sesión
          </a>
        </Link>
      </div>
      }
      {user &&
        <div className="dropdown dropdown-end">
          <label tabIndex="0" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full relative bg-green-700">

              {/*  <Image src={'https://api.lorem.space/image/face?hash=33791'} layout='fill' objectFit="cover" /> */}
            </div>
          </label>
          <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
            <li>
              <Link href='/'>
                <a className="justify-between">
                  Home
                </a>
              </Link>
            </li>
            <li>
              <button onClick={() => logout()} className="justify-between" >
                Salir
              </button>
            </li>
            {/* <li>
            <a className="justify-between">
              Profile
              <span className="badge">New</span>
            </a>
          </li>
          <li><a>Settings</a></li>
          <li><a>Logout</a></li> */}
          </ul>
        </div>
      }
    </div>
  </div>
}