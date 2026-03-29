import { useState, useContext } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/client';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await api.post('/auth/login', { email, password });
      setUser(res.data.user);
      navigate('/dashboard'); // or back to analyze
    } catch (err) {
      setError(err.response?.data?.detail || 'Login failed');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-[420px]">
        <CardHeader className="text-center">
          <CardTitle className="mb-2">Sign in to MolAnalyst</CardTitle>
          <CardDescription>Access your analysis history and saved structures</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            {error && <div className="text-sm text-rose font-medium text-center bg-rose/10 p-2 rounded">{error}</div>}
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
            <Button type="submit" className="w-full">Sign in</Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center flex-col gap-2">
          <Link to="/register" className="text-sm text-blue hover:underline">
            Don't have an account? Create one →
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
