import type { Service } from '@/types/service';

/**
 * Services data layer.
 * Replace or extend these entries with real service data from the client.
 * Icon names correspond to Lucide React icon components.
 */
export const services: Service[] = [
  {
    id: 'general-contracting',
    title: { ar: 'المقاولات العامة', en: 'General Contracting' },
    description: {
      ar: 'نقدم خدمات المقاولات الشاملة من البداية حتى التسليم، مع الالتزام بأعلى معايير الجودة والسلامة.',
      en: 'We provide comprehensive contracting services from foundation to handover, adhering to the highest quality and safety standards.',
    },
    icon: 'Building2',
  },
  {
    id: 'construction',
    title: { ar: 'أعمال البناء', en: 'Construction' },
    description: {
      ar: 'تنفيذ أعمال البناء والإنشاء بكفاءة عالية، باستخدام أحدث المعدات والتقنيات.',
      en: 'Executing construction and building works with high efficiency using the latest equipment and technologies.',
    },
    icon: 'HardHat',
  },
  {
    id: 'interior-finishing',
    title: { ar: 'التشطيبات الداخلية', en: 'Interior Finishing' },
    description: {
      ar: 'تشطيبات داخلية احترافية تجمع بين الجماليات والوظيفية، لتحويل كل مساحة إلى تحفة فنية.',
      en: 'Professional interior finishes that combine aesthetics and functionality, transforming every space into a masterpiece.',
    },
    icon: 'Paintbrush',
  },
  {
    id: 'exterior-finishing',
    title: { ar: 'التشطيبات الخارجية', en: 'Exterior Finishing' },
    description: {
      ar: 'واجهات وتشطيبات خارجية تعكس الهوية المعمارية للمبنى وتدوم لسنوات طويلة.',
      en: 'Facades and exterior finishes that reflect the architectural identity of the building and last for years.',
    },
    icon: 'Layers',
  },
  {
    id: 'renovation',
    title: { ar: 'التجديد والترميم', en: 'Renovation & Restoration' },
    description: {
      ar: 'إعادة تأهيل وتجديد المباني والمساحات القائمة بأسلوب يحترم الهوية الأصلية ويضيف قيمة جديدة.',
      en: 'Rehabilitation and renovation of existing buildings and spaces in a way that respects the original identity while adding new value.',
    },
    icon: 'Wrench',
  },
  {
    id: 'project-management',
    title: { ar: 'إدارة المشاريع', en: 'Project Management' },
    description: {
      ar: 'إدارة متكاملة للمشاريع من التخطيط والتصميم حتى التنفيذ والتسليم، بأعلى كفاءة وأقل تكلفة.',
      en: 'Comprehensive project management from planning and design through to execution and handover, with maximum efficiency.',
    },
    icon: 'ClipboardList',
  },
  {
    id: 'engineering-solutions',
    title: { ar: 'الحلول الهندسية', en: 'Engineering Solutions' },
    description: {
      ar: 'نقدم حلولاً هندسية مبتكرة لمواجهة تحديات البناء المعقدة وتحقيق أفضل النتائج.',
      en: 'We provide innovative engineering solutions to tackle complex construction challenges and achieve optimal results.',
    },
    icon: 'Settings2',
  },
];
