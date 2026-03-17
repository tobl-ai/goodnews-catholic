export interface User {
  id: string;
  userId: string;
  name: string;
  baptismName: string;
  diocese: string;
  parish: string;
  email: string;
  createdAt: string;
}

export interface BoardPost {
  id: string;
  boardType: "muk" | "free" | "qa";
  title: string;
  content: string;
  author: string;
  isNotice: boolean;
  views: number;
  createdAt: string;
}

export interface BibleVerse {
  id: string;
  book: string;
  chapter: number;
  verse: number;
  textKo: string;
  translation: string;
}

export interface DailyMass {
  id: string;
  date: string;
  liturgicalSeason: string;
  liturgicalColor: string;
  firstReadingRef: string;
  firstReadingText: string;
  psalmRef: string;
  psalmResponse: string;
  secondReadingRef: string | null;
  secondReadingText: string | null;
  gospelAcclamation: string;
  gospelRef: string;
  gospelText: string;
}

export interface Saint {
  id: string;
  name: string;
  feastDate: string;
  description: string;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  createdAt: string;
}

export interface Visitor {
  id: string;
  visitDate: string;
  count: number;
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  dateText: string;
  location: string;
  bgColor: string;
  isActive: boolean;
  sortOrder: number;
}

export interface QuickLink {
  id: string;
  label: string;
  icon: string;
  url: string;
  sortOrder: number;
}

export interface Hymn {
  id: string;
  number: number;
  title: string;
  lyricsFirstLine: string;
  category: string;
}

export interface Prayer {
  id: string;
  title: string;
  content: string;
  category: string;
}

export interface DioceseNews {
  id: string;
  diocese: string;
  title: string;
  createdAt: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  description: string;
  createdAt: string;
}

export interface AudioBook {
  id: string;
  title: string;
  author: string;
  duration: string;
  category: string;
}

export interface RealtimeNews {
  id: string;
  title: string;
  source: string;
  createdAt: string;
}

export interface Announcement {
  id: string;
  title: string;
  source: string;
  createdAt: string;
}
