import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { User, Mail, Lock, LogOut, ShieldCheck, AlertCircle, Save } from 'lucide-react';

export function Account() {
  const { t, token, logout } = useStore();
  const navigate = useNavigate();
  
  const [userData, setUserData] = useState({ username: '', email: '', first_name: '', last_name: '' });
  const [newEmail, setNewEmail] = useState('');
  const [profileData, setProfileData] = useState({ first_name: '', last_name: '' });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });
  
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    fetchUserData();
  }, [token]);

  const fetchUserData = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/user/', {
        headers: { 'Authorization': `Token ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setUserData(data);
        setNewEmail(data.email);
        setProfileData({ first_name: data.first_name || '', last_name: data.last_name || '' });
      }
    } catch (err) {
      console.error("Failed to fetch user data");
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus(null);
    try {
      const response = await fetch('http://localhost:8000/api/user/update-profile/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
        body: JSON.stringify(profileData)
      });
      if (response.ok) {
        setStatus({ type: 'success', message: t('account.success_update') });
        setUserData({ ...userData, ...profileData });
      } else {
        const data = await response.json();
        setStatus({ type: 'error', message: data.error || t('account.error_update') });
      }
    } catch (err) {
      setStatus({ type: 'error', message: t('account.error_update') });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus(null);
    try {
      const response = await fetch('http://localhost:8000/api/user/update-email/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
        body: JSON.stringify({ email: newEmail })
      });
      if (response.ok) {
        setStatus({ type: 'success', message: t('account.success_update') });
        setUserData({ ...userData, email: newEmail });
      } else {
        const data = await response.json();
        setStatus({ type: 'error', message: data.error || t('account.error_update') });
      }
    } catch (err) {
      setStatus({ type: 'error', message: t('account.error_update') });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      setStatus({ type: 'error', message: t('auth.passwords_dont_match') });
      return;
    }
    setIsLoading(true);
    setStatus(null);
    try {
      const response = await fetch('http://localhost:8000/api/user/update-password/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
        body: JSON.stringify({
          old_password: passwordData.currentPassword,
          new_password: passwordData.newPassword
        })
      });
      if (response.ok) {
        setStatus({ type: 'success', message: t('account.success_update') });
        setPasswordData({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
      } else {
        const data = await response.json();
        setStatus({ type: 'error', message: data.error || t('account.error_update') });
      }
    } catch (err) {
      setStatus({ type: 'error', message: t('account.error_update') });
    } finally {
      setIsLoading(false);
    }
  };

  if (!token) return null;

  return (
    <div className="min-h-screen bg-slate-50 py-12 animate-in fade-in duration-500">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row gap-8 items-start justify-between mb-12">
          <div>
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-2">
              {t('account.title')}
            </h1>
            <p className="text-slate-500 font-medium">
              {t('account.subtitle')}
            </p>
          </div>
          <button 
            onClick={() => { logout(); navigate('/'); }}
            className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-rose-600 font-bold rounded-2xl hover:bg-rose-50 hover:border-rose-100 transition-all shadow-sm active:scale-95"
          >
            <LogOut size={20} />
            {t('nav.logout')}
          </button>
        </div>

        {status && (
          <div className={`mb-8 p-4 rounded-2xl border flex items-center gap-3 animate-in fade-in slide-in-from-top-2 ${
            status.type === 'success' ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-rose-50 border-rose-100 text-rose-700'
          }`}>
            {status.type === 'success' ? <ShieldCheck size={20} /> : <AlertCircle size={20} />}
            <span className="font-bold text-sm">{status.message}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* User Info Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 text-center">
              <div className="w-24 h-24 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <User size={48} />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-1">
                {userData.first_name && userData.last_name 
                  ? `${userData.first_name} ${userData.last_name}` 
                  : userData.username}
              </h3>
              <p className="text-slate-500 text-sm font-medium">{userData.email}</p>
            </div>
            
            <div className="bg-blue-600 rounded-[2rem] p-8 text-white shadow-xl shadow-blue-600/20">
              <ShieldCheck size={32} className="mb-4 opacity-80" />
              <h4 className="text-lg font-bold mb-2">{t('account.security_title')}</h4>
              <p className="text-blue-100 text-sm leading-relaxed">
                {t('account.security_notice')}
              </p>
            </div>
          </div>

          {/* Settings Forms */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Profile Info Form */}
            <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-sm border border-slate-100">
              <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">
                <User className="text-blue-600" size={24} />
                {t('account.profile_info')}
              </h3>
              
              <form onSubmit={handleUpdateProfile} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">
                      {t('account.first_name')}
                    </label>
                    <input
                      type="text"
                      value={profileData.first_name}
                      onChange={(e) => setProfileData({...profileData, first_name: e.target.value})}
                      className="block w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                      placeholder={t('account.first_name')}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">
                      {t('account.last_name')}
                    </label>
                    <input
                      type="text"
                      value={profileData.last_name}
                      onChange={(e) => setProfileData({...profileData, last_name: e.target.value})}
                      className="block w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                      placeholder={t('account.last_name')}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex items-center justify-center gap-2 py-4 px-8 bg-slate-900 hover:bg-blue-600 text-white font-bold rounded-2xl transition-all shadow-md hover:shadow-lg active:scale-95 disabled:bg-slate-400"
                >
                  <Save size={18} />
                  {t('account.save_changes')}
                </button>
              </form>
            </div>

            {/* Change Email Form */}
            <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-sm border border-slate-100">
              <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">
                <Mail className="text-blue-600" size={24} />
                {t('account.change_email')}
              </h3>
              
              <form onSubmit={handleUpdateEmail} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">
                    {t('account.new_email')}
                  </label>
                  <input
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="block w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex items-center justify-center gap-2 py-4 px-8 bg-slate-900 hover:bg-blue-600 text-white font-bold rounded-2xl transition-all shadow-md hover:shadow-lg active:scale-95 disabled:bg-slate-400"
                >
                  <Save size={18} />
                  {t('account.save_changes')}
                </button>
              </form>
            </div>

            {/* Change Password Form */}
            <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-sm border border-slate-100">
              <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">
                <Lock className="text-blue-600" size={24} />
                {t('account.change_password')}
              </h3>
              
              <form onSubmit={handleUpdatePassword} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">
                    {t('account.current_password')}
                  </label>
                  <input
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                    className="block w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    placeholder={t('auth.password_placeholder')}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">
                      {t('account.new_password')}
                    </label>
                    <input
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                      className="block w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                      placeholder={t('auth.password_placeholder')}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">
                      {t('account.confirm_new_password')}
                    </label>
                    <input
                      type="password"
                      value={passwordData.confirmNewPassword}
                      onChange={(e) => setPasswordData({...passwordData, confirmNewPassword: e.target.value})}
                      className="block w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                      placeholder={t('auth.password_placeholder')}
                      required
                    />
                  </div>
                </div>
                
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex items-center justify-center gap-2 py-4 px-8 bg-slate-900 hover:bg-blue-600 text-white font-bold rounded-2xl transition-all shadow-md hover:shadow-lg active:scale-95 disabled:bg-slate-400"
                >
                  <Save size={18} />
                  {t('account.save_changes')}
                </button>
              </form>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
