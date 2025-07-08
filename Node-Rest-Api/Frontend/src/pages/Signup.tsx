import SignupForm from '@/components/SignupForm';
import { useNavigate } from 'react-router-dom';

export default function SignupPage() {
    const navigate = useNavigate();
    const handleSignup = (formData: {
      email: string;
      password: string;
      username: string;
      city: string;
      country: string;
    }) => {
      console.log('Signing up with:', formData);
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
            <button type="submit" onClick={() => navigate('/login')} className="font-medium text-blue-800 hover:text-blue-700 cursor-pointer">
              Sign in
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  