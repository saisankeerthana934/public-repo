
// import React, { useState } from 'react';
// import { UserProfile } from '../types';
// import GoogleIcon from './icons/GoogleIcon';

// interface LoginComponentProps {
//   onLoginSuccess: (profile: UserProfile) => void;
// }

// const LoadingSpinner: React.FC = () => (
//     <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//     </svg>
// );

// const LoginComponent: React.FC<LoginComponentProps> = ({ onLoginSuccess }) => {
//   const [isLoading, setIsLoading] = useState(false);

//   const handleLogin = () => {
//     setIsLoading(true);
//     // Simulate API call to Google OAuth
//     setTimeout(() => {
//       const mockProfile: UserProfile = {
//         name: 'Sankeerthana',
//         email: 'saikeerthana05.ch@gmail.com',
//         picture: 'https://picsum.photos/seed/alex/200',
//       };
//       onLoginSuccess(mockProfile);
//       setIsLoading(false);
//     }, 1500);
//   };

//   return (
//     <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-slate-700 transition-all duration-300">
//       <div className="text-center">
//         <h1 className="text-3xl font-bold text-slate-100">NodeJS / OAuth Track</h1>
//         <p className="mt-2 text-lg text-slate-400">Level 1 — Single Provider OAuth</p>
//       </div>
//       <div className="mt-8 text-center bg-slate-900/50 p-6 rounded-lg border border-slate-700">
//         <p className="text-slate-300">
//           Implement "Login with Google" in a small Express + Mongo app and store the returned profile in the database.
//         </p>
//       </div>
//       <div className="mt-10">
//         <button
//           onClick={handleLogin}
//           disabled={isLoading}
//           className="w-full flex justify-center items-center gap-3 bg-white text-slate-800 font-semibold py-3 px-4 rounded-lg shadow-md hover:bg-slate-200 transition-colors duration-300 disabled:bg-slate-400 disabled:cursor-not-allowed"
//         >
//           {isLoading ? (
//             <>
//               <LoadingSpinner />
//               <span>Authenticating...</span>
//             </>
//           ) : (
//             <>
//               <GoogleIcon />
//               <span>Sign in with Google</span>
//             </>
//           )}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default LoginComponent;
import React from 'react';
import GoogleIcon from './icons/GoogleIcon';
import { FaGithub } from 'react-icons/fa';

const LoginComponent: React.FC = () => {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-slate-700 transition-all duration-300">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-100">NodeJS / OAuth Track</h1>
        <p className="mt-2 text-lg text-slate-400">Level 1 — Multi Provider OAuth</p>
      </div>
      <div className="mt-8 text-center bg-slate-900/50 p-6 rounded-lg border border-slate-700">
        <p className="text-slate-300">
          Log in with Google, GitHub, LinkedIn, or Twitter to start!
        </p>
      </div>
      <div className="mt-10 flex flex-col gap-4">
        {/* Google Login */}
        <a
          href="http://localhost:8000/auth/google"
          className="w-full flex justify-center items-center gap-3 bg-white text-slate-800 font-semibold py-3 px-4 rounded-lg shadow-md hover:bg-slate-200 transition-colors duration-300"
        >
          <GoogleIcon />
          <span>Sign in with Google</span>
        </a>
        {/* GitHub Login */}
        <a
          href="http://localhost:8000/auth/github"
          className="w-full flex justify-center items-center gap-3 bg-[#24292f] text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:bg-[#333] transition-colors duration-300"
        >
          <FaGithub size={24} />
          <span>Sign in with GitHub</span>
        </a>
        {/* LinkedIn Login */}
        <a
          href="http://localhost:8000/auth/linkedin"
          className="w-full flex justify-center items-center gap-3 bg-[#0077b5] text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:bg-[#005983] transition-colors duration-300"
        >
          <span>Sign in with LinkedIn</span>
        </a>
        {/* Twitter Login */}
        <a
          href="http://localhost:8000/auth/twitter"
          className="w-full flex justify-center items-center gap-3 bg-[#1DA1F2] text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:bg-[#0d95e8] transition-colors duration-300"
        >
          <span>Sign in with Twitter</span>
        </a>
      </div>
    </div>
  );
};

export default LoginComponent;
