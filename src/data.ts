export const schoolLogoUrl = 'https://lh3.googleusercontent.com/d/1Ndh9Wh8__eAiI6pZ-4gdYCA6srbs-GCq';
export const heroCampus = 'https://lh3.googleusercontent.com/d/1hBSStqJgsCXgVT7zmK_0cqkHMnFFxao0';
export const sportsActivities = 'https://lh3.googleusercontent.com/d/1KsWCICCV2huoTeC1vVKZulTZ8t_GK7lA';
export const scienceLab = 'https://lh3.googleusercontent.com/d/1KsWCICCV2huoTeC1vVKZulTZ8t_GK7lA';
export const principalPortrait = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&h=350&q=80';

import { AcademicCard, WhyChooseUsItem, GalleryItem, AchievementItem, NewsEvent, Testimonial, FacultyMember } from './types';

export const schoolContact = {
  phone: '+92 5813-455244',
  altPhone: '+92 5813-455245',
  email: 'info@apsaliabadhunza.edu.pk',
  admissionsEmail: 'admissions@apsaliabadhunza.edu.pk',
  address: 'Army Public School Campus, Aliabad, Hunza, Gilgit-Baltistan, Pakistan',
  officeHours: 'Monday - Friday: 08:00 AM - 02:30 PM | Saturday: 08:00 AM - 01:00 PM',
  social: {
    facebook: 'https://facebook.com/apsaliabadhunza',
    twitter: 'https://twitter.com/apsaliabadhunza',
    youtube: 'https://youtube.com/apsaliabadhunza',
    instagram: 'https://instagram.com/apsaliabadhunza'
  },
  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12976.223403248358!2d74.61517452631527!3d36.311394553258835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38e899988fc7c0db%3A0xe9db4eb97d748f6!2sAliabad%2C%20Hunza!5e0!3m2!1sen!2spk!4v1700000000000!5m2!1sen!2spk'
};

export const aboutContent = {
  introduction: 'Army Public School Aliabad Hunza stands as a beacon of academic excellence and character building in the heart of the majestic Hunza Valley, Gilgit-Baltistan. Established under the aegis of the Pakistan Army, our institution is dedicated to nurturing young minds with standard education, rigorous self-discipline, and deep ethical values.',
  vision: 'To prepare future leaders of Pakistan who are intellectually outstanding, morally upright, physically robust, and capable of steering the nation toward innovation and global success.',
  mission: 'To provide a stimulating learning environment where quality instruction, discipline, technology integration, and extensive co-curricular programs combine to foster critical thinking, physical stamina, and community service.',
  coreValues: [
    { title: 'Discipline', description: 'Nurturing self-restraint, respect for authority, and structured time-management.' },
    { title: 'Excellence', description: 'Striving for highest quality in academics, technology, and sports.' },
    { title: 'Honor', description: 'Upholding honesty, patriotic devotion, and high moral integrity.' },
    { title: 'Innovation', description: 'Promoting analytical inquiry, STEM discovery, and digital mastery.' }
  ]
};

export const principalMessage = {
  name: 'Lt. Col (Retd) Tariq Baig',
  designation: 'Principal, Army Public School Aliabad Hunza',
  image: principalPortrait,
  welcomeText: 'Welcome to Army Public School Aliabad Hunza, a place where young dreams are anchored in discipline and propelled by intellectual excellence.',
  message: 'As the Principal, it is my absolute privilege to lead this outstanding institution nestled in the scenic valleys of Hunza. Our goal goes beyond typical textbook memorization. We are dedicated to the holistic training of our students. We combine top-tier federal board sciences with leadership coaching, computer programming, physical fitness, and public speaking.\n\nWe understand that Gilgit-Baltistan is rich with raw talent. By providing modern facilities—from our high-tech laboratories to our competitive sports programs—we ensure our students are ready to enter Pakistan’s top medical, engineering, and digital universities with pride. I invite you to join our disciplined, warm, and highly motivated academic community.',
  signatureText: 'Education is the ultimate defense of a progressive nation.'
};

export const academicsCards: AcademicCard[] = [
  {
    title: 'Pre School',
    ageGroup: 'Ages 3 - 5 Years (Playgroup, Nursery, Prep)',
    description: 'A vibrant, play-based early childhood education program focusing on cognitive growth, fine motor skills, language, and social behaviors in a safe, warm environment.',
    highlights: ['Activity-based Montessori classrooms', 'Phonics & early literacy training', 'Art, crafts, and interactive storytelling', 'Social skills & self-grooming'],
    curriculum: 'Modern Early Years Foundation Stage (EYFS) blended with localized values.',
    iconName: 'Baby'
  },
  {
    title: 'Primary School',
    ageGroup: 'Ages 6 - 10 Years (Class I to V)',
    description: 'Laying powerful foundational concepts in core subjects. Students are encouraged to explore scientific concepts, bilingual reading, arithmetic, and basic computational thinking.',
    highlights: ['Bilingual fluency (English & Urdu)', 'Conceptual Mathematics & Science clubs', 'Weekly library and IT exposure', 'Islamic Studies & Character Ethics'],
    curriculum: 'National Curriculum of Pakistan enhanced with international teaching aids.',
    iconName: 'BookOpen'
  },
  {
    title: 'Middle School',
    ageGroup: 'Ages 11 - 13 Years (Class VI to VIII)',
    description: 'Transitioning from concrete to analytical thinking. Rigorous teaching of STEM, digital literacy, environmental sciences, and public writing prepares students for major boards.',
    highlights: ['Hands-on Science Lab experiments', 'Introduction to computer coding', 'Compulsory physical training and discipline', 'Debate & declamation societies'],
    curriculum: 'Federal Board (FBISE) integrated preparatory courses.',
    iconName: 'GraduationCap'
  },
  {
    title: 'Secondary School',
    ageGroup: 'Ages 14 - 15 Years (Class IX & X)',
    description: 'Focused academic training for Matriculation examinations. We offer specialized tracks in Pre-Engineering, Pre-Medical, and Computer Science with highly expert faculty coaching.',
    highlights: ['FBISE Board Matric preparatory tracks', 'Advanced physics, chemistry, and biology labs', 'Regular counseling for university tracks', 'Mock board papers and review sessions'],
    curriculum: 'Federal Board of Intermediate and Secondary Education (FBISE) Curriculum.',
    iconName: 'FileText'
  },
  {
    title: 'Higher Secondary School',
    ageGroup: 'Ages 16 - 18 Years (Class XI & XII / FSc)',
    description: 'Pre-university preparation under FBISE. Offers top-tier intermediate degrees in Pre-Engineering, Pre-Medical, and Computer Sciences to guarantee admissions in elite professional colleges.',
    highlights: ['Intermediate (FSc) certification programs', 'Entry test prep (MDCAT/ECAT/NET) guidance', 'Advanced STEM research and presentation events', 'Student council leadership responsibilities'],
    curriculum: 'Federal Board (FBISE) Higher Secondary Education Syllabus.',
    iconName: 'Award'
  }
];

export const whyChooseUs: WhyChooseUsItem[] = [
  {
    title: 'Qualified Teachers',
    description: 'Educators holding advanced degrees and undergoing regular professional training from Army Public Schools System.',
    iconName: 'Users'
  },
  {
    title: 'Modern Classrooms',
    description: 'Spacious, well-ventilated learning rooms equipped with multimedia setups and modern educational charts.',
    iconName: 'Tv'
  },
  {
    title: 'Science Labs',
    description: 'Fully equipped Physics, Chemistry, and Biology laboratories allowing students to conduct direct research and testing.',
    iconName: 'Beaker'
  },
  {
    title: 'Computer Labs',
    description: 'Modern high-speed computer terminals loaded with educational software and coding IDEs to teach digital literacy.',
    iconName: 'Monitor'
  },
  {
    title: 'Rich Library',
    description: 'Hundreds of academic books, journals, storybooks, and digital archives encouraging reading Habits in students.',
    iconName: 'Library'
  },
  {
    title: 'Sports Facilities',
    description: 'Wide, scenic sports grounds for football, basketball, cricket, and athletics, backed by professional trainers.',
    iconName: 'Trophy'
  },
  {
    title: 'Military-Grade Discipline',
    description: 'A highly structured campus routine promoting high standards of personal grooming, punctuality, and respect.',
    iconName: 'ShieldAlert'
  },
  {
    title: 'Safe Learning Environment',
    description: 'CCTV monitored campus, strict security protocols, and child-safe policies providing complete peace of mind.',
    iconName: 'ShieldCheck'
  }
];

export const galleryItems: GalleryItem[] = [
  {
    id: 'g1',
    url: heroCampus,
    title: 'Main Campus View',
    category: 'Campus',
    description: 'Stunning panoramic view of the Army Public School Aliabad Hunza building with the snow-capped Karakoram mountains.'
  },
  {
    id: 'g2',
    url: scienceLab,
    title: 'Chemistry Laboratory Session',
    category: 'Science Lab',
    description: 'High school students wearing safety lab-coats, performing practical volumetric analysis experiments.'
  },
  {
    id: 'g3',
    url: sportsActivities,
    title: 'Inter-House Soccer Championship',
    category: 'Sports',
    description: 'School teams participating in a highly energetic soccer tournament surrounded by majestic local peaks.'
  },
  {
    id: 'g4',
    url: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80',
    title: 'Primary Grade Reading Club',
    category: 'Classrooms',
    description: 'Primary school classroom with neat wooden desks, fully stocked reading shelf and enthusiastic young readers.'
  },
  {
    id: 'g5',
    url: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80',
    title: 'ICT Practical Session',
    category: 'Computer Lab',
    description: 'Secondary students learning algorithm structures and software coding in our modern computer terminal room.'
  },
  {
    id: 'g6',
    url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
    title: 'Annual Speech Debate Gala',
    category: 'Events',
    description: 'Our top orators presenting inspiring speeches on Pakistan Resolution and global innovation on the central stage.'
  },
  {
    id: 'g7',
    url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
    title: 'Annual Day Performance',
    category: 'Annual Functions',
    description: 'Cultural performance and national anthem display by high school girls in traditional Hunza caps and garments.'
  },
  {
    id: 'g8',
    url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
    title: 'Easel Art and Painting Day',
    category: 'Student Activities',
    description: 'Pre-school kids painting their dreams on canvas during the annual spring fine-arts day.'
  },
  {
    id: 'g9',
    url: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=800&q=80',
    title: 'Physics Optics Demonstration',
    category: 'Science Lab',
    description: 'Exploring properties of light, refraction, and lenses using custom optical bench kits.'
  }
];

export const achievementsData: AchievementItem[] = [
  {
    title: 'Academic Excellence',
    value: 100,
    suffix: '%',
    description: 'Pass rate in FBISE Board Matric and Intermediate examinations consistently over the last 5 years.',
    iconName: 'CheckCircle',
    colorClass: 'text-navy-600 bg-navy-50'
  },
  {
    title: 'Board Results',
    value: 14,
    suffix: '+',
    description: 'Students achieving top 10 positions and highest standard A-1 grades in Gilgit-Baltistan region.',
    iconName: 'Medal',
    colorClass: 'text-schoolgold-600 bg-schoolgold-50'
  },
  {
    title: 'Sports Awards',
    value: 18,
    suffix: '',
    description: 'Championship trophies in Inter-School football, cricket, and athletic tournaments in Gilgit-Baltistan.',
    iconName: 'Trophy',
    colorClass: 'text-armygreen-600 bg-armygreen-50'
  },
  {
    title: 'National Competitions',
    value: 9,
    suffix: '+',
    description: 'National and regional awards won in STEM Science Fairs, speech contests, and spelling bee contests.',
    iconName: 'Compass',
    colorClass: 'text-purple-600 bg-purple-50'
  },
  {
    title: 'Merit Scholarships',
    value: 45,
    suffix: '%',
    description: 'Percentage of high-achieving or deserving children receiving financial support/fee waivers.',
    iconName: 'Award',
    colorClass: 'text-pink-600 bg-pink-50'
  }
];

export const newsEventsData: NewsEvent[] = [
  {
    id: 'n1',
    date: '15',
    month: 'AUG',
    title: 'Admissions Open: Fall Academic Session 2026',
    shortDesc: 'Registrations are officially open for Prep, Class I-IX, and Intermediate FSc parts. Applications close August 30.',
    longDesc: 'Army Public School Aliabad Hunza is proud to announce that admissions are now open for the Fall 2026 Academic Session. We invite parent community to register their children for our Montessori Pre-school, Primary, Secondary Board preparations, and pre-university FSc. Entry assessments will evaluate analytical math, linguistic skills, and scientific understanding. Visit our administration block for the prospectus and details, or download from the admissions section.',
    image: heroCampus,
    category: 'Announcement'
  },
  {
    id: 'n2',
    date: '28',
    month: 'JUN',
    title: 'STEM Innovation & Robotics Expo 2026',
    shortDesc: 'Middle and high school students present innovative coding scripts, smart solar prototypes, and automated systems.',
    longDesc: 'The Annual STEM and Robotics Exhibition 2026 was hosted inside the central multipurpose hall. Under the mentoring of our ICT and Physics departments, students crafted smart automated drip irrigation models for mountain orchards, smart waste recycling bins, and simple Arduino-powered robotics. Brigadier Khurram Ali, chief guest of the expo, lauded the students for applying core science to local Hunza valley issues.',
    image: scienceLab,
    category: 'Event'
  },
  {
    id: 'n3',
    date: '10',
    month: 'MAY',
    title: 'Karakoram Inter-House Sports Gala 2026',
    shortDesc: 'Students compete in high-altitude athletics, soccer, volleyball, and local gymnastics under breathtaking views.',
    longDesc: 'Our annual Karakoram Inter-House Sports Gala was a celebration of sheer physical stamina and healthy teamwork. The four major school houses—Jinnah, Iqbal, Sher Khan, and Rakaposhi—competed across 100m/400m sprint relays, football, volleyball, and military-style obstacle drill races. Iqbal House lifted the coveted championship trophy with Jinnah House trailing a close second.',
    image: sportsActivities,
    category: 'Sports'
  },
  {
    id: 'n4',
    date: '12',
    month: 'APR',
    title: 'Excellent FBISE Matriculation Results',
    shortDesc: 'APS Aliabad Hunza secures 100% board clearance, with 42 students achieving exceptional A-1 grade positions.',
    longDesc: 'The Federal Board of Intermediate and Secondary Education (FBISE) announced its Matric results and we are thrilled to declare that our students secured high ranks. 100% of our Class X candidates cleared the boards. 42 students scored over 90% marks, earning direct government and military college scholarships. We congratulate our teachers and hardworking students.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
    category: 'Academic'
  }
];

export const testimonialsData: Testimonial[] = [
  {
    id: 't1',
    name: 'Dr. Shakeel Ahmed',
    role: 'Consultant Pediatrician, DHQ Gilgit',
    relation: 'Parent',
    text: "APS Aliabad Hunza has completely transformed my son's attitude towards learning. The blend of military discipline, excellent science labs, and teacher accountability is unmatched in this valley. My son has secured admission to Kakul PMA, and I credit his confidence entirely to this wonderful school.",
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150&q=80'
  },
  {
    id: 't2',
    name: 'Aisha Alvi',
    role: 'Software Engineer, TechDest',
    relation: 'Alumnus',
    text: 'I passed my Intermediate (FSc) from APS Aliabad in 2021. Being in a computer science track, the access to modern labs and teachers who supported coding projects helped me enter NUST on full scholarship. Punctuality and rigor are taught here as life-long traits.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80'
  },
  {
    id: 't3',
    name: 'Major General (Retd) Sher Wali',
    role: 'Local Community Elder',
    relation: 'Parent',
    text: 'For kids growing up in the Hunza region, access to standardized education that competes with Islamabad or Lahore was difficult. APS Aliabad Hunza has filled that void brilliantly. The physical activities and character grooming make these students proud, resilient citizens.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80'
  }
];

export const facultyData: FacultyMember[] = [
  {
    id: 'f1',
    name: 'Mrs. Saira Mumtaz',
    designation: 'Vice Principal & Head of Science Department',
    qualification: 'M.Sc. in Organic Chemistry, Quaid-e-Azam University',
    experience: '15 Years',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&h=200&q=80'
  },
  {
    id: 'f2',
    name: 'Mr. Ali Raza Khawaja',
    designation: 'Senior Lecturer, Mathematics (FSc Lead)',
    qualification: 'M.Phil. in Applied Mathematics, Punjab University',
    experience: '12 Years',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&h=200&q=80'
  },
  {
    id: 'f3',
    name: 'Miss Yasmin Hunzai',
    designation: 'Head of English & Public Speaking',
    qualification: 'M.A. in English Literature, National University of Modern Languages',
    experience: '10 Years',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&h=200&q=80'
  },
  {
    id: 'f4',
    name: 'Mr. Muhammad Imran',
    designation: 'Senior Instructor, Computer Science & IT Lab',
    qualification: 'BS in Computer Engineering, FAST-NUCES',
    experience: '8 Years',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&h=200&q=80'
  }
];
