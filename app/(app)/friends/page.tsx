import { UserPlus, Zap } from 'lucide-react';

export const metadata = {
  title: 'Friends - IdiomaMate',
  description: 'Manage your friends and pending friend requests.',
};

export default function FriendsPage() {
  return (
    <>
      <div className="page-header animate-fadeInUp">
        <h1>Friends</h1>
        <p>Connect and stay in touch with your language partners</p>
      </div>

      <div className="card animate-fadeInUp delay-100" style={{ maxWidth: '600px' }}>
        <div style={{ textAlign: 'center', padding: '40px 20px' }}>
          <div className="w-20 h-20 rounded-xl bg-gray-100 border border-gray-200 text-gray-900 flex items-center justify-center mx-auto mb-5 shadow-sm">
            <UserPlus size={32} />
          </div>
          <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px', color: 'var(--text-primary)' }}>
            Friends List
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '24px', maxWidth: '400px', marginInline: 'auto' }}>
            View your friends, manage pending requests, and see who is online for a quick practice session.
          </p>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            <Zap size={14} style={{ display: 'inline', verticalAlign: '-2px', marginRight: '4px' }} />
            Friends system coming in Fase 6
          </p>
        </div>
      </div>
    </>
  );
}
