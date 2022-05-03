import { logout } from "@/firebase/user";
import Image from "next/image";
import Link from "next/link";

export default function TopNavBar({ user }) {

  return <div class="navbar bg-base-100">
    <div class="flex-1">
      <a class="btn btn-ghost normal-case text-xl">Peace-Parking</a>
    </div>
    <div class="flex-none">
      {!user && <div class="flex items-center">
        <Link href="/login">
          <a class="btn btn-primary">
            Iniciar sesión
          </a>
        </Link>
      </div>
      }
      {user &&
        <div class="dropdown dropdown-end">
          <label tabindex="0" class="btn btn-ghost btn-circle avatar">
            <div class="w-10 rounded-full relative bg-green-700">

              {/*  <Image src={'https://api.lorem.space/image/face?hash=33791'} layout='fill' objectFit="cover" /> */}
            </div>
          </label>
          <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
            <li>
              <Link href='/'>
                <a class="justify-between">
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
            <a class="justify-between">
              Profile
              <span class="badge">New</span>
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