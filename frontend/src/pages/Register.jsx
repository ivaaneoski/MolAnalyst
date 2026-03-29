import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/client';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api.post('/auth/register', { email, password, display_name: displayName });
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.detail || 'Registration failed');
    }
  };

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <Card className="w-full max-w-[420px] text-center">
          <CardHeader>
            <CardTitle>Check your inbox!</CardTitle>
            <CardDescription>We've sent a verification email to {email}.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/login" className="text-blue flex py-2 justify-center">Go to login</Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-[420px]">
        <CardHeader className="text-center">
          <CardTitle className="mb-2">Create your MolAnalyst account</CardTitle>
          <CardDescription>Free forever. No credit card required.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            {error && <div className="text-sm text-rose font-medium text-center bg-rose/10 p-2 rounded">{error}</div>}
            <div className="space-y-2">
              <Input 
                type="text" 
                placeholder="Display Name" 
                value={displayName} 
                onChange={(e) => setDisplayName(e.target.value)} 
                required 
              />
            </div>
            <div className="space-y-2">
              <Input 
                type="email" 
                placeholder="Email address" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </div>
            <div className="space-y-2">
              <Input 
                type="password" 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
            </div>
            <Button type="submit" className="w-full text-white bg-blue">Create Account</Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link to="/login" className="text-sm text-blue hover:underline">
            Already have an account? Sign in →
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
