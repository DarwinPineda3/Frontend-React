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
        icon: IconPoint,
      },
      {
        id: uniqueId(),
        title: 'menu.wordpress', // Translation key for title
        href: '/vulnerabilities/web/wordpress',
        icon: IconPoint,
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
    href: '/monitoring/soc',
    icon: IconBasket,
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
