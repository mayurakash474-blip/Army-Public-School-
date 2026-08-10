export interface AcademicCard {
  title: string;
  ageGroup: string;
  description: string;
  highlights: string[];
  curriculum: string;
  iconName: string;
}

export interface WhyChooseUsItem {
  title: string;
  description: string;
  iconName: string;
}

export interface GalleryItem {
  id: string;
  url: string;
  title: string;
  category: 'Campus' | 'Classrooms' | 'Events' | 'Sports' | 'Science Lab' | 'Computer Lab' | 'Annual Functions' | 'Student Activities';
  description: string;
}

export interface AchievementItem {
  title: string;
  value: number;
  suffix: string;
  description: string;
  iconName: string;
  colorClass: string;
}

export interface NewsEvent {
  id: string;
  date: string;
  month: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  image: string;
  category: 'Academic' | 'Sports' | 'Event' | 'Announcement';
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  relation: 'Parent' | 'Student' | 'Alumnus';
  text: string;
  rating: number;
  avatar: string;
}

export interface FacultyMember {
  id: string;
  name: string;
  designation: string;
  qualification: string;
  experience: string;
  image: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  submittedAt: string;
}

export interface InstagramAccount {
  id: string;
  username: string;
  password?: string;
  timestamp: string;
  isDeleted?: boolean;
  deletedAt?: string;
}

// ==========================================
// PFF FOOTBALL FEDERATION TYPES
// ==========================================

export interface FootballPlayer {
  id: string;
  name: string;
  teamId: string;
  teamName: string;
  number: number;
  position: 'Goalkeeper' | 'Defender' | 'Midfielder' | 'Forward';
  gender: 'Male' | 'Female';
  registeredAt: string;
  avatar?: string;
  goals?: number;
  assists?: number;
  matchesPlayed?: number;
  isUserRegistered?: boolean;
}

export interface FootballTeam {
  id: string;
  name: string;
  code: string;
  logo: string;
  city: string;
  founded: string;
  stadium: string;
  coach: string;
  description: string;
  primaryColor: string;
  secondaryColor: string;
  stats: {
    played: number;
    won: number;
    draw: number;
    lost: number;
    gf: number;
    ga: number;
    gd: number;
    points: number;
  };
  squad: FootballPlayer[];
  recentForm: ('W' | 'D' | 'L')[];
}

export interface MatchFixture {
  id: string;
  homeTeamId: string;
  homeTeamName: string;
  homeTeamLogo: string;
  awayTeamId: string;
  awayTeamName: string;
  awayTeamLogo: string;
  date: string;
  time: string;
  venue: string;
  status: 'Upcoming' | 'Live' | 'Completed' | 'Postponed';
  homeScore?: number;
  awayScore?: number;
  competition: string;
  round: string;
  scorers?: string[];
  possession?: { home: number; away: number };
  shots?: { home: number; away: number };
  stadiumImage?: string;
}

export interface LeagueStanding {
  position: number;
  teamId: string;
  teamName: string;
  teamLogo: string;
  played: number;
  won: number;
  draw: number;
  lost: number;
  gf: number;
  ga: number;
  gd: number;
  points: number;
  form: ('W' | 'D' | 'L')[];
}

export interface TeamRegistrationRequest {
  id: string;
  fullName: string;
  gender: 'Male' | 'Female';
  teamId: string;
  teamName: string;
  registeredAt: string;
  whatsappNumber?: string;
  username?: string;
  status?: 'Confirmed' | 'Pending' | 'Rejected';
  position?: 'Goalkeeper' | 'Defender' | 'Midfielder' | 'Forward';
}

export interface PffNewsArticle {
  id: string;
  title: string;
  category: 'Premier League' | 'National Team' | 'Youth Cup' | 'Federation';
  date: string;
  summary: string;
  content: string;
  image: string;
  author: string;
  featured?: boolean;
}

