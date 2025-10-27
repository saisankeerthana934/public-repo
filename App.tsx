
import React, { useState } from 'react';
import LoginComponent from './components/LoginComponent';
import ProfileComponent from './components/ProfileComponent';
import { UserProfile } from './types';

function App() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const handleLoginSuccess = (profile: UserProfile) => {
    setUserProfile(profile);
  };

  const handleLogout = () => {
    setUserProfile(null);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-lg">
        {!userProfile ? (
          <LoginComponent onLoginSuccess={handleLoginSuccess} />
        ) : (
          <ProfileComponent user={userProfile} onLogout={handleLogout} />
        )}
      </div>
    </div>
  );
}

export default App;