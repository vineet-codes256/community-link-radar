import { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/use-auth';
import {
  calculateDistance,
  formatDistance,
  calculateInterestMatch,
  formatMatchPercentage,
} from '@/utils/locationUtils';
import { NearbyUser } from './types';

type ProfileData = {
  id: string;
  full_name: string | null;
  username: string | null;
  avatar_url: string | null;
  bio?: string;
  interests?: string[];
};

// Mock users data for development and testing
const mockUsers = [
  {
    name: 'Vineet Rawat',
    username: 'vineet_rawat',
    bio: 'Software developer passionate about React and TypeScript',
    interests: ['Technology', 'Coding', 'React'],
  },
  {
    name: 'Suneet Rawat',
    username: 'suneet_rawat',
    bio: 'Full-stack developer with a love for open source',
    interests: ['JavaScript', 'Node.js', 'Open Source'],
  },
  {
    name: 'Yash Bisht',
    username: 'yash_bisht',
    bio: 'UI/UX designer creating beautiful user experiences',
    interests: ['Design', 'UI/UX', 'Figma'],
  },
  {
    name: 'Akhil Panwar',
    username: 'akhil_panwar',
    bio: 'DevOps engineer automating the cloud',
    interests: ['DevOps', 'AWS', 'Docker'],
  },
  {
    name: 'Ali Sayed',
    username: 'ali_sayed',
    bio: 'Mobile app developer specializing in React Native',
    interests: ['Mobile', 'React Native', 'iOS'],
  },
  {
    name: 'Junaid Ansari',
    username: 'junaid_ansari',
    bio: 'Backend developer with expertise in Python and Django',
    interests: ['Python', 'Django', 'Backend'],
  },
  {
    name: 'Adil Shaikh',
    username: 'adil_shaikh',
    bio: 'Data scientist analyzing trends and patterns',
    interests: ['Data Science', 'Python', 'Machine Learning'],
  },
  {
    name: 'Harsh Sharma',
    username: 'harsh_sharma',
    bio: 'Frontend developer crafting responsive web applications',
    interests: ['Frontend', 'CSS', 'JavaScript'],
  },
  {
    name: 'Sooraj B.',
    username: 'sooraj_b',
    bio: 'Product manager bridging technology and business',
    interests: ['Product Management', 'Agile', 'Strategy'],
  },
  {
    name: 'Manish Kumar',
    username: 'manish_kumar',
    bio: 'Database administrator ensuring data integrity',
    interests: ['Databases', 'SQL', 'PostgreSQL'],
  },
  {
    name: 'Jagdamba Prasad',
    username: 'jagdamba_prasad',
    bio: 'System architect designing scalable solutions',
    interests: ['Architecture', 'System Design', 'Scalability'],
  },
  {
    name: 'Rajiv Kumar',
    username: 'rajiv_kumar',
    bio: 'Quality assurance engineer ensuring product excellence',
    interests: ['QA', 'Testing', 'Automation'],
  },
  {
    name: 'Anil K',
    username: 'anil_k',
    bio: 'Security specialist protecting digital assets',
    interests: ['Cybersecurity', 'Security', 'Ethical Hacking'],
  },
  {
    name: 'Raghav K',
    username: 'raghav_k',
    bio: 'Cloud engineer managing infrastructure',
    interests: ['Cloud', 'AWS', 'Infrastructure'],
  },
  {
    name: 'Madhav K',
    username: 'madhav_k',
    bio: 'AI/ML engineer building intelligent systems',
    interests: ['AI', 'Machine Learning', 'TensorFlow'],
  },
  {
    name: 'Rohit G',
    username: 'rohit_g',
    bio: 'Blockchain developer creating decentralized solutions',
    interests: ['Blockchain', 'Ethereum', 'Smart Contracts'],
  },
  {
    name: 'Mohit Singh',
    username: 'mohit_singh',
    bio: 'Game developer bringing virtual worlds to life',
    interests: ['Game Development', 'Unity', 'C#'],
  },
  {
    name: 'Amin Memon',
    username: 'amin_memon',
    bio: 'Network engineer connecting the digital world',
    interests: ['Networking', 'Cisco', 'Infrastructure'],
  },
  // Additional randomized combinations
  {
    name: 'Vineet Sharma',
    username: 'vineet_sharma',
    bio: 'Creative developer blending art and technology',
    interests: ['Creative Coding', 'WebGL', 'Three.js'],
  },
  {
    name: 'Suneet Kumar',
    username: 'suneet_kumar',
    bio: 'Mobile developer creating cross-platform apps',
    interests: ['Flutter', 'Dart', 'Cross-platform'],
  },
  {
    name: 'Yash Rawat',
    username: 'yash_rawat',
    bio: 'Data engineer building data pipelines',
    interests: ['Data Engineering', 'ETL', 'Apache Spark'],
  },
  {
    name: 'Akhil Singh',
    username: 'akhil_singh',
    bio: 'DevOps specialist automating deployments',
    interests: ['CI/CD', 'Jenkins', 'Kubernetes'],
  },
  {
    name: 'Ali Ansari',
    username: 'ali_ansari',
    bio: 'Full-stack developer with MERN expertise',
    interests: ['MERN', 'MongoDB', 'Express.js'],
  },
  {
    name: 'Junaid Shaikh',
    username: 'junaid_shaikh',
    bio: 'Frontend architect leading development teams',
    interests: ['Leadership', 'React', 'Team Management'],
  },
  {
    name: 'Adil Panwar',
    username: 'adil_panwar',
    bio: 'Backend specialist in microservices',
    interests: ['Microservices', 'Spring Boot', 'Java'],
  },
  {
    name: 'Harsh Bisht',
    username: 'harsh_bisht',
    bio: 'UX researcher understanding user behavior',
    interests: ['UX Research', 'User Testing', 'Psychology'],
  },
  {
    name: 'Sooraj Kumar',
    username: 'sooraj_kumar',
    bio: 'Technical writer documenting complex systems',
    interests: ['Technical Writing', 'Documentation', 'API Design'],
  },
  {
    name: 'Manish Rawat',
    username: 'manish_rawat',
    bio: 'Performance engineer optimizing applications',
    interests: ['Performance', 'Optimization', 'Monitoring'],
  },
  {
    name: 'Jagdamba Singh',
    username: 'jagdamba_singh',
    bio: 'Scrum master facilitating agile teams',
    interests: ['Agile', 'Scrum', 'Team Facilitation'],
  },
  {
    name: 'Rajiv Sharma',
    username: 'rajiv_sharma',
    bio: 'Solutions architect designing enterprise systems',
    interests: ['Enterprise Architecture', 'SOA', 'Integration'],
  },
  {
    name: 'Anil Prasad',
    username: 'anil_prasad',
    bio: 'Penetration tester securing applications',
    interests: ['Penetration Testing', 'Security', 'Vulnerability Assessment'],
  },
  {
    name: 'Raghav Singh',
    username: 'raghav_singh',
    bio: 'Site reliability engineer ensuring uptime',
    interests: ['SRE', 'Reliability', 'Monitoring'],
  },
  {
    name: 'Madhav Kumar',
    username: 'madhav_kumar',
    bio: 'NLP engineer processing human language',
    interests: ['NLP', 'Python', 'Transformers'],
  },
  {
    name: 'Rohit Ansari',
    username: 'rohit_ansari',
    bio: 'IoT developer connecting physical devices',
    interests: ['IoT', 'Embedded Systems', 'Arduino'],
  },
  {
    name: 'Mohit Rawat',
    username: 'mohit_rawat',
    bio: 'AR/VR developer creating immersive experiences',
    interests: ['AR/VR', 'Unity', 'Oculus'],
  },
  {
    name: 'Amin Sayed',
    username: 'amin_sayed',
    bio: 'API developer building robust interfaces',
    interests: ['API Development', 'REST', 'GraphQL'],
  },
];

export const useNearbyUsers = (
  currentLocation: { latitude: number; longitude: number } | null,
  searchRadius: number[],
  searchTerm: string,
  sortBy: 'distance' | 'match'
) => {
  const { user } = useAuth();
  const [nearbyUsers, setNearbyUsers] = useState<NearbyUser[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch nearby users based on current location and search radius
  useEffect(() => {
    const fetchNearbyUsers = async () => {
      if (!currentLocation || !user) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        // TODO: Optimize by moving distance filtering to server-side using PostGIS RPC function
        // Create a Supabase RPC function 'get_nearby_users' for better performance
        // This will reduce client-side computation and data transfer
        // Get current user's interests - default to empty array if not available
        const { data: currentUserData } = await supabase
          .from('profiles')
          .select('interests, bio') // Selecting specific fields
          .eq('id', user.id)
          .single();

        const userInterests = (currentUserData as unknown as ProfileData)?.interests || [];

        // Get all user locations and then filter by distance
        const { data: allLocations, error } = await supabase
          .from('user_locations')
          .select(
            `
            *,
            profiles!user_locations_user_id_fkey (
              id,
              full_name,
              username,
              avatar_url,
              bio,
              interests
            )
          `
          )
          .neq('user_id', user.id) // Exclude current user
          .eq('is_visible', true);

        if (error) {
          console.error('Error fetching locations:', error);
          setLoading(false);
          return;
        }

        if (!allLocations || allLocations.length === 0) {
          // Use mock users for development when no real users are found
          const mockNearbyUsers: NearbyUser[] = mockUsers.map((mockUser, index) => {
            // Generate random locations near the current location for mock users
            const randomLat = (currentLocation?.latitude || 12.9716) + (Math.random() - 0.5) * 0.1;
            const randomLng = (currentLocation?.longitude || 77.5946) + (Math.random() - 0.5) * 0.1;
            const distance = calculateDistance(
              currentLocation?.latitude || 12.9716,
              currentLocation?.longitude || 77.5946,
              randomLat,
              randomLng
            );

            // Calculate interest match with current user's interests
            const matchPercentage = calculateInterestMatch(userInterests, mockUser.interests);

            return {
              id: `mock-${index + 1}`,
              name: mockUser.name,
              avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${mockUser.username}`,
              distance,
              formatted_distance: formatDistance(distance),
              interests: mockUser.interests,
              bio: mockUser.bio,
              latitude: randomLat,
              longitude: randomLng,
              matchPercentage,
              formatted_match: formatMatchPercentage(matchPercentage),
            };
          });

          // Filter by search radius and sort
          const filteredMockUsers = mockNearbyUsers.filter(
            user => user.distance <= searchRadius[0]
          );
          const sortedMockUsers = [...filteredMockUsers].sort((a, b) => {
            if (sortBy === 'distance') {
              return a.distance - b.distance;
            } else {
              return b.matchPercentage - a.matchPercentage;
            }
          });

          setNearbyUsers(sortedMockUsers);
          setLoading(false);
          return;
        }

        // Calculate distance and filter by radius
        const usersWithDistance = allLocations
          .map(loc => {
            const distance = calculateDistance(
              currentLocation.latitude,
              currentLocation.longitude,
              loc.latitude,
              loc.longitude
            );

            // Calculate interest match percentage
            const profileData = loc.profiles as unknown as ProfileData;
            // Default to empty array if interests don't exist
            const otherInterests = profileData?.interests || [];
            const matchPercentage = calculateInterestMatch(userInterests, otherInterests);

            return {
              id: profileData?.id || '',
              name: profileData?.full_name || 'Unnamed User',
              avatar: profileData?.avatar_url || '',
              distance,
              formatted_distance: formatDistance(distance),
              interests: otherInterests,
              bio: profileData?.bio || `User near ${profileData?.username || 'unknown location'}`,
              latitude: loc.latitude,
              longitude: loc.longitude,
              matchPercentage,
              formatted_match: formatMatchPercentage(matchPercentage),
            };
          })
          .filter(user => user.distance <= searchRadius[0]);

        // Sort users based on selected sort criteria
        const sortedUsers = [...usersWithDistance].sort((a, b) => {
          if (sortBy === 'distance') {
            return a.distance - b.distance;
          } else {
            return b.matchPercentage - a.matchPercentage;
          }
        });

        setNearbyUsers(sortedUsers);
      } catch (err) {
        console.error('Error processing nearby users:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNearbyUsers();
  }, [currentLocation, searchRadius, user, sortBy]);

  // Filter users based on search term
  const filteredUsers = useMemo(
    () =>
      nearbyUsers.filter(
        user =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.interests.some(interest =>
            interest.toLowerCase().includes(searchTerm.toLowerCase())
          ) ||
          user.bio.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [nearbyUsers, searchTerm]
  );

  return { nearbyUsers: filteredUsers, loading };
};
