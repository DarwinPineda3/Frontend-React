import React from 'react';
import { Grid, Box, Chip, Table, TableBody, TableCell, TableHead, TableRow, Typography, TableContainer, IconButton, Stack, LinearProgress } from '@mui/material';
import DashboardCard from 'src/components/shared/DashboardCard';
import Breadcrumb from 'src/components/shared/breadcrumb/Breadcrumb';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TranslateIcon from '@mui/icons-material/Translate';
import PluginVersionTable from './pluginVersionTable';
import WpScanTopCards from './wpScantopCards';

const WpScanDetail: React.FC<{ scanId: string, onAlertClick: (alertId: string) => void; }> = ({ scanId, onAlertClick }) => {

  const mockAlerts = [
    {
      id: '1',
      url: 'https://prueba-tu-pala.ofertasdepadel.com/',
      description: 'Headers',
      type: 'headers',
      foundBy: 'Headers (Passive Detection)',
      confidence: '100%',
      references: 'NA',
      entries: true,
    },
    {
      id: '2',
      url: 'https://prueba-tu-pala.ofertasdepadel.com/robots.txt',
      description: 'robots.txt found: https://prueba-tu-pala.ofertasdepadel.com/robots.txt',
      type: 'robots_txt',
      foundBy: 'Robots Txt (Aggressive Detection)',
      confidence: '100%',
      references: 'NA',
      entries: true,
    },
    {
      id: '3',
      url: 'https://prueba-tu-pala.ofertasdepadel.com/xmlrpc.php',
      description: 'XML-RPC seems to be enabled: https://prueba-tu-pala.ofertasdepadel.com/xmlrpc.php',
      type: 'xmlrpc',
      foundBy: 'Direct Access (Aggressive Detection)',
      confidence: '100%',
      references: 'url http://codex.wordpress.org/XML-RPC_Pingback_API, metasploit auxiliary/scanner/http/wordpress_ghost_scanner, auxiliary/dos/http/wordpress_xmlrpc_dos, auxiliary/scanner/http/wordpress_xmlrpc_login, auxiliary/scanner/http/wordpress_pingback_access',
      entries: true,
    },
    {
      id: '4',
      url: 'https://prueba-tu-pala.ofertasdepadel.com/readme.html',
      description: 'WordPress readme found: https://prueba-tu-pala.ofertasdepadel.com/readme.html',
      type: 'readme',
      foundBy: 'Direct Access (Aggressive Detection)',
      confidence: '100%',
      references: 'NA',
      entries: true,
    },
    {
      id: '5',
      url: 'https://prueba-tu-pala.ofertasdepadel.com/wp-cron.php',
      description: 'The external WP-Cron seems to be enabled: https://prueba-tu-pala.ofertasdepadel.com/wp-cron.php',
      type: 'wp_cron',
      foundBy: 'Direct Access (Aggressive Detection)',
      confidence: '60%',
      references: 'url https://www.iplocation.net/defend-wordpress-from-ddos, https://github.com/wpscanteam/wpscan/issues/1299',
      entries: true,
    },
  ];

  const mockDate = new Date('2024-09-23T10:20:30Z');
  const mockEndDate = new Date('2024-09-23T10:20:30Z');
  const version = '1.0.0';
  const effectiveUrl = 'https://example.com';
  const mockSitesUrl = 'https://example.com';
  const mockFalsePositive = 1;
  const scanName = "Scan Name Example";
  const trust = 12;
  const status = 'outdated';

  const themeDetails = {
    name: 'hello-theme-child-master',
    location: 'https://prueba-tu-pala.ofertasdepadel.com/wp-content/themes/hello-theme-child-master/',
    lastVersion: 'NA',
    lastUpdate: 'NA',
    description: 'Hello Elementor Child is a child theme of Hello Elementor, created by Elementor team',
    author: 'Elementor Team',
    authorUri: 'https://elementor.com/',
    license: 'GNU General Public License v3 or later.',
    licenseUri: 'https://www.gnu.org/licenses/gpl-3.0.html',
    foundBy: 'Css Style In Homepage (Passive Detection)',
    confidence: '100%',
  };

  return (
    <Grid container spacing={3}>
      {/* Scan Metadata Section */}
      <Grid item xs={12} xl={12}>
        <WpScanTopCards/>
      </Grid>
      <Grid item xs={12} xl={6}>
        <DashboardCard>
          <PluginVersionTable />
        </DashboardCard>
      </Grid>

      <Grid item xs={12} xl={6}>
        <Breadcrumb title={scanName}>
          <Box display="flex" flexWrap="wrap" gap={1} mb={3}>
            <Chip label={`Status: ${status.toLocaleString()}`} color="info" variant="filled" />
            <Chip label={`Version: ${version}`} color="secondary" variant="outlined" />
            <Chip label={`Site URL: ${mockSitesUrl}`} color="info" variant="outlined" />
            <Chip label={`Effective URL: ${effectiveUrl}`} color="warning" variant="outlined" />
          </Box>
        </Breadcrumb>
        <DashboardCard title="Detalles del escaneo" subtitle="Detalles del escaneo">
          <Box display="flex" flexDirection="column" gap={2} mt={3}>
            
          <Box>
              <Stack
                direction="row"
                spacing={2}
                mb={1}
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Typography variant="h6">{"Trust"}</Typography>
                </Box>
                <Chip
                  sx={{
                    backgroundColor: 'primary',
                    color: 'primary',
                    borderRadius: '4px',
                    width: 55,
                    height: 24,
                  }}
                  label={trust + '%'}
                />
              </Stack>
              <LinearProgress value={trust} variant="determinate" color={'primary'} />
            </Box>
            <Box>
              <Typography variant="subtitle2" fontWeight={600}>
                Nombre:
              </Typography>
              <Typography variant="body2">{themeDetails.name}</Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2" fontWeight={600}>
                Ubicación:
              </Typography>
              <Typography variant="body2">
                <a href={themeDetails.location} target="_blank" rel="noopener noreferrer">
                  {themeDetails.location}
                </a>
              </Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2" fontWeight={600}>
                Última versión:
              </Typography>
              <Typography variant="body2">{themeDetails.lastVersion}</Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2" fontWeight={600}>
                Última actualización:
              </Typography>
              <Typography variant="body2">{themeDetails.lastUpdate}</Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2" fontWeight={600}>
                Descripción:
              </Typography>
              <Typography variant="body2">{themeDetails.description}</Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2" fontWeight={600}>
                Autor:
              </Typography>
              <Typography variant="body2">{themeDetails.author}</Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2" fontWeight={600}>
                Autor Uri:
              </Typography>
              <Typography variant="body2">
                <a href={themeDetails.authorUri} target="_blank" rel="noopener noreferrer">
                  {themeDetails.authorUri}
                </a>
              </Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2" fontWeight={600}>
                Licencia:
              </Typography>
              <Typography variant="body2">{themeDetails.license}</Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2" fontWeight={600}>
                Licencia Uri:
              </Typography>
              <Typography variant="body2">
                <a href={themeDetails.licenseUri} target="_blank" rel="noopener noreferrer">
                  {themeDetails.licenseUri}
                </a>
              </Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2" fontWeight={600}>
                Encontrado por:
              </Typography>
              <Typography variant="body2">{themeDetails.foundBy}</Typography>
            </Box>
          </Box>
        </DashboardCard>

      </Grid>
      {/* Alerts Table Section */}
      <Grid item xs={12} xl={12}>
        <DashboardCard>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><Typography variant="subtitle2" fontWeight={600}>URL</Typography></TableCell>
                  <TableCell><Typography variant="subtitle2" fontWeight={600}>Descripción</Typography></TableCell>
                  <TableCell><Typography variant="subtitle2" fontWeight={600}>Tipo</Typography></TableCell>
                  <TableCell><Typography variant="subtitle2" fontWeight={600}>Encontrado por</Typography></TableCell>
                  <TableCell><Typography variant="subtitle2" fontWeight={600}>Confianza</Typography></TableCell>
                  <TableCell><Typography variant="subtitle2" fontWeight={600}>Referencias</Typography></TableCell>
                  <TableCell><Typography variant="subtitle2" fontWeight={600}>Entradas interesantes</Typography></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockAlerts.map((alert) => (
                  <TableRow key={alert.id}>
                    <TableCell>
                      <Typography variant="body2" color="primary" style={{ cursor: 'pointer' }}>
                        {alert.url}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{alert.description}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{alert.type}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{alert.foundBy}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{alert.confidence}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{alert.references}</Typography>
                    </TableCell>
                    <TableCell>
                      {alert.entries && (
                        <Box display="flex" gap={1}>
                          <IconButton color="primary" onClick={() => onAlertClick(alert.id)}>
                            <VisibilityIcon />
                          </IconButton>
                          <IconButton color="primary">
                            <TranslateIcon />
                          </IconButton>
                        </Box>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DashboardCard>
      </Grid>
    </Grid>
  );
};

export default WpScanDetail;
