import { NextResponse } from 'next/server';

// List of fun names for random selection
const names = [
  'Cosmic Explorer',
  'Pixel Pioneer',
  'Digital Dreamer',
  'Tech Wanderer',
  'Code Voyager',
  'Byte Buddy',
  'Data Dancer',
  'Web Whisperer',
  'Cloud Cruiser',
  'Binary Bard'
];

// List of fun avatars
const avatars = [
  'https://api.dicebear.com/7.x/bottts/svg?seed=1',
  'https://api.dicebear.com/7.x/bottts/svg?seed=2',
  'https://api.dicebear.com/7.x/bottts/svg?seed=3',
  'https://api.dicebear.com/7.x/bottts/svg?seed=4',
  'https://api.dicebear.com/7.x/bottts/svg?seed=5'
];

export async function GET() {
  const randomName = names[Math.floor(Math.random() * names.length)];
  const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];
  
  return new NextResponse(
    JSON.stringify({
      user: {
        name: randomName,
        image: randomAvatar,
        id: Math.random().toString(36).substring(7)
      }
    }),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
} 