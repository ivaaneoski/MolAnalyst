import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Layers, CheckCircle2 } from 'lucide-react';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({ displayName: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setError('');
    setLoading(true);
    
    try {
      await axios.post('http://127.0.0.1:8000/auth/register', { 
        email: formData.email, 
        password: formData.password, 
        display_name: formData.displayName 
      });
      setSuccess(true);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.detail) {
        setError(err.response.data.detail);
      } else {
        setError('Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-ice">
        <Card className="w-full max-w-[420px] shadow-lg text-center p-6">
          <div className="flex justify-center mb-6">
            <CheckCircle2 className="h-16 w-16 text-emerald" />
          </div>
          <CardTitle className="mb-2">Check your inbox!</CardTitle>
          <CardDescription className="mb-8">
            We've temporarily auto-verified accounts for testing. Feel free to log in.
          </CardDescription>
          <Button className="w-full" onClick={() => navigate('/login')}>
            Go to Login
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-ice">
      <Card className="w-full max-w-[420px] shadow-lg">
        <CardHeader className="text-center space-y-4 pb-4">
          <div className="flex justify-center mb-2">
            <Link to="/">
              <Layers className="h-8 w-8 text-navy" />
            </Link>
          </div>
          <CardTitle>Create your MolAnalyst account</CardTitle>
          <CardDescription>
            Free forever. No credit card required.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button variant="secondary" className="w-full bg-white border-slate-200">
              <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
              </svg>
              Sign up with Google
            </Button>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-slate-400 font-medium tracking-wider">or</span>
              </div>
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
              <Input 
                placeholder="Display Name" 
                value={formData.displayName}
                onChange={(e) => setFormData({...formData, displayName: e.target.value})}
                required 
              />
              <Input 
                type="email" 
                placeholder="name@lab.edu" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required 
              />
              <Input 
                type="password" 
                placeholder="Password" 
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required 
              />
              <Input 
                type="password" 
                placeholder="Confirm Password" 
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                required 
              />
              
              <div className="flex items-center space-x-2 text-sm text-slate-600">
                <input type="checkbox" className="rounded text-electric w-4 h-4 border-slate-300 focus:ring-electric" required id="terms" />
                <label htmlFor="terms">I agree to the Terms of Service and Privacy Policy</label>
              </div>

              {error && <p className="text-rose text-sm font-medium">{error}</p>}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>
          </div>
        </CardContent>
        <CardFooter className="justify-center border-t border-slate-100 pt-6">
          <p className="text-sm text-slate-600">
            Already have an account?{' '}
            <Link to="/login" className="text-electric font-medium hover:underline underline-offset-4">Sign in →</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
