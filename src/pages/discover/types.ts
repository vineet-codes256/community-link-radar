export type NearbyUser = {
  id: string;
  name: string;
  avatar: string;
  distance: number;
  formatted_distance: string;
  interests: string[];
  bio: string;
  latitude: number;
  longitude: number;
  matchPercentage: number;
  formatted_match: string;
};
