import { uniqueId } from 'lodash';
import {
  IconAperture,
  IconShoppingCart,
  IconPackage,
  IconChartDonut3,
  IconBasket,
  IconMessage2,
  IconTicket,
  IconNotebook,
  IconCloud,
  IconListDetails,
  IconUserBolt,
  IconNetwork,
  IconBook,
  IconClockBolt,
  IconGitMerge,
  IconPoint,
  IconBroadcast,
  IconReport,
  IconMenu,
  IconSocial,
  IconNews,
  IconBrandWordpress,
  IconSquaresFilled,
  IconFiles,
  IconLink,
  IconAlertHexagon,
  IconExternalLink,
} from '@tabler/icons-react';

interface MenuitemsType {
  [x: string]: any;
  id?: string;
  navlabel?: boolean;
  subheader?: string;
  title?: string;
  icon?: any;
  href?: string;
  children?: MenuitemsType[];
  chip?: string;
  chipColor?: string;
  variant?: string;
  external?: boolean;
}

const Menuitems: MenuitemsType[] = [
  {
    navlabel: true,
    subheader: 'menu.home', // Translation key for subheader
  },
  {
    id: uniqueId(),
    title: 'menu.dashboard', // Translation key for title
    href: '/home/dashboard',
    icon: IconAperture,
  },
  {
    id: uniqueId(),
    title: 'menu.assets', // Translation key for title
    href: '/home/assets',
    icon: IconShoppingCart,
  },
  {
    navlabel: true,
    subheader: 'menu.vulnerabilities', // Translation key for subheader
  },
  {
    id: uniqueId(),
    title: 'menu.network', // Translation key for title
    href: '/vulnerabilities/network',
    icon: IconNetwork,
  },
  {
    id: uniqueId(),
    title: 'menu.web', // Translation key for title
    href: '/vulnerabilities/web',
    icon: IconChartDonut3,
    children: [
      {
        id: uniqueId(),
        title: 'menu.applications', // Translation key for title
        href: '/vulnerabilities/web/applications',
        icon: IconSquaresFilled,
      },
      {
        id: uniqueId(),
        title: 'menu.wordpress', // Translation key for title
        href: '/vulnerabilities/web/wordpress',
        icon: IconBrandWordpress,
      },
    ],
  },
  {
    id: uniqueId(),
    title: 'menu.cloud', // Translation key for title
    href: '/vulnerabilities/cloud',
    icon: IconCloud,
  },
  {
    id: uniqueId(),
    title: 'menu.summary', // Translation key for title
    href: '/vulnerabilities/summary',
    icon: IconListDetails,
  },
  {
    id: uniqueId(),
    title: 'menu.management', // Translation key for title
    href: '/vulnerabilities/management',
    icon: IconUserBolt,
  },
  {
    navlabel: true,
    subheader: 'menu.monitoring', // Translation key for subheader
  },
  {
    id: uniqueId(),
    title: 'menu.soc', // Translation key for title
    icon: IconBasket,
    children: [
      {
        id: uniqueId(),
        title: 'menu.service_statistics', // Translation key for title
        href: '/monitoring/soc/service-statistics',
        icon: IconReport,
      },
      {
        id: uniqueId(),
        title: 'menu.source_monitoring', // Translation key for title
        href: '/monitoring/soc/source-monitoring',
        icon: IconBroadcast,
      },
      {
        id: uniqueId(),
        title: 'menu.cti', // Translation key for title
        href: '/monitoring/soc/cti',
        icon: IconMenu,
        children: [
          {
            id: uniqueId(),
            title: 'menu.description', // Translation key for title
            href: '/monitoring/soc/cti/description',
            icon: IconAlertHexagon,
          },
          {
            id: uniqueId(),
            title: 'menu.abusech', // Translation key for title
            href: '/monitoring/soc/cti/abusech',
            icon: IconClockBolt,
          },
          {
            id: uniqueId(),
            title: 'menu.files', // Translation key for title
            href: '/monitoring/soc/cti/files',
            icon: IconFiles,
          },
          {
            id: uniqueId(),
            title: 'menu.urls', // Translation key for title
            href: '/monitoring/soc/cti/urls',
            icon: IconLink,
          },
          {
            id: uniqueId(),
            title: 'menu.open_cti', // Translation key for title
            href: 'http://38.87.165.53:8080/dashboard',
            icon: IconExternalLink,
          }
        ]
      },
      {
        id: uniqueId(),
        title: 'menu.brand_monitoring', // Translation key for title
        href: '/monitoring/soc/brand-monitoring',
        icon: IconSocial,
        children: [
          {
            id: uniqueId(),
            title: 'menu.demo', // Translation key for title
            href: '/monitoring/soc/brand-monitoring/demo',
            icon: IconPoint,
          },
          {
            id: uniqueId(),
            title: 'menu.darknet', // Translation key for title
            href: '/monitoring/soc/brand-monitoring/darknet',
            icon: IconPoint,
          }
        ]
      },
      {
        id: uniqueId(),
        title: 'menu.news', // Translation key for title
        href: '/monitoring/soc/news',
        icon: IconNews,
      },
      {
        id: uniqueId(),
        title: 'menu.takedown', // Translation key for title
        href: '/monitoring/soc/takedown',
        icon: IconTicket,
      },
    ]
  },
  {
    id: uniqueId(),
    title: 'menu.siem', // Translation key for title
    href: '/monitoring/siem',
    icon: IconMessage2,
  },
  {
    navlabel: true,
    subheader: 'menu.observability', // Translation key for subheader
  },
  {
    id: uniqueId(),
    title: 'menu.network', // Translation key for title
    href: '/observability/network',
    icon: IconNetwork,
  },
  {
    id: uniqueId(),
    title: 'menu.cloud', // Translation key for title
    href: '/observability/cloud',
    icon: IconCloud,
  },
  {
    id: uniqueId(),
    title: 'menu.observed_assets', // Translation key for title
    href: '/observability/observed-assets',
    icon: IconPackage,
  },
  {
    id: uniqueId(),
    title: 'menu.installation_guide', // Translation key for title
    href: '/observability/installation-guide',
    icon: IconBook,
  },
  {
    navlabel: true,
    subheader: 'menu.support', // Translation key for subheader
  },
  {
    id: uniqueId(),
    title: 'menu.tickets', // Translation key for title
    href: '/support/tickets',
    icon: IconTicket,
  },
  {
    id: uniqueId(),
    title: 'menu.solutions', // Translation key for title
    href: '/support/solutions',
    icon: IconNotebook,
  },
  {
    navlabel: true,
    subheader: 'menu.configuration', // Translation key for subheader
  },
  {
    id: uniqueId(),
    title: 'menu.scheduled_scans', // Translation key for title
    href: '/configuration/scheduled-scans',
    icon: IconClockBolt,
  },
  {
    navlabel: true,
    subheader: 'menu.audit', // Translation key for subheader
  },
  {
    id: uniqueId(),
    title: 'menu.log', // Translation key for title
    href: '/audit/log',
    icon: IconGitMerge,
  },
];

export default Menuitems;
