export interface TransportService {
  id: string;
  name: string;
  type: 'taxi' | 'delivery' | 'bike' | 'other';
  phone: string;
  whatsapp: string;
  image?: string;
  averageRating: number;
  totalRatings: number;
  description: string;
  availability: string;
  responseTime: string;
  features: string[];
}

export interface ServiceRating {
  serviceId: string;
  rating: number;
  comment?: string;
  userName: string;
  date: string | Date;
}
