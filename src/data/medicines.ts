import { Medicine } from '@/types/pharmacy';

export const medicines: Medicine[] = [
  {
    id: '1',
    name: 'باراسيتامول 500 مجم',
    description: 'مسكن للألم وخافض للحرارة، مناسب للصداع والحمى',
    price: 15,
    category: 'مسكنات',
    inStock: true,
  },
  {
    id: '2',
    name: 'إيبوبروفين 400 مجم',
    description: 'مضاد للالتهابات ومسكن للألم، فعال للألم المزمن',
    price: 25,
    category: 'مسكنات',
    inStock: true,
  },
  {
    id: '3',
    name: 'أموكسيسيلين 500 مجم',
    description: 'مضاد حيوي واسع المجال لعلاج الالتهابات البكتيرية',
    price: 35,
    category: 'مضادات حيوية',
    inStock: true,
  },
  {
    id: '4',
    name: 'فيتامين د 1000 وحدة',
    description: 'مكمل غذائي لتقوية العظام وتعزيز المناعة',
    price: 20,
    category: 'فيتامينات',
    inStock: true,
  },
  {
    id: '5',
    name: 'لوراتادين 10 مجم',
    description: 'مضاد للهيستامين لعلاج الحساسية والعطس',
    price: 18,
    category: 'مضادات الحساسية',
    inStock: true,
  },
  {
    id: '6',
    name: 'أوميبرازول 20 مجم',
    description: 'لعلاج قرحة المعدة وارتجاع المريء',
    price: 30,
    category: 'أدوية الجهاز الهضمي',
    inStock: true,
  },
  {
    id: '7',
    name: 'ديكلوفيناك جل',
    description: 'جل مضاد للالتهابات للاستخدام الموضعي',
    price: 22,
    category: 'مسكنات موضعية',
    inStock: true,
  },
  {
    id: '8',
    name: 'أسبرين 100 مجم',
    description: 'لحماية القلب ومنع تجلط الدم',
    price: 12,
    category: 'أدوية القلب',
    inStock: true,
  }
];