import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: 'IdiomaMate - Authentication',
  description: 'Sign in or register for IdiomaMate.',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative selection:bg-gray-900 selection:text-white">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-96 bg-white rounded-full blur-3xl opacity-60 mix-blend-overlay pointer-events-none"></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <Link href="/" className="group flex items-center justify-center gap-2 mb-8 text-gray-500 hover:text-black transition-colors">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back to platform</span>
        </Link>
        <div className="flex justify-center items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-black flex items-center justify-center text-white font-bold text-sm tracking-tighter shadow-md shadow-black/10">
            iM
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900">
            IdiomaMate
          </span>
        </div>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-white py-8 px-4 shadow-xl shadow-gray-200/50 sm:rounded-xl border border-gray-100 sm:px-10">
          {children}
        </div>
      </div>
    </div>
  );
}
