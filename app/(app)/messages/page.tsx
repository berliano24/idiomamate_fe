import { MessageSquare, Zap } from 'lucide-react';

export const metadata = {
  title: 'Messages - IdiomaMate',
  description: 'Chat with your language partners in real-time.',
};

export default function MessagesPage() {
  return (
    <>
      <div className="page-header animate-fadeInUp">
        <h1>Messages</h1>
        <p>Direct messages with your language partners</p>
      </div>

      <div className="card animate-fadeInUp delay-100" style={{ maxWidth: '600px' }}>
        <div style={{ textAlign: 'center', padding: '40px 20px' }}>
          <div className="w-20 h-20 rounded-xl bg-gray-100 border border-gray-200 text-gray-900 flex items-center justify-center mx-auto mb-5 shadow-sm">
            <MessageSquare size={32} />
          </div>
          <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px', color: 'var(--text-primary)' }}>
            Direct Messages
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '24px', maxWidth: '400px', marginInline: 'auto' }}>
            Chat with friends in real-time, see unread message badges, and stay connected with your practice partners.
          </p>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            <Zap size={14} style={{ display: 'inline', verticalAlign: '-2px', marginRight: '4px' }} />
            Messaging system coming in Fase 6
          </p>
        </div>
      </div>
    </>
  );
}
