import { ImageSourcePropType } from 'react-native';

export type GroupMember = {
  id: string;
  name: string;
  role: string;
  avatar: string;
  spent: number;
};

export type GroupStat = {
  label: string;
  value: string;
  hint?: string;
};

export type TravelGroup = {
  id: string;
  name: string;
  creator: string;
  destination: string;
  description: string;
  banner: ImageSourcePropType;
  totalExpense: number;
  yourShare: number;
  members: GroupMember[];
  stats: GroupStat[];
};

export const groups: TravelGroup[] = [
  {
    id: 'friends-getaway',
    name: 'Friends Getaway',
    creator: 'Sofia Patel',
    destination: 'Lake Tahoe',
    description: 'A long-weekend cabin escape packed with snow hikes, hot cocoa, and board games.',
    banner: require('@/assets/images/react-logo.png'),
    totalExpense: 1860.5,
    yourShare: 248.75,
    members: [
      {
        id: '1',
        name: 'Sofia Patel',
        role: 'Organizer',
        avatar: 'https://i.pravatar.cc/150?img=4',
        spent: 720.25,
      },
      {
        id: '2',
        name: 'Marcus Lee',
        role: 'Logistics',
        avatar: 'https://i.pravatar.cc/150?img=12',
        spent: 410.0,
      },
      {
        id: '3',
        name: 'Naomi Carter',
        role: 'Photographer',
        avatar: 'https://i.pravatar.cc/150?img=31',
        spent: 380.75,
      },
      {
        id: '4',
        name: 'You',
        role: 'Finance',
        avatar: 'https://i.pravatar.cc/150?img=47',
        spent: 349.5,
      },
    ],
    stats: [
      { label: 'Stay & Travel', value: '$980.00', hint: 'Cabin + car rentals' },
      { label: 'Food & Dining', value: '$520.25', hint: 'Groceries + brunch' },
      { label: 'Activities', value: '$360.25', hint: 'Ski passes & tours' },
    ],
  },
  {
    id: 'bali-retreat',
    name: 'Bali Retreat',
    creator: 'Jonas Müller',
    destination: 'Ubud, Bali',
    description: 'Remote work meets island hopping. Daily surf lessons, coworking and sunset dinners.',
    banner: require('@/assets/images/partial-react-logo.png'),
    totalExpense: 3120.95,
    yourShare: 640.2,
    members: [
      {
        id: '5',
        name: 'Jonas Müller',
        role: 'Organizer',
        avatar: 'https://i.pravatar.cc/150?img=14',
        spent: 1020.0,
      },
      {
        id: '6',
        name: 'Fatima Noor',
        role: 'Wellness lead',
        avatar: 'https://i.pravatar.cc/150?img=22',
        spent: 820.4,
      },
      {
        id: '7',
        name: 'You',
        role: 'Finance',
        avatar: 'https://i.pravatar.cc/150?img=48',
        spent: 640.2,
      },
      {
        id: '8',
        name: 'Lucas Almeida',
        role: 'Chef',
        avatar: 'https://i.pravatar.cc/150?img=7',
        spent: 640.35,
      },
    ],
    stats: [
      { label: 'Villas & stays', value: '$1,420.00', hint: 'Two villas · 7 nights' },
      { label: 'Experiences', value: '$960.50', hint: 'Surf, yoga, temples' },
      { label: 'Dining', value: '$740.45', hint: 'Daily shared meals' },
    ],
  },
];

export const getGroupById = (id?: string | string[]) => {
  if (!id) return undefined;
  const normalized = Array.isArray(id) ? id[0] : id;
  return groups.find((group) => group.id === normalized);
};

