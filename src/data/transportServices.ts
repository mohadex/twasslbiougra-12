import { TransportService } from '@/types/transport';

export const transportServices: TransportService[] = [
  {
    id: '1',
    name: 'سيارات الأجرة بيوكرى',
    type: 'taxi',
    phone: '+212600000001',
    whatsapp: '212600000001',
    averageRating: 4.5,
    totalRatings: 12,
    description: 'خدمة سيارات الأجرة المتوفرة في جميع أنحاء المدينة. نقدم خدمة نقل مريحة وآمنة بأسعار تنافسية.',
    availability: '24/7',
    responseTime: '10-15 دقيقة',
    features: ['تكييف', 'دفع إلكتروني', 'مقاعد أطفال']
  },
  {
    id: '2',
    name: 'توصيل سريع - بيوكرى',
    type: 'delivery',
    phone: '+212600000002',
    whatsapp: '212600000002',
    averageRating: 4.8,
    totalRatings: 25,
    description: 'أسرع خدمة توصيل داخل بيوكرى، متاحة على مدار الساعة. نضمن وصول طلباتك في أسرع وقت ممكن.',
    availability: '24/7',
    responseTime: '15-30 دقيقة',
    features: ['تتبع الطلب', 'توصيل سريع', 'تغطية شاملة']
  },
  {
    id: '3',
    name: 'دراجات نارية - خدمة التوصيل',
    type: 'bike',
    phone: '+212600000003',
    whatsapp: '212600000003',
    averageRating: 4.2,
    totalRatings: 8,
    description: 'دراجات سريعة لتوصيل الطلبات الخفيفة والطعام. خدمة موثوقة وسريعة في جميع أنحاء المدينة.',
    availability: '24/7',
    responseTime: '5-10 دقائق',
    features: ['توصيل سريع', 'أسعار مناسبة', 'تغطية واسعة']
  },
  {
    id: '4',
    name: 'نقل البضائع بيوكرى',
    type: 'other',
    phone: '+212600000004',
    whatsapp: '212600000004',
    averageRating: 4.0,
    totalRatings: 5,
    description: 'خدمة نقل البضائع والأمتعة بجميع الأحجام. نضمن وصول بضاعتك بسلامة وأمان.',
    availability: '08:00 - 22:00',
    responseTime: '30-60 دقيقة',
    features: ['تغليف احترافي', 'تأمين على البضائع', 'خدمة التحميل والتفريغ']
  },
];
