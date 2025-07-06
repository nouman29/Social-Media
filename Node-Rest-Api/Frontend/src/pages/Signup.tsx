import SignupForm from '@/components/SignupForm';

export default function SignupPage() {
    const handleSignup = (email: string, password: string) => {
      console.log('Signing up with:', email, password);
    };
  
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 p-8 bg-neutral-800 rounded-2xl shadow-2xl">
          <div>
            <h2 className="text-center text-4xl font-bold text-white">
              Create your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-400">
              Join us and start your journey
            </p>
          </div>
  
          <SignupForm onSignup={handleSignup} />
  
          <div className="text-sm text-center text-gray-400">
            Already have an account?{' '}
            <a
              href="/login"
              className="font-medium text-indigo-400 hover:text-indigo-300"
            >
              Sign in
            </a>
          </div>
        </div>
      </div>
    );
  }
  
  