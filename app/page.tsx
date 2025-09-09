import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Admin Panel
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Modern işletme yönetim sisteminize hoş geldiniz
          </p>
        </div>
        
        <Link
          href="/dashboard"
          className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-200 hover:-translate-y-1 font-medium"
        >
          Panele Giriş Yap
        </Link>
      </div>
    </div>
  );
}