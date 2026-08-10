import { FootballTeam, MatchFixture, LeagueStanding, PffNewsArticle } from './types';

export const schoolLogoUrl = 'https://www.dropbox.com/scl/fi/ly6wkynu88hi0c96djd3k/images.jpeg?rlkey=xpcimqrzzmstcs1gjpg4czxwj&raw=1';
export const bimalFcLogoUrl = 'https://www.dropbox.com/scl/fi/flej9e2pnug1qh6x4fc5n/IMG-20260810-WA0013.jpg?rlkey=bymujhyyrntv8eijtvr8x5gws&raw=1';
export const royalFcLogoUrl = 'https://www.dropbox.com/scl/fi/lg7cnisy55ltswugc311m/Screenshot_20260810-163541-1.jpg?rlkey=du7opfmtiu8bvmkq8y6y7jdbb&raw=1';

export const pffFederationInfo = {
  name: 'Pakistan Football Federation (PFF)',
  tagline: 'Official Governing Body of Football in Pakistan',
  established: '1947',
  headquarters: 'PFF House, FIFA Football Complex, Lahore, Pakistan',
  president: 'PFF Normalisation Committee Chairman',
  affiliatedWith: 'FIFA, AFC, SAFF',
  motto: 'Unity, Excellence, Passion for Pakistani Football',
  stadiumsCount: 18,
  registeredClubs: 120,
  activePlayers: 4500,
  contact: {
    phone: '+92 42 3571 2288',
    email: 'info@pff.com.pk',
    competitionsEmail: 'premierleague@pff.com.pk',
    address: 'PFF House, Opposite Gaddafi Stadium, Ferozepur Road, Lahore',
    officeHours: 'Monday - Friday: 09:00 AM - 05:00 PM'
  }
};

// INITIAL FOOTBALL TEAMS (Show ONLY 2 teams: Bimal FC and Royal FC)
export const initialFootballTeams: FootballTeam[] = [
  {
    id: 'bimal-fc',
    name: 'Bimal FC',
    code: 'BIM',
    logo: bimalFcLogoUrl,
    city: 'Aliabad, Hunza',
    founded: '2014',
    stadium: 'Bimal Mountain Arena',
    coach: 'Zahid Hussain',
    description: 'Bimal FC is known for their high-pressing attacking football and passionate fan base from northern Pakistan. They hold a proud tradition of athletic resilience.',
    primaryColor: '#16a34a', // Emerald Green
    secondaryColor: '#f59e0b', // Gold
    stats: {
      played: 10,
      won: 7,
      draw: 2,
      lost: 1,
      gf: 27,
      ga: 9,
      gd: 18,
      points: 23
    },
    recentForm: ['W', 'W', 'D', 'W', 'L'],
    squad: [
      { id: 'bimal-1', name: 'Muhammad Aziz', teamId: 'bimal-fc', teamName: 'Bimal FC', number: 10, position: 'Forward', gender: 'Male', registeredAt: '2026-01-10', goals: 10, assists: 4, matchesPlayed: 10 },
      { id: 'bimal-2', name: 'Raheem', teamId: 'bimal-fc', teamName: 'Bimal FC', number: 6, position: 'Midfielder', gender: 'Male', registeredAt: '2026-01-12', goals: 6, assists: 5, matchesPlayed: 10 },
      { id: 'bimal-3', name: 'Furqan', teamId: 'bimal-fc', teamName: 'Bimal FC', number: 4, position: 'Defender', gender: 'Male', registeredAt: '2026-01-15', goals: 4, assists: 2, matchesPlayed: 10 },
      { id: 'bimal-4', name: 'Bilal', teamId: 'bimal-fc', teamName: 'Bimal FC', number: 7, position: 'Forward', gender: 'Male', registeredAt: '2026-01-18', goals: 7, assists: 3, matchesPlayed: 10 },
      { id: 'bimal-5', name: 'Jawad', teamId: 'bimal-fc', teamName: 'Bimal FC', number: 1, position: 'Goalkeeper', gender: 'Male', registeredAt: '2026-02-01', goals: 0, assists: 0, matchesPlayed: 10 },
      { id: 'bimal-6', name: 'Shayan', teamId: 'bimal-fc', teamName: 'Bimal FC', number: 11, position: 'Midfielder', gender: 'Male', registeredAt: '2026-02-02', goals: 0, assists: 2, matchesPlayed: 8 }
    ]
  },
  {
    id: 'royal-fc',
    name: 'Royal FC',
    code: 'ROY',
    logo: royalFcLogoUrl,
    city: 'Gilgit',
    founded: '2011',
    stadium: 'Royal Crown Park',
    coach: 'Sikandar Hayat',
    description: 'Royal FC brings tactical elegance, structured defensive setups, and rapid counter-attacks. They are fierce competitors in the PFF Premier League.',
    primaryColor: '#1e3a8a', // Royal Navy
    secondaryColor: '#e11d48', // Crimson
    stats: {
      played: 10,
      won: 6,
      draw: 3,
      lost: 1,
      gf: 35,
      ga: 8,
      gd: 27,
      points: 21
    },
    recentForm: ['W', 'D', 'W', 'W', 'D'],
    squad: [
      { id: 'royal-1', name: 'Akash', teamId: 'royal-fc', teamName: 'Royal FC', number: 14, position: 'Forward', gender: 'Male', registeredAt: '2026-01-08', goals: 14, assists: 6, matchesPlayed: 10 },
      { id: 'royal-2', name: 'Saim', teamId: 'royal-fc', teamName: 'Royal FC', number: 9, position: 'Forward', gender: 'Male', registeredAt: '2026-01-11', goals: 9, assists: 3, matchesPlayed: 10 },
      { id: 'royal-3', name: 'Saba', teamId: 'royal-fc', teamName: 'Royal FC', number: 5, position: 'Midfielder', gender: 'Male', registeredAt: '2026-01-14', goals: 5, assists: 4, matchesPlayed: 10 },
      { id: 'royal-4', name: 'Javid Senior', teamId: 'royal-fc', teamName: 'Royal FC', number: 1, position: 'Goalkeeper', gender: 'Male', registeredAt: '2026-01-19', goals: 0, assists: 1, matchesPlayed: 10 },
      { id: 'royal-5', name: 'Fareed', teamId: 'royal-fc', teamName: 'Royal FC', number: 7, position: 'Midfielder', gender: 'Male', registeredAt: '2026-02-04', goals: 5, assists: 2, matchesPlayed: 9 },
      { id: 'royal-6', name: 'Ejaz', teamId: 'royal-fc', teamName: 'Royal FC', number: 10, position: 'Midfielder', gender: 'Male', registeredAt: '2026-02-05', goals: 2, assists: 5, matchesPlayed: 9 }
    ]
  }
];

// INITIAL FIXTURES & RESULTS
export const initialFixtures: MatchFixture[] = [
  {
    id: 'fix-1',
    homeTeamId: 'bimal-fc',
    homeTeamName: 'Bimal FC',
    homeTeamLogo: bimalFcLogoUrl,
    awayTeamId: 'royal-fc',
    awayTeamName: 'Royal FC',
    awayTeamLogo: royalFcLogoUrl,
    date: '2026-08-15',
    time: '18:00 PKT',
    venue: 'National Football Stadium, Lahore',
    status: 'Upcoming',
    competition: 'PFF Premier League 2026',
    round: 'Matchday 11 - Grand Championship Derby',
    stadiumImage: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'fix-2',
    homeTeamId: 'royal-fc',
    homeTeamName: 'Royal FC',
    homeTeamLogo: royalFcLogoUrl,
    awayTeamId: 'bimal-fc',
    awayTeamName: 'Bimal FC',
    awayTeamLogo: bimalFcLogoUrl,
    date: '2026-08-25',
    time: '19:00 PKT',
    venue: 'Royal Crown Park, Gilgit',
    status: 'Upcoming',
    competition: 'PFF Premier League 2026',
    round: 'Matchday 12'
  },
  {
    id: 'res-1',
    homeTeamId: 'bimal-fc',
    homeTeamName: 'Bimal FC',
    homeTeamLogo: bimalFcLogoUrl,
    awayTeamId: 'royal-fc',
    awayTeamName: 'Royal FC',
    awayTeamLogo: royalFcLogoUrl,
    date: '2026-08-02',
    time: '17:00 PKT',
    venue: 'Bimal Mountain Arena',
    status: 'Completed',
    homeScore: 3,
    awayScore: 2,
    competition: 'PFF Premier League 2026',
    round: 'Matchday 10',
    scorers: ['Muhammad Aziz (22\', 64\')', 'Bilal (81\')', 'Akash (44\')', 'Saim (70\')'],
    possession: { home: 52, away: 48 },
    shots: { home: 12, away: 11 }
  }
];

export const initialStandings: LeagueStanding[] = [
  {
    position: 1,
    teamId: 'bimal-fc',
    teamName: 'Bimal FC',
    teamLogo: bimalFcLogoUrl,
    played: 10,
    won: 7,
    draw: 2,
    lost: 1,
    gf: 27,
    ga: 9,
    gd: 18,
    points: 23,
    form: ['W', 'W', 'D', 'W', 'L']
  },
  {
    position: 2,
    teamId: 'royal-fc',
    teamName: 'Royal FC',
    teamLogo: royalFcLogoUrl,
    played: 10,
    won: 6,
    draw: 3,
    lost: 1,
    gf: 35,
    ga: 8,
    gd: 27,
    points: 21,
    form: ['W', 'D', 'W', 'W', 'D']
  }
];

export const pffNewsArticles: PffNewsArticle[] = [
  {
    id: 'news-1',
    title: 'PFF Premier League 2026: Title Clash Between Bimal FC and Royal FC Announced',
    category: 'Premier League',
    date: 'August 08, 2026',
    summary: 'The Pakistan Football Federation has officially announced the upcoming marquee fixture between league leaders Bimal FC and 2nd placed Royal FC.',
    content: 'Football enthusiasts across the nation are gearing up for a high-stakes encounter as Bimal FC prepares to take on Royal FC in Lahore. Bimal FC currently holds a 2-point lead at the top of the standings after 10 matches, while Royal FC remains undefeated in their last five fixtures.',
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80',
    author: 'PFF Media Cell',
    featured: true
  },
  {
    id: 'news-2',
    title: 'National Grassroots Registration Open for Men and Women Athletes',
    category: 'Federation',
    date: 'August 05, 2026',
    summary: 'PFF opens digital team portal allowing players across all provinces to register for recognized clubs including Bimal FC and Royal FC.',
    content: 'In line with FIFA development directives, the Pakistan Football Federation has digitized club registration. Players can now select their designated club, register their full profile, and track official federation fixtures.',
    image: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=800&q=80',
    author: 'PFF Technical Department',
    featured: false
  },
  {
    id: 'news-3',
    title: 'AFC Certification Training Program Successfully Concludes in Lahore',
    category: 'National Team',
    date: 'July 30, 2026',
    summary: '24 coaches from Gilgit-Baltistan, Punjab, Sindh, and KP complete AFC B-License certification at the PFF Technical Center.',
    content: 'The 3-week intensive coaching workshop covered modern tactical analytics, sports nutrition, and youth development frameworks.',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80',
    author: 'PFF Coaching Education',
    featured: false
  }
];
