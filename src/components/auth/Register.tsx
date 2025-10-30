import { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { DollarSign, Mail } from 'lucide-react';

export const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const { signUp } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      showToast('Passwords do not match', 'error');
      return;
    }

    if (password.length < 6) {
      showToast('Password must be at least 6 characters', 'error');
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await signUp(email, password, name);
      if (error) {
        showToast(error.message, 'error');
      } else {
        setShowVerificationModal(true);
      }
    } catch (error: any) {
      showToast(error.message || 'Registration failed', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center justify-center mb-8">
            <div className="bg-blue-600 p-3 rounded-full">
              <DollarSign className="w-8 h-8 text-white" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
            Create Account
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Start tracking your expenses today
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              type="text"
              label="Full Name"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="name"
            />

            <Input
              type="email"
              label="Email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />

            <Input
              type="password"
              label="Password"
              placeholder="At least 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
            />

            <Input
              type="password"
              label="Confirm Password"
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              autoComplete="new-password"
            />

            <Button type="submit" isLoading={isLoading} className="w-full">
              Create Account
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>

        <Modal
          isOpen={showVerificationModal}
          onClose={() => {
            setShowVerificationModal(false);
            navigate('/app/dashboard');
          }}
          title="Check Your Email"
          size="sm"
        >
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="bg-blue-100 p-4 rounded-full">
                <Mail className="w-12 h-12 text-blue-600" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Verification Email Sent
            </h3>
            <p className="text-gray-600">
              We've sent a verification email to <strong>{email}</strong>. Please check your inbox and click the verification link to activate your account.
            </p>
            <p className="text-sm text-gray-500">
              Don't see the email? Check your spam folder.
            </p>
            <Button
              onClick={() => {
                setShowVerificationModal(false);
                navigate('/app/dashboard');
              }}
              className="w-full"
            >
              Continue to Dashboard
            </Button>
          </div>
        </Modal>
      </div>
    </div>
  );
};
