import { MessageSquare, Heart, Share, User, Search } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useMemo, useCallback, memo } from 'react';

// Mock data for community posts
const communityPosts = [
  {
    id: 1,
    user: {
      name: 'Deepa Verma',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=deepa_verma',
    },
    time: '2 hours ago',
    content:
      'Does anyone know a good interior designer in Indiranagar? Looking to renovate my apartment.',
    likes: 12,
    comments: 8,
    category: 'recommendations',
  },
  {
    id: 2,
    user: {
      name: 'Rohan Joshi',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rohan_joshi',
    },
    time: '5 hours ago',
    content:
      "Heads up everyone! There's a water shortage expected in HSR Layout tomorrow from 10AM to 5PM. Plan accordingly!",
    likes: 32,
    comments: 14,
    category: 'alerts',
  },
  {
    id: 3,
    user: {
      name: 'Kavita Nair',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=kavita_nair',
    },
    time: 'Yesterday',
    content:
      'Our community garden project in Koramangala is looking for volunteers this weekend. If you have a green thumb or just want to help, please reach out!',
    likes: 24,
    comments: 6,
    category: 'events',
  },
  {
    id: 4,
    user: {
      name: 'Amit Patel',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=amit_patel',
    },
    time: '2 days ago',
    content:
      "I'm new to Bengaluru and looking to connect with people who enjoy cycling on weekends. Any cycling groups around Whitefield?",
    likes: 18,
    comments: 22,
    category: 'discussions',
  },
  {
    id: 5,
    user: {
      name: 'Vineet Rawat',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=vineet_rawat',
    },
    time: '3 hours ago',
    content:
      'Just discovered an amazing coffee shop in JP Nagar! The ambiance is perfect for remote work. Highly recommend checking out "Brew & Code" if you\'re in the area.',
    likes: 28,
    comments: 15,
    category: 'recommendations',
  },
  {
    id: 6,
    user: {
      name: 'Suneet Rawat',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=suneet_rawat',
    },
    time: '6 hours ago',
    content:
      'Power outage alert: Areas around Marathahalli and Bellandur will experience scheduled maintenance from 2AM to 6AM tonight. Please plan accordingly.',
    likes: 45,
    comments: 9,
    category: 'alerts',
  },
  {
    id: 7,
    user: {
      name: 'Yash Bisht',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=yash_bisht',
    },
    time: '8 hours ago',
    content:
      'Tech meetup this Friday at ThoughtWorks! Topics include React 19 updates, AI in web development, and career opportunities. Free pizza and networking. Link in bio!',
    likes: 67,
    comments: 23,
    category: 'events',
  },
  {
    id: 8,
    user: {
      name: 'Akhil Panwar',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=akhil_panwar',
    },
    time: '1 day ago',
    content:
      'Looking for recommendations on good gyms in Koramangala. I prefer ones with proper equipment and not too crowded. Any suggestions?',
    likes: 19,
    comments: 31,
    category: 'recommendations',
  },
  {
    id: 9,
    user: {
      name: 'Ali Sayed',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ali_sayed',
    },
    time: '1 day ago',
    content:
      'Traffic advisory: MG Road will be closed for the next 3 days due to metro construction. Alternative routes: Brigade Road or Residency Road.',
    likes: 38,
    comments: 12,
    category: 'alerts',
  },
  {
    id: 10,
    user: {
      name: 'Junaid Ansari',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=junaid_ansari',
    },
    time: '2 days ago',
    content:
      "Python developers meetup! We're organizing a workshop on Django 5.0 new features. Whether you're a beginner or expert, everyone is welcome. Saturday afternoon.",
    likes: 52,
    comments: 18,
    category: 'events',
  },
  {
    id: 11,
    user: {
      name: 'Adil Shaikh',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=adil_shaikh',
    },
    time: '2 days ago',
    content:
      'Anyone interested in forming a badminton group? I play regularly and would love to find consistent partners. Weekends work best for me.',
    likes: 34,
    comments: 27,
    category: 'discussions',
  },
  {
    id: 12,
    user: {
      name: 'Harsh Sharma',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=harsh_sharma',
    },
    time: '3 days ago',
    content:
      'Found a great deal on fresh organic vegetables at the market in Jayanagar 4th Block. Much cheaper than supermarkets and way fresher!',
    likes: 41,
    comments: 16,
    category: 'recommendations',
  },
  {
    id: 13,
    user: {
      name: 'Sooraj B.',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sooraj_b',
    },
    time: '3 days ago',
    content:
      'Weather update: Heavy rainfall expected in South Bangalore tomorrow. Please drive carefully and avoid low-lying areas.',
    likes: 29,
    comments: 7,
    category: 'alerts',
  },
  {
    id: 14,
    user: {
      name: 'Manish Kumar',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=manish_kumar',
    },
    time: '4 days ago',
    content:
      "Photography enthusiasts! Join our group photo walk this Sunday morning. We'll explore the beautiful streets of Basavanagudi. All skill levels welcome.",
    likes: 48,
    comments: 22,
    category: 'events',
  },
  {
    id: 15,
    user: {
      name: 'Jagdamba Prasad',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jagdamba_prasad',
    },
    time: '4 days ago',
    content:
      "What are your favorite restaurants for authentic South Indian food? I'm looking for places that serve traditional meals, not just touristy spots.",
    likes: 26,
    comments: 35,
    category: 'discussions',
  },
  {
    id: 16,
    user: {
      name: 'Rajiv Kumar',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rajiv_kumar',
    },
    time: '5 days ago',
    content:
      'Excellent pediatrician recommendation: Dr. Sharma at Cloudnine Hospital. Very patient, explains everything clearly, and great with kids.',
    likes: 33,
    comments: 11,
    category: 'recommendations',
  },
  {
    id: 17,
    user: {
      name: 'Anil K',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=anil_k',
    },
    time: '5 days ago',
    content:
      'Road construction alert: 100 Feet Road will be partially closed for the next week. Expect delays during peak hours.',
    likes: 37,
    comments: 8,
    category: 'alerts',
  },
  {
    id: 18,
    user: {
      name: 'Raghav K',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=raghav_k',
    },
    time: '6 days ago',
    content:
      'Startup networking event tomorrow! Founders, developers, and investors welcome. Great opportunity to connect and learn about the local startup ecosystem.',
    likes: 71,
    comments: 29,
    category: 'events',
  },
  {
    id: 19,
    user: {
      name: 'Madhav K',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=madhav_k',
    },
    time: '6 days ago',
    content:
      'Book club forming! We\'re starting with "The Alchemist" by Paulo Coelho. If you love reading and discussing books, this is for you.',
    likes: 43,
    comments: 24,
    category: 'discussions',
  },
  {
    id: 20,
    user: {
      name: 'Rohit G',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rohit_g',
    },
    time: '1 week ago',
    content:
      'Best auto mechanic in Rajajinagar? My car needs some work and I want someone reliable and honest. Any recommendations?',
    likes: 22,
    comments: 19,
    category: 'recommendations',
  },
];

interface PostCardProps {
  post: (typeof communityPosts)[0];
}

const PostCard = memo(({ post }: PostCardProps) => {
  const handleLike = useCallback(() => {
    // Handle like functionality
  }, []);

  const handleComment = useCallback(() => {
    // Handle comment functionality
  }, []);

  const handleShare = useCallback(() => {
    // Handle share functionality
  }, []);

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
          <div className="flex items-center gap-2">
            <Avatar className="h-10 w-10 flex-shrink-0">
              <AvatarImage src={post.user.avatar} alt={post.user.name} />
              <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="font-medium truncate">{post.user.name}</p>
              <p className="text-xs text-muted-foreground">{post.time}</p>
            </div>
          </div>
          <Badge className="self-start sm:self-center">{post.category}</Badge>
        </div>
      </CardHeader>
      <CardContent className="py-2">
        <p className="text-sm sm:text-base leading-relaxed">{post.content}</p>
      </CardContent>
      <CardFooter className="pt-2 border-t flex flex-col sm:flex-row gap-2 sm:justify-between">
        <div className="flex gap-4 w-full sm:w-auto justify-center sm:justify-start">
          <Button
            variant="ghost"
            size="sm"
            className="flex gap-1 flex-1 sm:flex-none"
            onClick={handleLike}
          >
            <Heart className="h-4 w-4" />
            <span className="text-xs sm:text-sm">{post.likes}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex gap-1 flex-1 sm:flex-none"
            onClick={handleComment}
          >
            <MessageSquare className="h-4 w-4" />
            <span className="text-xs sm:text-sm">{post.comments}</span>
          </Button>
        </div>
        <Button variant="ghost" size="sm" className="w-full sm:w-auto" onClick={handleShare}>
          <Share className="h-4 w-4 mr-1" />
          <span className="hidden sm:inline">Share</span>
        </Button>
      </CardFooter>
    </Card>
  );
});

const Community = () => {
  const filteredPosts = useMemo(
    () => ({
      all: communityPosts,
      recommendations: communityPosts.filter(post => post.category === 'recommendations'),
      alerts: communityPosts.filter(post => post.category === 'alerts'),
      events: communityPosts.filter(post => post.category === 'events'),
      discussions: communityPosts.filter(post => post.category === 'discussions'),
    }),
    []
  );

  const handlePost = useCallback(() => {
    // Handle new post functionality
  }, []);
  return (
    <div className="container py-8 animate-fade-in">
      <div className="flex flex-col gap-6">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Community Board</h1>
          <p className="text-muted-foreground">
            Engage with your local community, share updates and ask for recommendations
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-4">
          <div className="w-full lg:w-3/4 space-y-6">
            <Card className="shadow-sm">
              <CardHeader className="pb-4">
                <div className="flex flex-col sm:flex-row gap-2">
                  <Avatar className="h-10 w-10 flex-shrink-0">
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <Input
                    placeholder="Share something with your community..."
                    className="bg-muted flex-1"
                  />
                </div>
              </CardHeader>
              <CardFooter className="pt-0 border-t flex flex-col sm:flex-row gap-2 sm:justify-between">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">General</Badge>
                  <Badge variant="outline">Question</Badge>
                  <Badge variant="outline">Alert</Badge>
                </div>
                <Button onClick={handlePost} className="w-full sm:w-auto">
                  Post
                </Button>
              </CardFooter>
            </Card>

            <Tabs defaultValue="all">
              <TabsList className="mb-4 grid w-full grid-cols-3 lg:grid-cols-5 h-auto">
                <TabsTrigger value="all" className="text-xs sm:text-sm">
                  All
                </TabsTrigger>
                <TabsTrigger value="recommendations" className="text-xs sm:text-sm">
                  Recs
                </TabsTrigger>
                <TabsTrigger value="alerts" className="text-xs sm:text-sm">
                  Alerts
                </TabsTrigger>
                <TabsTrigger value="events" className="text-xs sm:text-sm hidden lg:inline-flex">
                  Events
                </TabsTrigger>
                <TabsTrigger
                  value="discussions"
                  className="text-xs sm:text-sm hidden lg:inline-flex"
                >
                  Discussions
                </TabsTrigger>
              </TabsList>

              {/* Mobile dropdown for Events and Discussions */}
              <div className="lg:hidden mb-4">
                <select className="w-full p-2 border rounded-md bg-background">
                  <option value="events">Events</option>
                  <option value="discussions">Discussions</option>
                </select>
              </div>

              <TabsContent value="all" className="space-y-4 mt-0">
                {filteredPosts.all.map(post => (
                  <PostCard key={post.id} post={post} />
                ))}
              </TabsContent>

              <TabsContent value="recommendations" className="space-y-4 mt-0">
                {filteredPosts.recommendations.map(post => (
                  <PostCard key={post.id} post={post} />
                ))}
              </TabsContent>

              <TabsContent value="alerts" className="space-y-4 mt-0">
                {filteredPosts.alerts.map(post => (
                  <PostCard key={post.id} post={post} />
                ))}
              </TabsContent>
              <TabsContent value="events" className="space-y-4 mt-0">
                {filteredPosts.events.map(post => (
                  <PostCard key={post.id} post={post} />
                ))}
              </TabsContent>
              <TabsContent value="discussions" className="space-y-4 mt-0">
                {filteredPosts.discussions.map(post => (
                  <PostCard key={post.id} post={post} />
                ))}
              </TabsContent>
            </Tabs>
          </div>

          <div className="w-full lg:w-1/4 space-y-6 order-first lg:order-last">
            <Card className="shadow-sm">
              <CardHeader>
                <h3 className="font-medium">Popular Topics</h3>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">#WaterShortage</span>
                  <Badge variant="outline" className="text-xs">
                    32 posts
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">#LocalFestivals</span>
                  <Badge variant="outline" className="text-xs">
                    28 posts
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">#TrafficUpdates</span>
                  <Badge variant="outline" className="text-xs">
                    24 posts
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">#PowerOutage</span>
                  <Badge variant="outline" className="text-xs">
                    18 posts
                  </Badge>
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
                  <div className="flex -space-x-2 mt-2 overflow-hidden">
                    <Avatar className="h-8 w-8 border-2 border-background">
                      <AvatarImage
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=vineet_rawat`}
                      />
                      <AvatarFallback className="text-xs">VR</AvatarFallback>
                    </Avatar>
                    <Avatar className="h-8 w-8 border-2 border-background">
                      <AvatarImage
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=suneet_rawat`}
                      />
                      <AvatarFallback className="text-xs">SR</AvatarFallback>
                    </Avatar>
                    <Avatar className="h-8 w-8 border-2 border-background">
                      <AvatarImage
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=yash_bisht`}
                      />
                      <AvatarFallback className="text-xs">YB</AvatarFallback>
                    </Avatar>
                    <Avatar className="h-8 w-8 border-2 border-background">
                      <AvatarImage
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=akhil_panwar`}
                      />
                      <AvatarFallback className="text-xs">AP</AvatarFallback>
                    </Avatar>
                    <Avatar className="h-8 w-8 border-2 border-background">
                      <AvatarImage
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=ali_sayed`}
                      />
                      <AvatarFallback className="text-xs">AS</AvatarFallback>
                    </Avatar>
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-muted text-xs border-2 border-background">
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
