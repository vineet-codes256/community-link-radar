import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '@/hooks/use-auth';
import { MapPin } from 'lucide-react';

const CreateProfile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [location, setLocation] = useState('');
  const [about, setAbout] = useState('');
  const [loading, setLoading] = useState(false);
  const [gettingLocation, setGettingLocation] = useState(false);
  const [coordinates, setCoordinates] = useState<{ latitude: number; longitude: number } | null>(
    null
  );

  const detectLocation = () => {
    if (!navigator.geolocation) {
      toast({
        title: 'Error',
        description: 'Geolocation is not supported by your browser.',
      });
      return;
    }

    setGettingLocation(true);
    navigator.geolocation.getCurrentPosition(
      position => {
        setCoordinates({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        toast({
          title: 'Location detected',
          description: 'Your current location has been detected.',
        });
        setGettingLocation(false);
      },
      error => {
        toast({
          title: 'Error',
          description: `Unable to get your location: ${error.message}`,
        });
        setGettingLocation(false);
      }
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!user) {
      toast({ title: 'Error', description: 'User not logged in.' });
      setLoading(false);
      return;
    }

    // Save to profiles
    const { error: profileError } = await supabase
      .from('profiles')
      .update({
        full_name: fullName,
        username: location, // Using username field for location name for now
        avatar_url: '',
      })
      .eq('id', user.id);

    if (profileError) {
      toast({ title: 'Error', description: profileError.message });
      setLoading(false);
      return;
    }

    // Save location coordinates if available
    if (coordinates) {
      const { error: locationError } = await supabase.from('user_locations').insert({
        user_id: user.id,
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
        is_visible: true,
      });

      if (locationError) {
        toast({
          title: 'Warning',
          description: 'Profile saved but location coordinates could not be stored.',
        });
      }
    }

    toast({ title: 'Profile created!', description: 'Welcome to Nearby Connect.' });
    navigate('/', { replace: true });
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Create Your Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              required
              disabled={loading}
            />

            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Location (e.g. Koramangala, Bengaluru)"
                value={location}
                onChange={e => setLocation(e.target.value)}
                required
                disabled={loading}
              />
              <div className="flex justify-end">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={detectLocation}
                  disabled={gettingLocation || loading}
                  className="flex items-center gap-1"
                >
                  <MapPin className="h-3 w-3" />
                  {gettingLocation ? 'Detecting...' : 'Detect my location'}
                </Button>
              </div>
            </div>

            <Textarea
              placeholder="About you (a little intro, interests, etc.)"
              value={about}
              onChange={e => setAbout(e.target.value)}
              rows={4}
              disabled={loading}
            />

            <Button type="submit" className="w-full" disabled={loading} aria-busy={loading}>
              {loading ? 'Saving...' : 'Save Profile'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateProfile;
