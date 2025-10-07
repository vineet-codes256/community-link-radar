import { MapPin, Pencil, Settings, Globe, Calendar, Mail, ShieldCheck } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useMemo, useCallback, memo } from 'react';

const Profile = memo(() => {
  const mockConnections = useMemo(
    () => [
      { id: 1, name: 'Vineet Rawat', location: 'Bangalore', connectedDays: 2 },
      { id: 2, name: 'Suneet Rawat', location: 'Delhi', connectedDays: 5 },
      { id: 3, name: 'Yash Bisht', location: 'Mumbai', connectedDays: 1 },
      { id: 4, name: 'Akhil Panwar', location: 'Pune', connectedDays: 3 },
      { id: 5, name: 'Ali Sayed', location: 'Hyderabad', connectedDays: 7 },
      { id: 6, name: 'Junaid Ansari', location: 'Chennai', connectedDays: 4 },
      { id: 7, name: 'Adil Shaikh', location: 'Ahmedabad', connectedDays: 6 },
      { id: 8, name: 'Harsh Sharma', location: 'Jaipur', connectedDays: 2 },
    ],
    []
  );

  const handleEditProfile = useCallback(() => {
    // Handle edit profile functionality
  }, []);

  const handleSettings = useCallback(() => {
    // Handle settings functionality
  }, []);

  const handleCreatePost = useCallback(() => {
    // Handle create post functionality
  }, []);

  const handleViewConnection = useCallback((userId: number) => {
    // Handle view connection functionality
  }, []);
  return (
    <div className="container py-8 animate-fade-in">
      <div className="flex flex-col gap-6">
        <Card className="border-none shadow-sm overflow-hidden">
          <div className="h-48 bg-gradient-to-r from-primary/50 to-primary relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 bg-background/20 hover:bg-background/30 backdrop-blur-sm text-white"
            >
              <Pencil className="h-4 w-4" />
            </Button>
          </div>

          <div className="px-6 pb-6 pt-0">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-end relative">
              <Avatar className="h-32 w-32 border-4 border-background -mt-16 bg-background">
                <AvatarFallback className="text-4xl">AS</AvatarFallback>
              </Avatar>

              <div className="space-y-1 flex-1">
                <h1 className="text-3xl font-bold">Ananya Singh</h1>
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>Koramangala, Bengaluru</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 md:flex-nowrap">
                <Button variant="outline" onClick={handleSettings}>
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
                <Button onClick={handleEditProfile}>Edit Profile</Button>
              </div>
            </div>
          </div>
        </Card>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/3 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">About</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Passionate software developer, coffee lover, and avid hiker. New to Bengaluru and
                  looking to connect with like-minded individuals.
                </p>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <span>ananyasingh.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>hello@ananyasingh.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Joined April 2025</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Interests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Technology</Badge>
                  <Badge variant="secondary">Hiking</Badge>
                  <Badge variant="secondary">Photography</Badge>
                  <Badge variant="secondary">Reading</Badge>
                  <Badge variant="secondary">Coffee</Badge>
                  <Badge variant="secondary">Travel</Badge>
                  <Badge variant="secondary">Yoga</Badge>
                  <Badge variant="secondary">Cooking</Badge>
                  <Badge variant="secondary">Music</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="w-full md:w-2/3">
            <Tabs defaultValue="connections">
              <TabsList className="mb-4">
                <TabsTrigger value="connections">Connections</TabsTrigger>
                <TabsTrigger value="posts">Posts</TabsTrigger>
                <TabsTrigger value="events">Events</TabsTrigger>
              </TabsList>

              <TabsContent value="connections" className="mt-0">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">Your Connections</CardTitle>
                      <div className="flex items-center gap-1">
                        <ShieldCheck className="h-4 w-4 text-primary" />
                        <span className="text-sm text-muted-foreground">Privacy: Only You</span>
                      </div>
                    </div>
                    <CardDescription>
                      People you've connected with through Nearby Connect
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[400px] pr-4">
                      <div className="space-y-4">
                        {mockConnections.map(connection => (
                          <div key={connection.id} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarFallback>U{connection.id}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{connection.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  {connection.location} • Connected {connection.connectedDays} days
                                  ago
                                </p>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleViewConnection(connection.id)}
                            >
                              View
                            </Button>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="posts" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Your Posts</CardTitle>
                    <CardDescription>Posts you've shared with your community</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="py-8 text-center">
                      <p className="text-muted-foreground mb-4">You haven't posted anything yet</p>
                      <Button onClick={handleCreatePost}>Create Your First Post</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="events" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Your Events</CardTitle>
                    <CardDescription>Events you're attending or have organized</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[400px] pr-4">
                      <div className="space-y-6">
                        <div>
                          <h3 className="font-medium mb-3">Upcoming</h3>
                          <div className="space-y-4">
                            <div className="flex gap-4 items-start">
                              <div className="w-14 h-14 bg-muted rounded-md flex flex-col items-center justify-center">
                                <span className="text-sm font-bold">APR</span>
                                <span className="text-xl font-bold">20</span>
                              </div>
                              <div className="flex-1">
                                <p className="font-medium">Weekend Farmers Market</p>
                                <p className="text-sm text-muted-foreground">
                                  Cubbon Park • 9:00 AM
                                </p>
                              </div>
                              <Badge>Attending</Badge>
                            </div>
                            <Separator />
                            <div className="flex gap-4 items-start">
                              <div className="w-14 h-14 bg-muted rounded-md flex flex-col items-center justify-center">
                                <span className="text-sm font-bold">APR</span>
                                <span className="text-xl font-bold">22</span>
                              </div>
                              <div className="flex-1">
                                <p className="font-medium">Tech Networking Mixer</p>
                                <p className="text-sm text-muted-foreground">The Leela • 6:30 PM</p>
                              </div>
                              <Badge>Attending</Badge>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="font-medium mb-3">Past</h3>
                          <div className="space-y-4">
                            <div className="flex gap-4 items-start opacity-75">
                              <div className="w-14 h-14 bg-muted rounded-md flex flex-col items-center justify-center">
                                <span className="text-sm font-bold">APR</span>
                                <span className="text-xl font-bold">10</span>
                              </div>
                              <div className="flex-1">
                                <p className="font-medium">Local Book Club Meeting</p>
                                <p className="text-sm text-muted-foreground">
                                  City Library • 4:00 PM
                                </p>
                              </div>
                              <Badge variant="outline">Attended</Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Profile;
