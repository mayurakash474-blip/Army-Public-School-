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
}

