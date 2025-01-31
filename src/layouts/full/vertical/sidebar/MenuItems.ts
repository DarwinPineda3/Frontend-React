import {
  IconAlertHexagon,
  IconAperture,
  IconBasket,
  IconBook,
  IconBox,
  IconBrandWordpress,
  IconBroadcast,
  IconCategory,
  IconChartDonut3,
  IconClockBolt,
  IconCloud,
  IconExternalLink,
  IconGauge,
  IconGitMerge,
  IconLink,
  IconListDetails,
  IconMenu,
  IconMessage2,
  IconNetwork,
  IconNews,
  IconNotebook,
  IconPackage,
  IconPlayerPlay,
  IconPoint,
  IconReport,
  IconShieldBolt,
  IconShoppingCart,
  IconSocial,
  IconSpy,
  IconSquaresFilled,
  IconTemplate,
  IconTicket,
  IconUserBolt,
  IconUserShield,
} from '@tabler/icons-react';
import { uniqueId } from 'lodash';

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
  permissions?: string[];
}

const Menuitems: MenuitemsType[] = [
  // SCAN360
  {
    navlabel: true,
    subheader: 'menu.home',
    permissions: ['Administrator', 'Scan360', 'Defender', 'CyberGuard'],
  },
  {
    id: uniqueId(),
    title: 'menu.dashboard',
    href: '/home/dashboard',
    icon: IconAperture,
    permissions: ['Administrator', 'Scan360', 'Defender', 'CyberGuard'],
  },
  {
    id: uniqueId(),
    title: 'menu.assets',
    href: '/home/assets',
    icon: IconShoppingCart,
    permissions: ['Administrator', 'Scan360'],
  },

  // VULNERABILITIES (SCAN360)
  {
    navlabel: true,
    subheader: 'menu.vulnerabilities',
    permissions: ['Administrator', 'Scan360'],
  },
  {
    id: uniqueId(),
    title: 'menu.network',
    href: '/vulnerabilities/network/scans',
    icon: IconNetwork,
    permissions: ['Administrator', 'Scan360'],
  },
  {
    id: uniqueId(),
    title: 'menu.web',
    href: '/vulnerabilities/web',
    icon: IconChartDonut3,
    permissions: ['Administrator', 'Scan360'],
    children: [
      {
        id: uniqueId(),
        title: 'menu.applications',
        href: '/vulnerabilities/web/applications',
        icon: IconSquaresFilled,
        permissions: ['Administrator', 'Scan360'],
      },
      {
        id: uniqueId(),
        title: 'menu.wordpress',
        href: '/vulnerabilities/web/wordpress',
        icon: IconBrandWordpress,
        permissions: ['Administrator', 'Scan360'],
      },
    ],
  },
  {
    id: uniqueId(),
    title: 'menu.cloud',
    href: '/vulnerabilities/cloud',
    icon: IconCloud,
    permissions: ['Administrator', 'Scan360'],
  },
  {
    id: uniqueId(),
    title: 'menu.summary',
    href: '/vulnerabilities/summary',
    icon: IconListDetails,
    permissions: ['Administrator', 'Scan360'],
  },
  {
    id: uniqueId(),
    title: 'menu.management',
    href: '/vulnerabilities/management',
    icon: IconUserBolt,
    permissions: ['Administrator', 'Scan360'],
  },
  {
    id: uniqueId(),
    title: 'menu.redteam',
    href: '/vulnerabilities/redteam',
    icon: IconUserShield,
    permissions: ['Administrator', 'Scan360'],
  },

  // OBERVABILITY (SCAN360)
  {
    navlabel: true,
    subheader: 'menu.observability',
    permissions: ['Administrator', 'Scan360'],
  },
  {
    id: uniqueId(),
    title: 'menu.network',
    href: '/observability/network',
    icon: IconNetwork,
    permissions: ['Administrator', 'Scan360'],
  },
  {
    id: uniqueId(),
    title: 'menu.cloud',
    href: '/observability/cloud',
    icon: IconCloud,
    permissions: ['Administrator', 'Scan360'],
  },
  {
    id: uniqueId(),
    title: 'menu.observed_assets',
    href: '/observability/observed-assets',
    icon: IconPackage,
    permissions: ['Administrator', 'Scan360'],
  },
  {
    id: uniqueId(),
    title: 'menu.installation_guide',
    href: '/observability/installation-guide',
    icon: IconBook,
    permissions: ['Administrator', 'Scan360'],
  },
  {
    id: uniqueId(),
    title: 'menu.threshold_settings',
    href: '/observability/threshold-settings',
    icon: IconGauge,
    permissions: ['Administrator', 'Scan360'],
  },

  // MONITORING (CYBERGUARD)
  {
    navlabel: true,
    subheader: 'menu.monitoring',
    permissions: ['Administrator', 'CyberGuard'],
  },
  {
    id: uniqueId(),
    title: 'menu.dark_web_monitoring',
    href: '/monitoring/threats-overview',
    icon: IconSpy,
    permissions: ['Administrator', 'CyberGuard'],
  },
  {
    id: uniqueId(),
    title: 'menu.cyber_guard',
    href: '/monitoring/cyber-guard',
    icon: IconShieldBolt,
    permissions: ['Administrator', 'CyberGuard'],
    children: [
      {
        id: uniqueId(),
        title: 'monitoring.parameters',
        href: '/monitoring/cyber-guard/parameters',
        icon: IconPoint,
        permissions: ['Administrator', 'CyberGuard'],
      },
      {
        id: uniqueId(),
        title: 'menu.monitoring',
        href: '/monitoring/cyber-guard/monitoring',
        icon: IconPoint,
        permissions: ['Administrator', 'CyberGuard'],
      },
      // {
      //   id: uniqueId(),
      //   title: 'menu.malware',
      //   href: '/monitoring/cyber-guard/malware-analysis',
      //   icon: IconPoint,
      //   permissions: ['Administrator', 'CyberGuard'],
      // },
      // {
      //   id: uniqueId(),
      //   title: 'menu.mobile_apps',
      //   href: '/monitoring/cyber-guard/mobile-apps',
      //   icon: IconPoint,
      //   permissions: ['Administrator', 'CyberGuard'],
      // },
    ],
  },
  {
    id: uniqueId(),
    title: 'menu.news',
    href: '/monitoring/soc/newsletters',
    permissions: ['Administrator', 'CyberGuard'],
    icon: IconNews,
  },
  {
    id: uniqueId(),
    title: 'menu.takedown',
    href: '/monitoring/soc/takedown',
    permissions: ['Administrator', 'CyberGuard'],
    icon: IconTicket,
  },
  // TODO: enable to CyberGuard?
  {
    id: uniqueId(),
    title: 'menu.soc',
    icon: IconBasket,
    permissions: ['Administrator'],
    children: [
      {
        id: uniqueId(),
        title: 'menu.service_statistics',
        href: '/monitoring/soc/service-statistics',
        icon: IconReport,
        permissions: ['Administrator'],
      },
      {
        id: uniqueId(),
        title: 'menu.source_monitoring',
        href: '/monitoring/soc/source-monitoring',
        icon: IconBroadcast,
        permissions: ['Administrator'],
      },
      {
        id: uniqueId(),
        title: 'menu.cti',
        href: '/monitoring/soc/cti',
        icon: IconMenu,
        permissions: ['Administrator'],
        children: [
          //   {
          //     id: uniqueId(),
          //     title: 'menu.description',
          //     href: '/monitoring/soc/cti/description',
          //     icon: IconAlertHexagon,
          //     permissions: ['Administrator'],
          //   },
          //   {
          //     id: uniqueId(),
          //     title: 'menu.abusech',
          //     href: '/monitoring/soc/cti/abusech',
          //     icon: IconClockBolt,
          //     permissions: ['Administrator'],
          //   },
          //   {
          //     id: uniqueId(),
          //     title: 'menu.files',
          //     href: '/monitoring/soc/cti/files',
          //     icon: IconFiles,
          //     permissions: ['Administrator'],
          //   },
          //   {
          //     id: uniqueId(),
          //     title: 'menu.urls',
          //     href: '/monitoring/soc/cti/urls',
          //     icon: IconLink,
          //     permissions: ['Administrator'],
          //   },
          {
            id: uniqueId(),
            title: 'menu.technologies_inventory',
            href: '/monitoring/soc/cti/technologies-inventory',
            icon: IconBroadcast,
            permissions: ['Administrator'],
          },
          {
            id: uniqueId(),
            title: 'menu.threat_intelligence',
            href: '/monitoring/soc/cti/threat-intelligence',
            icon: IconAlertHexagon,
            permissions: ['Administrator'],
          },
          {
            id: uniqueId(),
            title: 'menu.emerging_risks',
            href: '/monitoring/soc/cti/emerging-risks',
            icon: IconClockBolt,
            permissions: ['Administrator'],
          },
          {
            id: uniqueId(),
            title: 'menu.mitre',
            href: '/monitoring/soc/cti/mitre',
            icon: IconLink,
            permissions: ['Administrator'],
          },
          {
            id: uniqueId(),
            title: 'menu.open_cti',
            href: 'http://201.149.34.142:8080/dashboard',
            icon: IconExternalLink,
            permissions: ['Administrator'],
            external: true,
          },
        ],
      },
      {
        id: uniqueId(),
        title: 'menu.monitoring',
        href: '/monitoring/soc/brand-monitoring',
        permissions: ['Administrator'],
        icon: IconSocial,
        children: [
          {
            id: uniqueId(),
            title: 'menu.demo',
            href: '/monitoring/soc/brand-monitoring/demo',
            permissions: ['Administrator'],
            icon: IconPoint,
          },
          {
            id: uniqueId(),
            title: 'menu.darknet',
            href: '/monitoring/soc/brand-monitoring/darknet',
            permissions: ['Administrator'],
            icon: IconPoint,
          },
        ],
      },
    ],
  },
  {
    id: uniqueId(),
    title: 'menu.siem',
    href: '/monitoring/siem',
    permissions: ['Administrator'],
    icon: IconMessage2,
  },

  // COMPLIANCE (DEFENDER)
  {
    navlabel: true,
    subheader: 'compliance_menu.compliance',
    permissions: ['Administrator', 'Defender'],
  },
  {
    id: uniqueId(),
    title: 'menu.dashboard',
    href: '/compliance/dashboard',
    icon: IconAperture,
    permissions: ['Administrator', 'Defender'],
  },
  {
    id: uniqueId(),
    title: 'compliance_menu.compliance_assets',
    href: '/compliance/assets',
    icon: IconShoppingCart,
    permissions: ['Administrator', 'Defender'],
  },
  {
    id: uniqueId(),
    title: 'compliance_menu.compliance_groups',
    href: '/compliance/groups',
    icon: IconCategory,
    permissions: ['Administrator', 'Defender'],
  },
  {
    id: uniqueId(),
    title: 'compliance_menu.compliance_projects',
    href: '/compliance/projects',
    icon: IconBox,
    permissions: ['Administrator', 'Defender'],
  },
  {
    id: uniqueId(),
    title: 'compliance_menu.compliance_executions',
    href: '/compliance/executions',
    icon: IconPlayerPlay,
    permissions: ['Administrator', 'Defender'],
  },
  {
    id: uniqueId(),
    title: 'compliance_menu.compliance_reports',
    href: '/compliance/reports',
    icon: IconReport,
    permissions: ['Administrator', 'Defender'],
  },
  {
    id: uniqueId(),
    title: 'compliance_menu.compliance_templates',
    href: '/compliance/templates',
    icon: IconTemplate,
    permissions: ['Administrator', 'Defender'],
  },
  {
    id: uniqueId(),
    title: 'menu.installation_guide',
    href: '/compliance/installation-guide',
    icon: IconBook,
    permissions: ['Administrator', 'Defender'],
  },

  // CONFIGURATION
  // TODO: enable to Scan360?
  {
    navlabel: true,
    subheader: 'menu.configuration',
    permissions: ['Administrator', 'Scan360'],
  },
  {
    id: uniqueId(),
    title: 'menu.scheduled_scans',
    href: '/configuration/scheduled-scans',
    permissions: ['Administrator', 'Scan360'],
    icon: IconClockBolt,
  },

  // AUDIT
  // TODO: enable to all groups?
  {
    navlabel: true,
    subheader: 'menu.audit',
    permissions: ['Administrator'],
  },
  {
    id: uniqueId(),
    title: 'menu.log',
    href: '/audit/logs',
    permissions: ['Administrator'],
    icon: IconGitMerge,
  },

  // SUPPORT
  // TODO: enable to all groups?
  {
    navlabel: true,
    subheader: 'menu.support',
    permissions: ['Administrator'],
  },
  {
    id: uniqueId(),
    title: 'menu.tickets',
    href: '/support/tickets',
    permissions: ['Administrator'],
    icon: IconTicket,
  },
  {
    id: uniqueId(),
    title: 'menu.solutions',
    permissions: ['Administrator'],
    href: '/support/solutions',
    icon: IconNotebook,
  },
];

export default Menuitems;
export type { MenuitemsType };
