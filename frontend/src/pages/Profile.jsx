import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Link } from 'react-router-dom';
import { Layers } from 'lucide-react';

const Profile = () => {
  return (
    <div className="min-h-screen bg-ice font-inter flex text-slate-900">
      
      {/* Sidebar Layout */}
      <aside className="w-64 bg-slate-50 border-r border-slate-200 p-6 flex flex-col hidden md:flex">
        <div className="flex items-center space-x-2 mb-10">
          <Link to="/">
             <Layers className="h-6 w-6 text-navy" />
          </Link>
          <span className="text-xl font-bold font-sora tracking-tight text-navy">MolAnalyst</span>
        </div>

        <nav className="space-y-2 flex-1">
          <Link to="/dashboard" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-100 font-medium">
            <span className="text-sm">My Analyses</span>
          </Link>
          <Link to="/profile" className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-electric/10 text-electric font-medium">
            <span className="text-sm">Profile & Settings</span>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-sora tracking-tight font-semibold text-navy mb-8">Profile & Settings</h2>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-6 pb-2">
                  <div className="h-20 w-20 rounded-full bg-electric text-white flex items-center justify-center text-3xl font-bold">AS</div>
                  <Button variant="secondary" size="sm">Change Photo</Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-600">Display Name</label>
                    <Input defaultValue="Dr. Ana Silva" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-600">Email Address</label>
                    <Input defaultValue="user@lab.edu" disabled />
                  </div>
                </div>
                <Button className="mt-4">Save Changes</Button>
              </CardContent>
            </Card>

            <Card className="border-rose-200">
              <CardHeader>
                <CardTitle className="text-lg text-rose">Danger Zone</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-slate-900">Delete Account</h4>
                    <p className="text-sm text-slate-600">Permanently remove your account and all 2 analyses.</p>
                  </div>
                  <Button variant="danger">Delete Account</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
