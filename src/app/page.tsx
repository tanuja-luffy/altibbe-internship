import Link from 'next/link';

export default function WelcomePage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">Welcome to Altibbe</h1>
        <p className="text-lg text-gray-600 mb-8">Your trusted platform for product transparency.</p>
        <div className="space-x-4">
          <Link href="/login" className="px-6 py-3 rounded-md bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors">
            Login
          </Link>
          <Link href="/register" className="px-6 py-3 rounded-md border-2 border-blue-600 text-blue-600 font-bold hover:bg-blue-600 hover:text-white transition-colors">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}