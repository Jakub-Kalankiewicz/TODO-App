"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useMemo } from "react";
import { FaRegUser } from "react-icons/fa";
import { MdAddCircle } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";

const NavBar = () => {
  const session = useSession();
  const userName = useMemo(
    () => session.data?.user?.name,
    [session.data?.user?.name]
  );
  return (
    <nav className="w-full bg-gradient-to-t from-green-800 to-green-600 h-24 max-w-screen">
      <div className="flex justify-evenly items-center h-full">
        <Link href="/home">
          <h1 className="text-gray-900 text-md md:text-3xl font-bold text-center tracking-wide uppercas lg:ml-2 flex justify-center items-center gap-2">
            <FaRegUser size="2rem" className="md:block hidden" />
            {userName}
          </h1>
        </Link>
        <Link href="/home/add" className="flex justify-center items-center">
          <MdAddCircle size="2rem" className="md:block hidden" />
          <button className="font-semibold italic text-gray-900 text-md md:text-3xl ml-2">
            Add Todo
          </button>
        </Link>
        <button
          className="font-semibold italic text-gray-900 text-md md:text-3xl ml-2 flex justify-center items-center gap-2"
          onClick={() => signOut()}
        >
          <IoMdLogOut size="2rem" className="md:block hidden" />
          Logout
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
