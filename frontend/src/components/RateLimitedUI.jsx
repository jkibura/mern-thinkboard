// import React from 'react'

// const RateLimitedUI = () => {
//   return (
//     <div>RateLimitedUI</div>
//   )
// }

// export default RateLimitedUI

import React from "react";
import { AlertTriangle } from "lucide-react";

const RateLimitedUI = () => {
  return (
    <div className="max-w-md mx-auto mt-10 rounded-xl border border-red-300 bg-red-50 text-red-700 p-4 flex items-center gap-3">
      <AlertTriangle className="w-5 h-5 text-red-500" />
      <p className="text-sm font-medium">
        You’ve reached the rate limit. Please try again later.
      </p>
    </div>
  );
};

export default RateLimitedUI;
