import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import {
  Box,
  Grid,
  IconButton,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardCard from 'src/components/shared/DashboardCard';
import HumanizedDate from 'src/components/shared/HumanizedDate';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router';

const WPSPlugins: React.FC<{ plugins_list: any[], scanId: any }> = ({ plugins_list, scanId }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleViewDetails = (vulns_nvd: any, scanId: any) => {
    // console.log(vulns_nvd);
    
    if (vulns_nvd) {
      navigate(`/vulnerabilities/web/wordpress/${scanId}/vulnerabilities`, { state: { vulns_nvd } });
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 9;

  const totalPages = Math.ceil(plugins_list?.length / rowsPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const currentData = plugins_list?.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);


  let vulnerabilities_nvd = [
    {
      "cve": {
        "id": "CVE-2024-35656",
        "sourceIdentifier": "audit@patchstack.com",
        "published": "2024-07-22T10:15:03.727",
        "lastModified": "2024-07-26T12:53:59.767",
        "vulnStatus": "Analyzed",
        "cveTags": [

        ],
        "descriptions": [
          {
            "lang": "en",
            "value": "Improper Neutralization of Input During Web Page Generation (XSS or 'Cross-site Scripting') vulnerability in Elementor Elementor Pro allows Reflected XSS.This issue affects Elementor Pro: from n/a through 3.21.2."
          },
          {
            "lang": "es",
            "value": " Vulnerabilidad de neutralización incorrecta de la entrada durante la generación de páginas web (XSS o 'Cross-site Scripting') en Elementor Elementor Pro permite el XSS reflejado. Este problema afecta a Elementor Pro: desde n/a hasta 3.21.2."
          }
        ],
        "metrics": {
          "cvssMetricV31": [
            {
              "source": "nvd@nist.gov",
              "type": "Primary",
              "cvssData": {
                "version": "3.1",
                "vectorString": "CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:C/C:L/I:L/A:N",
                "attackVector": "NETWORK",
                "attackComplexity": "LOW",
                "privilegesRequired": "NONE",
                "userInteraction": "REQUIRED",
                "scope": "CHANGED",
                "confidentialityImpact": "LOW",
                "integrityImpact": "LOW",
                "availabilityImpact": "NONE",
                "baseScore": 6.1,
                "baseSeverity": "MEDIUM"
              },
              "exploitabilityScore": 2.8,
              "impactScore": 2.7
            },
            {
              "source": "audit@patchstack.com",
              "type": "Secondary",
              "cvssData": {
                "version": "3.1",
                "vectorString": "CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:C/C:L/I:L/A:L",
                "attackVector": "NETWORK",
                "attackComplexity": "LOW",
                "privilegesRequired": "NONE",
                "userInteraction": "REQUIRED",
                "scope": "CHANGED",
                "confidentialityImpact": "LOW",
                "integrityImpact": "LOW",
                "availabilityImpact": "LOW",
                "baseScore": 7.1,
                "baseSeverity": "HIGH"
              },
              "exploitabilityScore": 2.8,
              "impactScore": 3.7
            }
          ]
        },
        "weaknesses": [
          {
            "source": "audit@patchstack.com",
            "type": "Primary",
            "description": [
              {
                "lang": "en",
                "value": "CWE-79"
              }
            ]
          }
        ],
        "configurations": [
          {
            "nodes": [
              {
                "operator": "OR",
                "negate": false,
                "cpeMatch": [
                  {
                    "vulnerable": true,
                    "criteria": "cpe:2.3:a:elementor:elementor_pro:*:*:*:*:*:wordpress:*:*",
                    "versionEndExcluding": "3.21.3",
                    "matchCriteriaId": "5F4E6866-4A8F-4382-8A82-2859FD8187CD"
                  }
                ]
              }
            ]
          }
        ],
        "references": [
          {
            "url": "https://patchstack.com/database/vulnerability/elementor-pro/wordpress-elementor-pro-3-21-2-reflected-cross-site-scripting-xss-vulnerability?_s_id=cve",
            "source": "audit@patchstack.com",
            "tags": [
              "Third Party Advisory"
            ]
          }
        ]
      }
    },
    {
      "cve": {
        "id": "CVE-2024-37437",
        "sourceIdentifier": "audit@patchstack.com",
        "published": "2024-07-09T11:15:14.470",
        "lastModified": "2024-08-29T18:51:10.020",
        "vulnStatus": "Analyzed",
        "cveTags": [

        ],
        "descriptions": [
          {
            "lang": "en",
            "value": "Improper Limitation of a Pathname to a Restricted Directory ('Path Traversal') vulnerability in Elementor Elementor Website Builder allows Cross-Site Scripting (XSS), Stored XSS.This issue affects Elementor Website Builder: from n/a through 3.22.1."
          },
          {
            "lang": "es",
            "value": " La limitación inadecuada de un nombre de ruta a una vulnerabilidad de directorio restringido (\"Path Traversal\") en Elementor Elementor Website Builder permite Cross-Site Scripting (XSS), XSS almacenado. Este problema afecta a Elementor Website Builder: desde n/a hasta 3.22.1."
          }
        ],
        "metrics": {
          "cvssMetricV31": [
            {
              "source": "nvd@nist.gov",
              "type": "Primary",
              "cvssData": {
                "version": "3.1",
                "vectorString": "CVSS:3.1/AV:N/AC:L/PR:L/UI:R/S:C/C:L/I:L/A:N",
                "attackVector": "NETWORK",
                "attackComplexity": "LOW",
                "privilegesRequired": "LOW",
                "userInteraction": "REQUIRED",
                "scope": "CHANGED",
                "confidentialityImpact": "LOW",
                "integrityImpact": "LOW",
                "availabilityImpact": "NONE",
                "baseScore": 5.4,
                "baseSeverity": "MEDIUM"
              },
              "exploitabilityScore": 2.3,
              "impactScore": 2.7
            },
            {
              "source": "audit@patchstack.com",
              "type": "Secondary",
              "cvssData": {
                "version": "3.1",
                "vectorString": "CVSS:3.1/AV:N/AC:H/PR:L/UI:R/S:C/C:L/I:L/A:L",
                "attackVector": "NETWORK",
                "attackComplexity": "HIGH",
                "privilegesRequired": "LOW",
                "userInteraction": "REQUIRED",
                "scope": "CHANGED",
                "confidentialityImpact": "LOW",
                "integrityImpact": "LOW",
                "availabilityImpact": "LOW",
                "baseScore": 5.5,
                "baseSeverity": "MEDIUM"
              },
              "exploitabilityScore": 1.3,
              "impactScore": 3.7
            }
          ]
        },
        "weaknesses": [
          {
            "source": "nvd@nist.gov",
            "type": "Primary",
            "description": [
              {
                "lang": "en",
                "value": "CWE-22"
              },
              {
                "lang": "en",
                "value": "CWE-79"
              }
            ]
          },
          {
            "source": "audit@patchstack.com",
            "type": "Secondary",
            "description": [
              {
                "lang": "en",
                "value": "CWE-22"
              }
            ]
          }
        ],
        "configurations": [
          {
            "nodes": [
              {
                "operator": "OR",
                "negate": false,
                "cpeMatch": [
                  {
                    "vulnerable": true,
                    "criteria": "cpe:2.3:a:elementor:website_builder:*:*:*:*:*:wordpress:*:*",
                    "versionEndExcluding": "3.22.2",
                    "matchCriteriaId": "2E66BE46-15B5-4C90-9FE3-67F363591CA7"
                  }
                ]
              }
            ]
          }
        ],
        "references": [
          {
            "url": "https://patchstack.com/database/vulnerability/elementor/wordpress-elementor-website-builder-more-than-just-a-page-builder-plugin-3-22-1-arbitrary-file-download-vulnerability?_s_id=cve",
            "source": "audit@patchstack.com",
            "tags": [
              "Third Party Advisory"
            ]
          }
        ]
      }
    },
    {
      "cve": {
        "id": "CVE-2024-5416",
        "sourceIdentifier": "security@wordfence.com",
        "published": "2024-09-11T12:15:02.463",
        "lastModified": "2024-09-26T14:37:59.290",
        "vulnStatus": "Analyzed",
        "cveTags": [

        ],
        "descriptions": [
          {
            "lang": "en",
            "value": "The Elementor Website Builder – More than Just a Page Builder plugin for WordPress is vulnerable to Stored Cross-Site Scripting via the url parameter of multiple widgets in all versions up to, and including, 3.23.4 due to insufficient input sanitization and output escaping on user supplied attributes. This makes it possible for authenticated attackers, with contributor-level access and above, to inject arbitrary web scripts in Elementor Editor pages. This was partially patched in version 3.23.2."
          },
          {
            "lang": "es",
            "value": "El complemento Elementor Website Builder – More than Just a Page Builder para WordPress es vulnerable a Cross-Site Scripting Almacenado a través del parámetro url de varios widgets en todas las versiones hasta la 3.23.4 incluida, debido a una desinfección de entrada insuficiente y a un escape de salida en los atributos proporcionados por el usuario. Esto hace posible que atacantes autenticados, con acceso de nivel de colaborador y superior, inyecten scripts web arbitrarias en las páginas del editor Elementor. Esto se solucionó parcialmente en la versión 3.23.2."
          }
        ],
        "metrics": {
          "cvssMetricV31": [
            {
              "source": "security@wordfence.com",
              "type": "Primary",
              "cvssData": {
                "version": "3.1",
                "vectorString": "CVSS:3.1/AV:N/AC:L/PR:L/UI:R/S:C/C:L/I:L/A:N",
                "attackVector": "NETWORK",
                "attackComplexity": "LOW",
                "privilegesRequired": "LOW",
                "userInteraction": "REQUIRED",
                "scope": "CHANGED",
                "confidentialityImpact": "LOW",
                "integrityImpact": "LOW",
                "availabilityImpact": "NONE",
                "baseScore": 5.4,
                "baseSeverity": "MEDIUM"
              },
              "exploitabilityScore": 2.3,
              "impactScore": 2.7
            }
          ]
        },
        "weaknesses": [
          {
            "source": "security@wordfence.com",
            "type": "Primary",
            "description": [
              {
                "lang": "en",
                "value": "CWE-79"
              }
            ]
          }
        ],
        "configurations": [
          {
            "nodes": [
              {
                "operator": "OR",
                "negate": false,
                "cpeMatch": [
                  {
                    "vulnerable": true,
                    "criteria": "cpe:2.3:a:elementor:website_builder:*:*:*:*:*:wordpress:*:*",
                    "versionEndExcluding": "3.24.0",
                    "matchCriteriaId": "E4D49209-DA24-4343-9DBF-4A0D86E5F153"
                  }
                ]
              }
            ]
          }
        ],
        "references": [
          {
            "url": "https://plugins.trac.wordpress.org/browser/elementor/tags/3.21.8/includes/widgets/image.php#L820",
            "source": "security@wordfence.com",
            "tags": [
              "Issue Tracking"
            ]
          },
          {
            "url": "https://plugins.trac.wordpress.org/browser/elementor/tags/3.21.8/includes/widgets/social-icons.php#L659",
            "source": "security@wordfence.com",
            "tags": [
              "Issue Tracking"
            ]
          },
          {
            "url": "https://plugins.trac.wordpress.org/browser/elementor/tags/3.21.8/includes/widgets/testimonial.php#L608",
            "source": "security@wordfence.com",
            "tags": [
              "Issue Tracking"
            ]
          },
          {
            "url": "https://plugins.trac.wordpress.org/browser/elementor/tags/3.21.8/includes/widgets/traits/button-trait.php#L523",
            "source": "security@wordfence.com",
            "tags": [
              "Issue Tracking"
            ]
          },
          {
            "url": "https://plugins.trac.wordpress.org/changeset/3123936",
            "source": "security@wordfence.com",
            "tags": [
              "Patch"
            ]
          },
          {
            "url": "https://plugins.trac.wordpress.org/changeset/3149264/",
            "source": "security@wordfence.com",
            "tags": [
              "Patch"
            ]
          },
          {
            "url": "https://www.wordfence.com/threat-intel/vulnerabilities/id/a99a64f7-1ea8-4de6-b24f-1f69bf25c1f5?source=cve",
            "source": "security@wordfence.com",
            "tags": [
              "Third Party Advisory"
            ]
          }
        ]
      }
    }
  ]
  return (
    <DashboardCard title={t('wpscan.plugins_list')!}>
      <>
      {plugins_list?.length > 0 ? (
      <Table aria-label="plugin version table">
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                {t('wpscan.plugin_name')}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                {t('wpscan.version')}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                {t('wpscan.latest_version')}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                {t('wpscan.last_update')}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                {t('wpscan.vulnerabilities')}
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentData?.map((plugin, index) => (
            <TableRow key={index}>
              <TableCell>
                <Typography variant="body2" color="primary" style={{ cursor: 'pointer' }}>
                  {plugin.name}
                </Typography>
              </TableCell>
              <TableCell>
                <Box display="flex" alignItems="center" gap={1}>
                  <Typography variant="body2">{plugin.version?.number}</Typography>
                  {plugin.outdated ? (
                    <WarningIcon color="error" fontSize="small" />
                  ) : (
                    <CheckCircleIcon color="success" fontSize="small" />
                  )}
                </Box>
              </TableCell>
              <TableCell>
                <Typography variant="body2">{plugin?.latest_version}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2">
                  <HumanizedDate dateString={plugin?.last_updated} />
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2">
                  {plugin?.vulnerabilities_nvd?.length != 0 ? (
                    <span>{t('wpscan.no_vulnerabilities')}</span>
                  ) : (
                    <Box display="flex" gap={1}>
                      <IconButton color="primary">
                        {/* <VisibilityIcon onClick={() => handleViewDetails(plugin?.vulnerabilities_nvd, scanId)} /> */}
                        <VisibilityIcon onClick={() => handleViewDetails(vulnerabilities_nvd, scanId)} />
                      </IconButton>
                    </Box>
                  )
                  }
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
       ) : (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h6">{t('wpscan.no_data_available')}</Typography>
          </Grid>
        </Grid>
      )
      }
      <Box my={3} display="flex" justifyContent="center">
            <Pagination
              count={totalPages}
              color="primary"
              page={currentPage}
              onChange={handlePageChange}
            />
          </Box>
      </>
    </DashboardCard>
  );
};

export default WPSPlugins;
