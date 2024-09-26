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
    subheader: 'Home',
  },
  {
    id: uniqueId(),
    title: 'Tablero',
    href: '/home/dashboard',
    icon: IconAperture,
  },
  {
    id: uniqueId(),
    title: 'Assets',
    href: '/home/assets',
    icon: IconShoppingCart,
  },
  {
    navlabel: true,
    subheader: 'Vulnerabilities',
  },
  {
    id: uniqueId(),
    title: 'Network',
    href: '/vulnerabilities/network',
    icon: IconNetwork,
  },
  {
    id: uniqueId(),
    title: 'Web',
    href: '/vulnerabilities/web',
    icon: IconChartDonut3,
    children:[
      {
        id: uniqueId(),
        title: 'Applications',
        href: '/vulnerabilities/web/applications',
        icon: IconPoint,
      },
      {
        id: uniqueId(),
        title: 'Wordpress',
        href: '/vulnerabilities/web/wordpress',
        icon: IconPoint,
      }

    ]
  },
  {
    id: uniqueId(),
    title: 'Cloud',
    href: '/vulnerabilities/cloud',
    icon: IconCloud,
  },
  {
    id: uniqueId(),
    title: 'Summary',
    href: '/vulnerabilities/summary',
    icon: IconListDetails,
  },
  {
    id: uniqueId(),
    title: 'Management',
    href: '/vulnerabilities/management',
    icon: IconUserBolt,
  },
  {
    navlabel: true,
    subheader: 'Monitoring',
  },
  {
    id: uniqueId(),
    title: 'SOC',
    href: '/monitoring/soc',
    icon: IconBasket,
  },
  {
    id: uniqueId(),
    title: 'SIEM',
    href: '/monitoring/siem',
    icon: IconMessage2,
  },
  {
    navlabel: true,
    subheader: 'Observability',
  },
  {
    id: uniqueId(),
    title: 'Network',
    href: '/observability/network',
    icon: IconNetwork,
  },
  {
    id: uniqueId(),
    title: 'Cloud',
    href: '/observability/cloud',
    icon: IconCloud,
  },
  {
    id: uniqueId(),
    title: 'Observed Assets',
    href: '/observability/observed-assets',
    icon: IconPackage,
  },
  {
    id: uniqueId(),
    title: 'Installation Guide',
    href: '/observability/installation-guide',
    icon: IconBook,
  },
  {
    navlabel: true,
    subheader: 'Support',
  },
  {
    id: uniqueId(),
    title: 'Tickets',
    href: '/support/tickets',
    icon: IconTicket,
  },
  {
    id: uniqueId(),
    title: 'Solutions',
    href: '/support/solutions',
    icon: IconNotebook,
  },
  {
    navlabel: true,
    subheader: 'Configuration',
  },
  {
    id: uniqueId(),
    title: 'Scheduled Scans',
    href: '/configuration/scheduled-scans',
    icon: IconClockBolt,
  },
  {
    navlabel: true,
    subheader: 'Audit',
  },
  {
    id: uniqueId(),
    title: 'Log',
    href: '/audit/log',
    icon: IconGitMerge,
  },
];

export default Menuitems;