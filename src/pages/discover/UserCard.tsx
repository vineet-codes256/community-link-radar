
import { Users, MapPin } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import { NearbyUser } from "./types";

interface UserCardProps {
  user: NearbyUser;
}

export const UserCard = ({ user }: UserCardProps) => {
  // Handle connect button click
  const handleConnect = (userId: string, userName: string) => {
    toast({
      title: "Connection Request",
      description: `You've sent a connection request to ${userName}!`
    });
    // In a real app, this would send a connection request to the backend
  };

  return (
    <Card className="h-full hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-lg">{user.name}</CardTitle>
          <CardDescription className="flex items-center">
            <MapPin className="h-3 w-3 mr-1" /> {user.formatted_distance}
          </CardDescription>
        </div>
        <Badge 
          className={`ml-auto ${user.matchPercentage > 50 ? 'bg-green-500 hover:bg-green-600' : ''}`}
        >
          {user.formatted_match}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm">{user.bio}</p>
        <div className="flex flex-wrap gap-2">
          {user.interests.map(interest => (
            <Badge key={interest} variant="secondary">{interest}</Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={() => handleConnect(user.id, user.name)}
        >
          <Users className="h-4 w-4 mr-2" />
          Connect
        </Button>
      </CardFooter>
    </Card>
  );
};
