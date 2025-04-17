import { MessageSquare, Heart, Share, User, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

// Mock data for community posts
const communityPosts = [
  {
    id: 1,
    user: {
      name: "Deepa Verma",
      avatar: "",
    },
    time: "2 hours ago",
    content: "Does anyone know a good interior designer in Indiranagar? Looking to renovate my apartment.",
    likes: 12,
    comments: 8,
    category: "recommendations"
  },
  {
    id: 2,
    user: {
      name: "Rohan Joshi",
      avatar: "",
    },
    time: "5 hours ago",
    content: "Heads up everyone! There's a water shortage expected in HSR Layout tomorrow from 10AM to 5PM. Plan accordingly!",
    likes: 32,
    comments: 14,
    category: "alerts"
  },
  {
    id: 3,
    user: {
      name: "Kavita Nair",
      avatar: "",
    },
    time: "Yesterday",
    content: "Our community garden project in Koramangala is looking for volunteers this weekend. If you have a green thumb or just want to help, please reach out!",
    likes: 24,
    comments: 6,
    category: "events"
  },
  {
    id: 4,
    user: {
      name: "Amit Patel",
      avatar: "",
    },
    time: "2 days ago",
    content: "I'm new to Bengaluru and looking to connect with people who enjoy cycling on weekends. Any cycling groups around Whitefield?",
    likes: 18,
    comments: 22,
    category: "discussions"
  }
];

const Community = () => {
  return (
    <div className="container py-8 animate-fade-in">
      <div className="flex flex-col gap-6">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Community Board</h1>
          <p className="text-muted-foreground">Engage with your local community, share updates and ask for recommendations</p>
        </div>

        <div className="flex gap-4">
          <div className="w-full lg:w-3/4 space-y-6">
            <Card className="shadow-sm">
              <CardHeader className="pb-4">
                <div className="flex gap-2">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                  </Avatar>
                  <Input placeholder="Share something with your community..." className="bg-muted" />
                </div>
              </CardHeader>
              <CardFooter className="pt-0 border-t flex justify-between">
                <div className="flex gap-2">
                  <Badge variant="outline">General</Badge>
                  <Badge variant="outline">Question</Badge>
                  <Badge variant="outline">Alert</Badge>
                </div>
                <Button>Post</Button>
              </CardFooter>
            </Card>

            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All Posts</TabsTrigger>
                <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
                <TabsTrigger value="alerts">Alerts</TabsTrigger>
                <TabsTrigger value="events">Events</TabsTrigger>
                <TabsTrigger value="discussions">Discussions</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4 mt-0">
                {communityPosts.map(post => (
                  <Card key={post.id} className="shadow-sm">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={post.user.avatar} alt={post.user.name} />
                            <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{post.user.name}</p>
                            <p className="text-xs text-muted-foreground">{post.time}</p>
                          </div>
                        </div>
                        <Badge>{post.category}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="py-2">
                      <p>{post.content}</p>
                    </CardContent>
                    <CardFooter className="pt-2 border-t flex justify-between">
                      <div className="flex gap-4">
                        <Button variant="ghost" size="sm" className="flex gap-1">
                          <Heart className="h-4 w-4" />
                          <span>{post.likes}</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="flex gap-1">
                          <MessageSquare className="h-4 w-4" />
                          <span>{post.comments}</span>
                        </Button>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Share className="h-4 w-4 mr-1" />
                        Share
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </TabsContent>
              
              <TabsContent value="recommendations" className="space-y-4 mt-0">
                {communityPosts
                  .filter(post => post.category === "recommendations")
                  .map(post => (
                    /* Same card structure as above */
                    <Card key={post.id} className="shadow-sm">
                      <CardHeader className="pb-2">
                        {/* ... content omitted for brevity ... */}
                        <div className="flex justify-between">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-10 w-10">
                              <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{post.user.name}</p>
                              <p className="text-xs text-muted-foreground">{post.time}</p>
                            </div>
                          </div>
                          <Badge>{post.category}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="py-2">
                        <p>{post.content}</p>
                      </CardContent>
                      <CardFooter className="pt-2 border-t flex justify-between">
                        <div className="flex gap-4">
                          <Button variant="ghost" size="sm" className="flex gap-1">
                            <Heart className="h-4 w-4" />
                            <span>{post.likes}</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="flex gap-1">
                            <MessageSquare className="h-4 w-4" />
                            <span>{post.comments}</span>
                          </Button>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Share className="h-4 w-4 mr-1" />
                          Share
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </TabsContent>
              
              {/* Other tab contents are similar but with filtered posts */}
              <TabsContent value="alerts" className="space-y-4 mt-0">
                {communityPosts
                  .filter(post => post.category === "alerts")
                  .map(post => (
                    <Card key={post.id} className="shadow-sm">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-10 w-10">
                              <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{post.user.name}</p>
                              <p className="text-xs text-muted-foreground">{post.time}</p>
                            </div>
                          </div>
                          <Badge>{post.category}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="py-2">
                        <p>{post.content}</p>
                      </CardContent>
                      <CardFooter className="pt-2 border-t flex justify-between">
                        <div className="flex gap-4">
                          <Button variant="ghost" size="sm" className="flex gap-1">
                            <Heart className="h-4 w-4" />
                            <span>{post.likes}</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="flex gap-1">
                            <MessageSquare className="h-4 w-4" />
                            <span>{post.comments}</span>
                          </Button>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Share className="h-4 w-4 mr-1" />
                          Share
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </TabsContent>
              <TabsContent value="events" className="space-y-4 mt-0">
                {communityPosts
                  .filter(post => post.category === "events")
                  .map(post => (
                    <Card key={post.id} className="shadow-sm">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-10 w-10">
                              <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{post.user.name}</p>
                              <p className="text-xs text-muted-foreground">{post.time}</p>
                            </div>
                          </div>
                          <Badge>{post.category}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="py-2">
                        <p>{post.content}</p>
                      </CardContent>
                      <CardFooter className="pt-2 border-t flex justify-between">
                        <div className="flex gap-4">
                          <Button variant="ghost" size="sm" className="flex gap-1">
                            <Heart className="h-4 w-4" />
                            <span>{post.likes}</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="flex gap-1">
                            <MessageSquare className="h-4 w-4" />
                            <span>{post.comments}</span>
                          </Button>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Share className="h-4 w-4 mr-1" />
                          Share
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </TabsContent>
              <TabsContent value="discussions" className="space-y-4 mt-0">
                {communityPosts
                  .filter(post => post.category === "discussions")
                  .map(post => (
                    <Card key={post.id} className="shadow-sm">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-10 w-10">
                              <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{post.user.name}</p>
                              <p className="text-xs text-muted-foreground">{post.time}</p>
                            </div>
                          </div>
                          <Badge>{post.category}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="py-2">
                        <p>{post.content}</p>
                      </CardContent>
                      <CardFooter className="pt-2 border-t flex justify-between">
                        <div className="flex gap-4">
                          <Button variant="ghost" size="sm" className="flex gap-1">
                            <Heart className="h-4 w-4" />
                            <span>{post.likes}</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="flex gap-1">
                            <MessageSquare className="h-4 w-4" />
                            <span>{post.comments}</span>
                          </Button>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Share className="h-4 w-4 mr-1" />
                          Share
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </TabsContent>
            </Tabs>
          </div>

          <div className="hidden lg:block w-1/4 space-y-6">
            <Card className="shadow-sm">
              <CardHeader>
                <h3 className="font-medium">Popular Topics</h3>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span>#WaterShortage</span>
                  <Badge variant="outline">32 posts</Badge>
                </div>
                <div className="flex justify-between">
                  <span>#LocalFestivals</span>
                  <Badge variant="outline">28 posts</Badge>
                </div>
                <div className="flex justify-between">
                  <span>#TrafficUpdates</span>
                  <Badge variant="outline">24 posts</Badge>
                </div>
                <div className="flex justify-between">
                  <span>#PowerOutage</span>
                  <Badge variant="outline">18 posts</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader>
                <h3 className="font-medium">Your Neighborhood</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm">Koramangala, Bengaluru</p>
                  <p className="text-xs text-muted-foreground">3,240 neighbors</p>
                  <div className="flex -space-x-2 mt-2">
                    {Array(5).fill(0).map((_, i) => (
                      <Avatar key={i} className="h-8 w-8 border-2 border-background">
                        <AvatarFallback className="text-xs">U{i+1}</AvatarFallback>
                      </Avatar>
                    ))}
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-muted text-xs">
                      +3.2k
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
