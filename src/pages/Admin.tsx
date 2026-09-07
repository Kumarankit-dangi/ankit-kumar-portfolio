import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { AdminLogin } from '@/pages/AdminLogin';
import { AdminDashboard } from '@/pages/AdminDashboard';
import { Loader2 } from 'lucide-react';

export function Admin() {
  const { session, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-navy-950">
        <Loader2 className="w-8 h-8 animate-spin text-accent-400" />
      </div>
    );
  }

  if (!session) {
    return <AdminLogin onSuccess={() => {}} onBack={() => navigate('/')} />;
  }

  return <AdminDashboard onSignOut={() => navigate('/')} />;
}
