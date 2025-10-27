
// import React, { useEffect, useState } from 'react';
// import { UserProfile } from '../types';

// interface ProfileComponentProps {
//   user: UserProfile;
//   onLogout: () => void;
// }

// // A simple function to generate a mock ObjectId
// const generateObjectId = () => {
//     const timestamp = (new Date().getTime() / 1000 | 0).toString(16);
//     return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function() {
//         return (Math.random() * 16 | 0).toString(16);
//     }).toLowerCase();
// };


// const ProfileComponent: React.FC<ProfileComponentProps> = ({ user, onLogout }) => {
//   const [mongoId, setMongoId] = useState('');

//   useEffect(() => {
//     // Generate the ID only once when the component mounts
//     setMongoId(generateObjectId());
//   }, []);


//   return (
//     <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-slate-700 text-center animate-fade-in w-full">
//         <img
//             src={user.picture}
//             alt="User profile"
//             className="w-28 h-28 rounded-full mx-auto mb-4 border-4 border-slate-700 ring-4 ring-slate-800 shadow-lg"
//         />
//         <h2 className="text-2xl font-bold text-slate-100">Welcome, {user.name}!</h2>
//         <p className="text-slate-400 mt-1">{user.email}</p>
      
//         <div className="mt-8 bg-slate-900 p-4 rounded-lg border border-slate-700 text-left shadow-inner">
//             <div className="flex items-center pb-3 border-b border-slate-700 mb-3">
//                 <div className="flex space-x-1.5">
//                     <div className="w-3 h-3 rounded-full bg-red-500"></div>
//                     <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
//                     <div className="w-3 h-3 rounded-full bg-green-500"></div>
//                 </div>
//                 <p className="text-sm text-slate-400 mx-auto">
//                   <span className="font-semibold text-slate-200">MongoDB</span>: users collection
//                 </p>
//             </div>
//             <pre className="text-sm text-slate-300 font-mono overflow-x-auto">
//                 <code>
//                     {`{\n`}
//                     {`  `}<span className="text-cyan-400">"_id"</span>: <span className="text-amber-400">"{mongoId}"</span>,{`\n`}
//                     {`  `}<span className="text-cyan-400">"name"</span>: <span className="text-amber-400">"{user.name}"</span>,{`\n`}
//                     {`  `}<span className="text-cyan-400">"email"</span>: <span className="text-amber-400">"{user.email}"</span>,{`\n`}
//                     {`  `}<span className="text-cyan-400">"picture"</span>: <span className="text-amber-400">"{user.picture}"</span>,{`\n`}
//                     {`  `}<span className="text-cyan-400">"__v"</span>: <span className="text-lime-400">0</span>{`\n`}
//                     {`}`}
//                 </code>
//             </pre>
//             <div className="text-center pt-3 mt-3 border-t border-slate-700">
//                  <p className="text-green-400 font-medium text-sm animate-pulse">Successfully stored in database</p>
//             </div>
//         </div>

//         <div className="mt-8">
//             <button
//                 onClick={onLogout}
//                 className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300"
//             >
//                 Logout
//             </button>
//         </div>
//     </div>
//   );
// };

// export default ProfileComponent;
import React from 'react';
import { UserProfile } from '../types';

interface ProfileComponentProps {
  user: UserProfile;
}

const ProfileComponent: React.FC<ProfileComponentProps> = ({ user }) => {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-slate-700 text-center animate-fade-in w-full">
        <img
            src={user.picture} // Real picture
            alt="User profile"
            className="w-28 h-28 rounded-full mx-auto mb-4 border-4 border-slate-700 ring-4 ring-slate-800 shadow-lg"
        />
        <h2 className="text-2xl font-bold text-slate-100">Welcome, {user.name}!</h2>
        <p className="text-slate-400 mt-1">{user.email}</p>
      
        <div className="mt-8">
            {/* This link MUST point to port 8000 */}
            <a
                href="http://localhost:8000/api/logout"
                className="w-full block text-center bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300"
            >
                Logout
            </a>
        </div>
    </div>
  );
};

export default ProfileComponent;