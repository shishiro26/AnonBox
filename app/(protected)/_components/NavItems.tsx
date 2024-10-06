import React from "react";
import Link from "next/link";
import { auth } from "@/auth";

const NavItems = async () => {
  const session = await auth();
  return (
    <ul className="space-y-2 font-medium">
      <li>
        <Link
          href="/"
          className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100 "
        >
          <span className="flex-1 ms-3 whitespace-nowrap">Home</span>
        </Link>
      </li>
      <li>
        <Link
          href={`/trending/`}
          className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100 "
        >
          <span className="flex-1 ms-3 whitespace-nowrap">Trending</span>
        </Link>
      </li>

      <li>
        <Link
          href="#"
          className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100 "
        >
          <span className="flex-1 ms-3 whitespace-nowrap">Profile</span>
        </Link>
      </li>
    </ul>
  );
};

export default NavItems;
