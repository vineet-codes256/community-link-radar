import React from 'react';
import { Users, MapPin } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';
import { NearbyUser } from './types';

interface UserCardProps {
  user: NearbyUser;
}

export const UserCard = React.memo(({ user }: UserCardProps) => {
  // Handle connect button click
  const handleConnect = (userId: string, userName: string) => {
    toast({
      title: 'Connection Request',
      description: `You've sent a connection request to ${userName}!`,
    });
    // In a real app, this would send a connection request to the backend
  };

  return (
    <Card className="h-full hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <Avatar className="h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <CardTitle className="text-base sm:text-lg truncate">{user.name}</CardTitle>
              <CardDescription className="flex items-center text-xs sm:text-sm">
                <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
                <span className="truncate">{user.formatted_distance}</span>
              </CardDescription>
            </div>
          </div>
          <Badge
            className={`flex-shrink-0 text-xs ${user.matchPercentage > 50 ? 'bg-green-500 hover:bg-green-600' : ''}`}
          >
            {user.formatted_match}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 sm:space-y-4 pt-0">
        <p
          className="text-xs sm:text-sm overflow-hidden"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: window.innerWidth < 640 ? 2 : 3,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {user.bio}
        </p>
        <div className="flex flex-wrap gap-1 sm:gap-1.5">
          {user.interests.slice(0, window.innerWidth < 640 ? 3 : 4).map((interest, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="text-xs px-2 py-0.5 sm:px-2.5 sm:py-1"
            >
              {interest}
            </Badge>
          ))}
          {user.interests.length > (window.innerWidth < 640 ? 3 : 4) && (
            <Badge variant="outline" className="text-xs px-2 py-0.5 sm:px-2.5 sm:py-1">
              +{user.interests.length - (window.innerWidth < 640 ? 3 : 4)}
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-3">
        <Button className="w-full text-sm h-9" onClick={() => handleConnect(user.id, user.name)}>
          <Users className="h-4 w-4 mr-2" />
          Connect
        </Button>
      </CardFooter>
    </Card>
  );
});
