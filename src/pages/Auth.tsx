import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import CreateProfile from './CreateProfile';

type AuthMode = 'login' | 'signup';

const Auth = () => {
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('full_name')
          .eq('id', session.user.id)
          .single();

        if (!profile || !profile.full_name) {
          navigate('/create-profile', { replace: true });
        } else {
          navigate('/', { replace: true });
          toast({
            title: 'Welcome!',
            description: `Logged in as ${session.user.email}`,
          });
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    if (authMode === 'login') {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setErrorMsg(error.message);
    } else {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) setErrorMsg(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md animate-fade-in-up shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            {authMode === 'login' ? 'Login to Nearby Connect' : 'Create your account'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleAuth}>
            <Input
              type="email"
              id="email"
              placeholder="Email address"
              autoComplete="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              disabled={loading}
            />
            <Input
              type="password"
              id="password"
              placeholder="Password"
              autoComplete={authMode === 'signup' ? 'new-password' : 'current-password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              minLength={6}
              disabled={loading}
            />
            {errorMsg && <div className="text-red-500 text-sm">{errorMsg}</div>}
            <Button type="submit" className="w-full" disabled={loading} aria-busy={loading}>
              {loading
                ? authMode === 'login'
                  ? 'Logging in...'
                  : 'Signing up...'
                : authMode === 'login'
                  ? 'Log In'
                  : 'Sign Up'}
            </Button>
          </form>
          <div className="mt-6 flex justify-center">
            {authMode === 'login' ? (
              <span className="text-sm">
                Don&apos;t have an account?{' '}
                <button
                  className="font-semibold text-primary hover:underline"
                  type="button"
                  onClick={() => setAuthMode('signup')}
                  disabled={loading}
                >
                  Sign Up
                </button>
              </span>
            ) : (
              <span className="text-sm">
                Already have an account?{' '}
                <button
                  className="font-semibold text-primary hover:underline"
                  type="button"
                  onClick={() => setAuthMode('login')}
                  disabled={loading}
                >
                  Log In
                </button>
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
