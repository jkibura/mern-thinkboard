// import React from 'react'
// import { Link } from 'react-router'
// import { PlusIcon } from 'lucide-react'

// const Navbar = () => {
//   return (
//     <header className='bg-base-300 border-b border-base-content/10'>
//         <div className='mx-auto max-w-6-xl p-4'>
//             <div className="flex items-center justify-between"></div>
//             <h1>ThinkBoard</h1>
//             <div>
//                 <Link to={'/create'}>
//                 <PlusIcon/>
//                 <span>New Note</span>
//                 </Link>
//             </div>

//         </div>
//     </header>
//   )
// }

// export default Navbar

import React from "react";
import { Link } from "react-router";
import { PlusIcon } from "lucide-react";

const Navbar = () => {
  return (
    <header className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo / Brand */}
        <Link
          to="/"
          className="text-xl font-semibold text-gray-800 dark:text-gray-100 tracking-tight"
        >
          ThinkBoard
        </Link>

        {/* Create Note Button */}
        <Link
          to="/create"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-xl transition-colors"
        >
          <PlusIcon size={18} />
          <span>New Note</span>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
