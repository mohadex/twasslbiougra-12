import { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Star, 
  Clock, 
  Phone, 
  MessageCircle, 
  Truck, 
  Bike, 
  Car, 
  Package, 
  MapPin, 
  CheckCircle, 
  FileText, 
  ShoppingBag, 
  Utensils 
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { TransportService } from '@/types/transport';

interface ServiceRating {
  serviceId: string;
  rating: number;
  userName: string;
  date: string;
}
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { transportServices } from '@/data/transportServices';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { motion } from 'framer-motion';

const ServiceCard = ({ service, onRate }: { service: TransportService; onRate: (serviceId: string, rating: number) => void }) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const { toast } = useToast();

  const handleRating = (newRating: number) => {
    setRating(newRating);
    onRate(service.id, newRating);
    toast({
      title: 'شكراً لتقييمك!',
      description: 'تم إضافة تقييمك بنجاح',
    });
  };

  const getServiceIcon = (type: string) => {
    const iconClass = "w-10 h-10 p-2 rounded-lg";
    switch (type) {
      case 'taxi': return <Car className={`${iconClass} bg-[#fef0ef] text-[#f1594b]`} />;
      case 'delivery': return <Package className={`${iconClass} bg-[#fef0ef] text-[#f1594b]`} />;
      case 'bike': return <Bike className={`${iconClass} bg-[#fef0ef] text-[#f1594b]`} />;
      default: return <Truck className={`${iconClass} bg-[#fef0ef] text-[#f1594b]`} />;
    }
  };

  const getServiceTypeName = (type: string) => {
    switch (type) {
      case 'taxi': return 'سيارة أجرة';
      case 'delivery': return 'توصيل';
      case 'bike': return 'دراجة نارية';
      default: return 'نقل بضائع';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-[#f1594b]/20 rounded-2xl">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              <Badge className="font-normal bg-[#fef0ef] text-[#f1594b] hover:bg-[#fef0ef]">
                {getServiceTypeName(service.type)}
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1 text-xs">
                <MapPin className="w-3 h-3" />
                <span>بيوكرى</span>
              </Badge>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-[#f1594b] fill-[#f1594b]" />
              <span className="font-medium">{service.averageRating.toFixed(1)}</span>
              <span className="text-xs text-gray-500 mr-1">({service.totalRatings})</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pb-4 pt-0">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0">
              {getServiceIcon(service.type)}
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg text-gray-900 mb-1">{service.name}</h3>
              <p className="text-sm text-gray-600 mb-3">{service.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-3">
                {service.features.map((feature, index) => (
                  <div key={index} className="flex items-center bg-[#fef0ef] text-[#f1594b] px-2 py-1 rounded-full">
                    <CheckCircle className="w-3 h-3 ml-1 text-[#f1594b]" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">التقييم:</span>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      onClick={() => handleRating(star)}
                      className="p-1"
                    >
                      <Star
                        className={`w-5 h-5 ${
                          (hoveredRating || rating) >= star
                            ? 'text-[#f1594b] fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-2">
                <a
                  href={`tel:${service.phone}`}
                  className="p-2 bg-[#f1594b] text-white rounded-lg hover:bg-[#e04a3b] transition-colors"
                >
                  <Phone className="w-5 h-5 text-white" />
                </a>
                <a
                  href={`https://wa.me/${service.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-[#f1594b] text-white rounded-lg hover:bg-[#e04a3b] transition-colors"
                >
                  <MessageCircle className="w-5 h-5 text-white" />
                </a>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Types for delivery options
interface DeliveryOption {
  id: string;
  name: string;
  type: 'document' | 'small' | 'purchase' | 'food';
  icon: JSX.Element;
}

interface Area {
  id: string;
  name: string;
}

export const Transport = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [services, setServices] = useState<TransportService[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPackageType, setSelectedPackageType] = useState<string>('all');
  const [selectedArea, setSelectedArea] = useState<string>('all');
  const { toast } = useToast();

  // Delivery options
  const deliveryOptions: DeliveryOption[] = [
    { id: 'document', name: 'مستندات', type: 'document', icon: <FileText className="w-5 h-5" /> },
    { id: 'small', name: 'طرد صغير', type: 'small', icon: <Package className="w-5 h-5" /> },
    { id: 'purchase', name: 'مشتريات', type: 'purchase', icon: <ShoppingBag className="w-5 h-5" /> },
    { id: 'food', name: 'مواد غذائية', type: 'food', icon: <Utensils className="w-5 h-5" /> },
  ];

  // Areas in Biougra
  const areas: Area[] = [
    { id: 'downtown', name: 'وسط المدينة' },
    { id: 'south', name: 'جنوب المدينة' },
    { id: 'north', name: 'شمال المدينة' },
    { id: 'east', name: 'شرق المدينة' },
    { id: 'west', name: 'غرب المدينة' },
  ];

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      // Load ratings from localStorage
      const savedRatings = localStorage.getItem('serviceRatings');
      const ratings: ServiceRating[] = savedRatings ? JSON.parse(savedRatings) : [];
      
      // Update services with saved ratings
      const updatedServices = transportServices.map(service => {
        const serviceRatings = ratings.filter(r => r.serviceId === service.id);
        if (serviceRatings.length > 0) {
          const totalRating = serviceRatings.reduce((sum, r) => sum + r.rating, 0);
          const averageRating = totalRating / serviceRatings.length;
          return {
            ...service,
            averageRating,
            totalRatings: serviceRatings.length,
          };
        }
        return service;
      });
      
      setServices(updatedServices);
      setIsLoading(false);
    }, 1000); // Simulate network delay

    return () => clearTimeout(timer);
  }, []);

  const handleRate = (serviceId: string, rating: number) => {
    const storedRatings = localStorage.getItem('transportRatings');
    const ratings: ServiceRating[] = storedRatings ? JSON.parse(storedRatings) : [];
    
    const newRating: ServiceRating = {
      serviceId,
      rating,
      userName: 'مستخدم',
      date: new Date().toISOString(),
    };
    
    const updatedRatings = [...ratings, newRating];
    localStorage.setItem('transportRatings', JSON.stringify(updatedRatings));
    
    // Update services state
    const updatedServices = services.map(service => {
      if (service.id === serviceId) {
        const serviceRatings = updatedRatings.filter(r => r.serviceId === serviceId);
        const totalRating = serviceRatings.reduce((sum, r) => sum + r.rating, 0);
        const averageRating = totalRating / serviceRatings.length;
        return {
          ...service,
          averageRating,
          totalRatings: serviceRatings.length,
        };
      }
      return service;
    });
    
    setServices(updatedServices);
  };

  const filteredServices = services.filter(service => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = service.name.toLowerCase().includes(searchLower) ||
                         service.description.toLowerCase().includes(searchLower);
    const matchesType = activeTab === 'all' || service.type === activeTab;
    return matchesSearch && matchesType;
  });

  const serviceTabs = [
    { id: 'all', name: 'الكل', icon: <Truck className="w-4 h-4" /> },
    { id: 'taxi', name: 'سيارات الأجرة', icon: <Car className="w-4 h-4" /> },
    { id: 'delivery', name: 'خدمات التوصيل', icon: <Package className="w-4 h-4" /> },
    { id: 'bike', name: 'الدراجات النارية', icon: <Bike className="w-4 h-4" /> },
  ] as const;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Navigation />
        <div className="container mx-auto px-4 py-12">
          <div className="animate-pulse space-y-4">
            <div className="h-12 bg-gray-200 rounded-full w-1/3"></div>
            <div className="h-4 bg-gray-200 rounded-full w-1/2"></div>
            <div className="flex gap-3 mt-6 overflow-x-auto pb-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-10 bg-gray-200 rounded-full w-24"></div>
              ))}
            </div>
            <div className="grid gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-72 bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                  <div className="h-6 bg-gray-200 rounded-full w-2/3 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded-full w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded-full w-5/6 mb-6"></div>
                  <div className="h-4 bg-gray-200 rounded-full w-1/3 mb-1"></div>
                  <div className="h-4 bg-gray-200 rounded-full w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

    // How it works steps
  const howItWorks = [
    {
      title: 'اختر نوع الخدمة',
      description: 'حدد نوع الخدمة التي تحتاجها',
      icon: <Package className="w-8 h-8 text-[#f1594b]" />,
    },
    {
      title: 'تأكيد الطلب',
      description: 'تحقق من السعر وحدد الموقع',
      icon: <CheckCircle className="w-8 h-8 text-[#f1594b]" />,
    },
    {
      title: 'تتبع الطلب',
      description: 'تتبع سائقك في الوقت الفعلي',
      icon: <MapPin className="w-8 h-8 text-[#f1594b]" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100" dir="rtl">
      <Navigation />
      
      {/* Hero Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900">
            خدمة التوصيل السريع في بيوكرى
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-800">
            اطلب وصول شحنتك في دقائق
          </p>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            نسهل عليك توصيل أي شيء داخل المدينة بسرعة وأمان. من المشتريات اليومية إلى الطرود الخاصة، توصيلك مضمون وفي الوقت المحدد.
          </p>
        </div>
      </div>
      
      <main className="container mx-auto px-4 py-12 font-sans">
        {/* Search Section */}
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            ابحث عن خدمة التوصيل المناسبة لك
          </h2>
          
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="ابحث عن خدمة توصيل..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-12 pl-4 py-6 text-base border-gray-300 focus-visible:ring-2 focus-visible:ring-[#f1594b] focus-visible:ring-offset-2 text-right"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  نوع الشحنة
                </label>
                <select
                  value={selectedPackageType}
                  onChange={(e) => setSelectedPackageType(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f1594b] focus:border-[#f1594b]"
                >
                  <option value="all">الكل</option>
                  {deliveryOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  المنطقة
                </label>
                <select
                  value={selectedArea}
                  onChange={(e) => setSelectedArea(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f1594b] focus:border-[#f1594b]"
                >
                  <option value="all">كل المناطق</option>
                  {areas.map((area) => (
                    <option key={area.id} value={area.id}>
                      {area.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <Button className="w-full py-6 text-lg bg-[#f1594b] hover:bg-[#e04a3b] text-white">
              ابحث الآن
            </Button>
          </div>
        </div>
        
        {/* How It Works Section */}
        <div className="max-w-6xl mx-auto mb-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
            كيف تعمل الخدمة
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((step, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm text-center">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-[#fef0ef] rounded-full">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Services Section */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">
            أفضل خدمات التوصيل
          </h2>
            
          <Tabs 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="mb-8"
          >
            <TabsList className="grid w-full grid-cols-4 h-12 mb-8 bg-gray-100 p-1 rounded-xl">
              <TabsTrigger 
                value="all" 
                className="data-[state=active]:bg-[#f1594b] data-[state=active]:text-white data-[state=active]:shadow-sm rounded-lg flex items-center justify-center text-gray-700 data-[state=active]:hover:bg-[#e04a3b] hover:bg-gray-100 transition-colors"
              >
                <Filter className="w-4 h-4 ml-1" />
                <span>الكل</span>
              </TabsTrigger>
              <TabsTrigger 
                value="taxi" 
                className="data-[state=active]:bg-[#f1594b] data-[state=active]:text-white data-[state=active]:shadow-sm rounded-lg flex items-center justify-center text-gray-700 data-[state=active]:hover:bg-[#e04a3b] hover:bg-gray-100 transition-colors"
              >
                <Clock className="w-4 h-4 text-current ml-1" />
                <span>سيارات الأجرة</span>
              </TabsTrigger>
              <TabsTrigger 
                value="delivery" 
                className="data-[state=active]:bg-[#f1594b] data-[state=active]:text-white data-[state=active]:shadow-sm rounded-lg flex items-center justify-center text-gray-700 data-[state=active]:hover:bg-[#e04a3b] hover:bg-gray-100 transition-colors"
              >
                <Package className="w-4 h-4 text-current ml-1" />
                <span>توصيل</span>
              </TabsTrigger>
              <TabsTrigger 
                value="bike" 
                className="data-[state=active]:bg-[#f1594b] data-[state=active]:text-white data-[state=active]:shadow-sm rounded-lg flex items-center justify-center text-gray-700 data-[state=active]:hover:bg-[#e04a3b] hover:bg-gray-100 transition-colors"
              >
                <Bike className="w-4 h-4 text-current ml-1" />
                <span>دراجات نارية</span>
              </TabsTrigger>
            </TabsList>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredServices.length > 0 ? (
                filteredServices.map((service) => (
                  <ServiceCard 
                    key={service.id} 
                    service={service} 
                    onRate={handleRate} 
                  />
                ))
              ) : (
                <div className="col-span-3 text-center py-12">
                  <p className="text-gray-500">لم يتم العثور على خدمات تطابق بحثك</p>
                </div>
              )}
            </div>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};
