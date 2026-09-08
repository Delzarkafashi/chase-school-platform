export type Course = {
  id: string;

  // Grundinformation
  name: string;
  shortDescription: string;
  description: string;
  category: string;
  level: string;

  // Utbildningsinformation
  teacher: string;
  duration: string;
  studyPace: string;
  studyForm: string;
  location: string;

  // Datum
  startDate: string;
  applicationDeadline: string;

  // Innehåll
  points: number;
  language: string;
  requirements: string;
  careerOpportunities: string[];

  // Visning
  image?: string;
  isFeatured: boolean;
  isOpenForApplication: boolean;

  // Administration
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};