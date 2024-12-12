import { Accordion, AccordionDetails, AccordionSummary, alpha, Box, Button, Chip, Grid, Stack, Typography, useTheme } from '@mui/material';
import { IconChevronDown } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Breadcrumb from 'src/components/shared/breadcrumb/Breadcrumb';
import DashboardCard from 'src/components/shared/DashboardCard';
import Loader from 'src/components/shared/Loader/Loader';
import { AppState, useDispatch, useSelector } from 'src/store/Store';
import { fetchWebApplicationAlertData } from 'src/store/vulnerabilities/web/WebAplicationsSlice';

interface AlertDetailProps {
  alertId: string;
  scanId: string;
}

const AlertDetail: React.FC<AlertDetailProps> = ({ alertId, scanId }) => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState<string | false>(false);
  const [aiSolution, setAiSolution] = useState('');
  const { t } = useTranslation();
  const handleChange = (panel: string) => (_event: React.ChangeEvent<{}>, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const { loading, alert, error } = useSelector((state: AppState) => state.WebApplicationsReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchWebApplicationAlertData({ scanId, alertId }));
  }, [dispatch]);

  const handleAICall = async () => {
    setAiSolution('...');
    //fake wait 3 seconds
    await new Promise(resolve => setTimeout(resolve, 3000));
    setAiSolution(alert.desc);
  }

  // Mock data for alert details based on the alertId
  const alertDetails = {
    1: { name: 'Absence of Anti-CSRF Tokens', riskLevel: 'Medium (Low)', instances: 5 },
    2: { name: 'Content Security Policy (CSP) Header Not Set', riskLevel: 'Medium (High)', instances: 81 },
    3: { name: 'Missing Anti-clickjacking Header', riskLevel: 'Medium (Medium)', instances: 65 },
    4: { name: 'Application Error Disclosure', riskLevel: 'Low (Medium)', instances: 5 },
    // Add more details as necessary
  };



  //@ts-ignore@
  const detail = alertDetails[0];

  const alertURLReport = [
    {
      "URL": "https://octapus.io/wp-login.php",
      "Método": "GET",
      "Ataque": "",
      "Evidencia": "<form name=\"loginform\" id=\"loginform\" action=\"https://octapus.io/wp-login.php\" method=\"post\">",
      "Otra Info": "No known Anti-CSRF token [anticsrf, CSRFToken, __RequestVerificationToken, csrfmiddlewaretoken, authenticity_token, OWASP_CSRFTOKEN, anoncsrf, csrf_token, _csrf, _csrfSecret, __csrf_magic, CSRF, _token, _csrf_token] was found in the following HTML form: [Form 1: \"redirect_to\" \"rememberme\" \"testcookie\" \"user_login\" \"user_pass\" \"wp-submit\" ]."
    },
    {
      "URL": "https://octapus.io/wp-login.php?action=lostpassword",
      "Método": "GET",
      "Ataque": "",
      "Evidencia": "<form name=\"lostpasswordform\" id=\"lostpasswordform\" action=\"https://octapus.io/wp-login.php?action=lostpassword\" method=\"post\">",
      "Otra Info": "No known Anti-CSRF token [anticsrf, CSRFToken, __RequestVerificationToken, csrfmiddlewaretoken, authenticity_token, OWASP_CSRFTOKEN, anoncsrf, csrf_token, _csrf, _csrfSecret, __csrf_magic, CSRF, _token, _csrf_token] was found in the following HTML form: [Form 1: \"redirect_to\" \"user_login\" \"wp-submit\" ]."
    },
    {
      "URL": "https://octapus.io/wp-login.php?reauth=1&redirect_to=https%3A%2F%2Foctapus.io%2Fwp-admin%2F",
      "Método": "GET",
      "Ataque": "",
      "Evidencia": "<form name=\"loginform\" id=\"loginform\" action=\"https://octapus.io/wp-login.php\" method=\"post\">",
      "Otra Info": "No known Anti-CSRF token [anticsrf, CSRFToken, __RequestVerificationToken, csrfmiddlewaretoken, authenticity_token, OWASP_CSRFTOKEN, anoncsrf, csrf_token, _csrf, _csrfSecret, __csrf_magic, CSRF, _token, _csrf_token] was found in the following HTML form: [Form 1: \"redirect_to\" \"rememberme\" \"testcookie\" \"user_login\" \"user_pass\" \"wp-submit\" ]."
    },
    {
      "URL": "https://octapus.io/wp-login.php",
      "Método": "POST",
      "Ataque": "",
      "Evidencia": "<form name=\"loginform\" id=\"loginform\" action=\"https://octapus.io/wp-login.php\" method=\"post\">",
      "Otra Info": "No known Anti-CSRF token [anticsrf, CSRFToken, __RequestVerificationToken, csrfmiddlewaretoken, authenticity_token, OWASP_CSRFTOKEN, anoncsrf, csrf_token, _csrf, _csrfSecret, __csrf_magic, CSRF, _token, _csrf_token] was found in the following HTML form: [Form 1: \"redirect_to\" \"rememberme\" \"testcookie\" \"user_login\" \"user_pass\" \"wp-submit\" ]."
    },
    {
      "URL": "https://octapus.io/wp-login.php?action=lostpassword",
      "Método": "POST",
      "Ataque": "",
      "Evidencia": "<form name=\"lostpasswordform\" id=\"lostpasswordform\" action=\"https://octapus.io/wp-login.php?action=lostpassword\" method=\"post\">",
      "Otra Info": "No known Anti-CSRF token [anticsrf, CSRFToken, __RequestVerificationToken, csrfmiddlewaretoken, authenticity_token, OWASP_CSRFTOKEN, anoncsrf, csrf_token, _csrf, _csrfSecret, __csrf_magic, CSRF, _token, _csrf_token] was found in the following HTML form: [Form 1: \"redirect_to\" \"user_login\" \"wp-submit\" ]."
    }
  ];

  if (error) {
    return <div>{t('dashboard.error', { error })}</div>;
  }
  if (loading || alert === null) {
    return <DashboardCard title={t('vulnerabilities.scan_details')} subtitle={t('vulnerabilities.scan_details')}>
      <Box display="flex" justifyContent="center" mt={4} mb={4}>
        <Loader />
      </Box>
    </DashboardCard>;
  }
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} xl={12}>
        <Breadcrumb title={alert.name!}>
          <Box display="flex" flexWrap="wrap" gap={1} mb={3}>
            <Chip label={t("vulnerabilities.cwe_id", { id: alert.cweid })} color="primary" variant="outlined" />
            <Chip label={t("vulnerabilities.wasc_id", { id: alert.wascid })} color="secondary" variant="outlined" />
            <Chip label={t("vulnerabilities.plugin_id", { id: alert.pluginid })} color="info" variant="outlined" />
          </Box>
        </Breadcrumb>
      </Grid>

      <Grid item xs={12} xl={12}>
        <DashboardCard title={t("vulnerabilities.description_title")!}>
          <Box sx={{ maxHeight: '200px', overflow: 'auto', scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' } }}>
            <Typography sx={{ whiteSpace: 'pre-line' }}>
              {alert.desc}
            </Typography>
          </Box>
        </DashboardCard>
      </Grid>

      <Grid item xs={12} xl={aiSolution ? 6 : 12}>
        <DashboardCard title={t("vulnerabilities.solution_title")!}>
          <>
            <Box sx={{ maxHeight: '300px', overflow: 'auto', scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' } }}>
              <Typography sx={{ whiteSpace: 'pre-line' }}>
                {alert.solution}
              </Typography>
            </Box>
            {!aiSolution && (
              <Stack direction="row" justifyContent="end" spacing={2} mt={2}>
                <Button variant="outlined" color="error" onClick={handleAICall}>
                  {t("vulnerabilities.generate_ai_solution")!}
                </Button>
              </Stack>
            )}
          </>
        </DashboardCard>
      </Grid>

      {aiSolution && (
        <Grid item xs={12} xl={6}>
          <DashboardCard title={t("vulnerabilities.ai_solution_title")!}>
            <Box sx={{
              height: '300px',
              overflow: 'auto',
              scrollbarWidth: 'none',
              '&::-webkit-scrollbar': { display: 'none' },
              animation: aiSolution === '...' ? 'fadeIn 1s ease-in-out' : 'none',
              '@keyframes fadeIn': {
                '0%': { opacity: 0 },
                '100%': { opacity: 1 }
              }
            }}>
              {aiSolution === '...' && (
                <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                  <Loader />
                </Box>
              )}
              {aiSolution !== '...' && (
                <Typography sx={{ whiteSpace: 'pre-line' }}>
                  {aiSolution}
                </Typography>
              )}
            </Box>
          </DashboardCard>
        </Grid>
      )}

      <Grid item xl={12} xs={12}>
        <DashboardCard title={t("vulnerabilities.urls_title")!}>
          <Box>
            {alert.instances.map((instance, index) => (
              <Accordion
                key={index}
                expanded={expanded === `panel${index}`}
                onChange={handleChange(`panel${index}`)}
                sx={{
                  backgroundColor: expanded === `panel${index}` ? alpha(theme.palette.secondary.light, .5) : theme.palette.background.default,
                  transition: 'background-color 0.3s ease',
                }}
              >
                <AccordionSummary expandIcon={<IconChevronDown />} aria-controls={`panel${index}bh-content`} id={`panel${index}bh-header`}>
                  <Grid container xs={12}>
                    <Grid item xl={8} xs={12}>
                      <Typography variant="h6" sx={{
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 2,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}>
                        {instance.uri}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle2" color="textSecondary">
                        {t("vulnerabilities.method", { method: instance.method })}
                      </Typography>
                    </Grid>
                  </Grid>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                    <strong>{t("vulnerabilities.attack")!}:</strong> {instance.attack || "None"}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                    <strong>{t("vulnerabilities.evidence")!}:</strong> {instance.evidence}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    <strong>{t("vulnerabilities.extra_info")!}:</strong> {instance.otherinfo}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </DashboardCard>
      </Grid>

      {
        (alert.references && alert.references.length > 0) ?? <Grid item xs={12}>
          <DashboardCard title={t("vulnerabilities.references_title")!}>
            <Box sx={{ overflow: 'auto', scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' } }}>
              {alert.references?.map((reference, index) => (
                <Typography key={index} variant="body2" sx={{ mb: 1 }}>
                  <a href={reference} target="_blank" rel="noopener noreferrer" style={{ color: theme.palette.primary.main }}>
                    {reference}
                  </a>
                </Typography>
              ))}
            </Box>
          </DashboardCard>
        </Grid>
      }
    </Grid>
  );
};

export default AlertDetail;