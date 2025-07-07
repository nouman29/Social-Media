import SignupForm from '@/components/SignupForm';

export default function SignupPage() {
    const handleSignup = (email: string, password: string) => {
      console.log('Signing up with:', email, password);
    };
  
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-6 p-6 bg-blue-50 rounded-lg shadow-lg">
          <div>
            <h2 className="text-center text-3xl font-bold text-blue-800">
              Create your account
            </h2>
            <p className="mt-1 text-center text-sm text-blue-600">
              Join us and start your journey
            </p>
          </div>
  
          <SignupForm onSignup={handleSignup} />
  
          <div className="text-sm text-center text-blue-600">
            Already have an account?{' '}
            <a
              href="/login"
              className="font-medium text-blue-800 hover:text-blue-700"
            >
              Sign in
            </a>
          </div>
        </div>
      </div>
    );
  }
  
  