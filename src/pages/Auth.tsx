
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Brain, Mail, Lock, User, Building } from 'lucide-react';
import type { User as SupabaseUser, Session } from '@supabase/supabase-js';

const Auth = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          navigate('/dashboard');
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        navigate('/dashboard');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignUp = async (email: string, password: string, firstName: string, lastName: string) => {
    setLoading(true);
    try {
      const redirectUrl = `${window.location.origin}/dashboard`;
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            first_name: firstName,
            last_name: lastName
          }
        }
      });

      if (error) {
        toast({
          title: "Sign Up Error",
          description: error.message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Success",
          description: "Please check your email to confirm your account."
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        toast({
          title: "Sign In Error",
          description: error.message,
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pearl-white to-soft-lavender/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-warm-amber to-soft-lavender rounded-xl flex items-center justify-center">
              <Brain className="h-7 w-7 text-charcoal-slate" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-charcoal-slate">ElegantATS</h1>
            </div>
          </div>
          <p className="text-charcoal-slate/70">Welcome to AI-Powered Hiring</p>
        </div>

        <Card className="elegant-card border-0 shadow-xl">
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="signin">
              <SignInForm onSubmit={handleSignIn} loading={loading} />
            </TabsContent>
            
            <TabsContent value="signup">
              <SignUpForm onSubmit={handleSignUp} loading={loading} />
            </TabsContent>
          </Tabs>
        </Card>

        <div className="text-center mt-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="text-charcoal-slate/70 hover:text-charcoal-slate"
          >
            ← Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

const SignInForm = ({ onSubmit, loading }: { onSubmit: (email: string, password: string) => void; loading: boolean }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardHeader>
        <CardTitle className="text-charcoal-slate">Welcome Back</CardTitle>
        <CardDescription className="text-charcoal-slate/70">
          Sign in to your account to continue
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="signin-email" className="text-charcoal-slate">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-charcoal-slate/50" />
            <Input
              id="signin-email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 border-charcoal-slate/20 text-charcoal-slate"
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="signin-password" className="text-charcoal-slate">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-charcoal-slate/50" />
            <Input
              id="signin-password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10 border-charcoal-slate/20 text-charcoal-slate"
              required
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          type="submit" 
          className="w-full minimalist-button"
          disabled={loading}
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </Button>
      </CardFooter>
    </form>
  );
};

const SignUpForm = ({ onSubmit, loading }: { 
  onSubmit: (email: string, password: string, firstName: string, lastName: string) => void; 
  loading: boolean 
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password, firstName, lastName);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardHeader>
        <CardTitle className="text-charcoal-slate">Create Account</CardTitle>
        <CardDescription className="text-charcoal-slate/70">
          Join thousands of companies using ElegantATS
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="first-name" className="text-charcoal-slate">First Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-charcoal-slate/50" />
              <Input
                id="first-name"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="pl-10 border-charcoal-slate/20 text-charcoal-slate"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="last-name" className="text-charcoal-slate">Last Name</Label>
            <Input
              id="last-name"
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="border-charcoal-slate/20 text-charcoal-slate"
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="signup-email" className="text-charcoal-slate">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-charcoal-slate/50" />
            <Input
              id="signup-email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 border-charcoal-slate/20 text-charcoal-slate"
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="signup-password" className="text-charcoal-slate">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-charcoal-slate/50" />
            <Input
              id="signup-password"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10 border-charcoal-slate/20 text-charcoal-slate"
              required
              minLength={6}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          type="submit" 
          className="w-full minimalist-button"
          disabled={loading}
        >
          {loading ? 'Creating Account...' : 'Create Account'}
        </Button>
      </CardFooter>
    </form>
  );
};

export default Auth;
