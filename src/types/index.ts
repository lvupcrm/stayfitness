// Shared types for the application

export interface ImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Program {
  name: string;
  description: string;
  image: ImageProps;
  price: string;
}

export interface Review {
  content: string;
  name: string;
}

export interface Trainer {
  id: string;
  name: string;
  specialty: string;
  image: string;
}

export interface Space {
  src: string;
  alt: string;
  desc: string;
}

export interface LeadFormData {
  name: string;
  phone: string;
  program?: string;
}

export interface SampleData {
  intro: {
    title: string;
    description: string;
    image: ImageProps;
  };
  programs: {
    title: string;
    programs: Program[];
  };
  reviews: {
    title: string;
    reviews: Review[];
  };
  location: {
    title: string;
    address: string;
    parking: string;
    subway: string;
    image: ImageProps;
  };
}