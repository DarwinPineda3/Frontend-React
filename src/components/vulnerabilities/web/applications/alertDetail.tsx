import React, { useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Chip, Collapse, Grid, Stack, Typography } from '@mui/material';
import Breadcrumb from 'src/components/shared/breadcrumb/Breadcrumb';
import DashboardCard from 'src/components/shared/DashboardCard';
import { IconChevronDown } from '@tabler/icons-react';
import Loader from 'src/components/shared/Loader/Loader';

interface AlertDetailProps {
  alertId: number;
}

const AlertDetail: React.FC<AlertDetailProps> = ({ alertId }) => {
  const [expanded, setExpanded] = useState(false);
  const [aiSolution, setAiSolution] = useState('');
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleAICall = async () =>{
    setAiSolution('...');
    //fake wait 3 seconds
    await new Promise(resolve => setTimeout(resolve, 3000));
    setAiSolution(solution);
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
  const detail = alertDetails[alertId];

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

  if (!detail) {
    return <Typography>No details found for this alert.</Typography>;
  }

  const description = `No Anti-CSRF tokens were found in a HTML submission form.
A cross-site request forgery is an attack that involves forcing a victim to send an HTTP request to a target destination without their knowledge or intent in order to perform an action as the victim. The underlying cause is application functionality using predictable URL/form actions in a repeatable way. The nature of the attack is that CSRF exploits the trust that a web site has for a user. By contrast, cross-site scripting (XSS) exploits the trust that a user has for a web site. Like XSS, CSRF attacks are not necessarily cross-site, but they can be. Cross-site request forgery is also known as CSRF, XSRF, one-click attack, session riding, confused deputy, and sea surf.
CSRF attacks are effective in a number of situations, including:\n
* The victim has an active session on the target site.

* The victim is authenticated via HTTP auth on the target site.

* The victim is on the same local network as the target site.

CSRF has primarily been used to perform an action against a target site using the victim's privileges, but recent techniques have been discovered to disclose information by gaining access to the response. The risk of information disclosure is dramatically increased when the target site is vulnerable to XSS, because XSS can be used as a platform for CSRF, allowing the attack to operate within the bounds of the same-origin policy.
  `;

  const solution = `
  Phase: Architecture and Design

Use a vetted library or framework that does not allow this weakness to occur or provides constructs that make this weakness easier to avoid.

For example, use anti-CSRF packages such as the OWASP CSRFGuard.

Phase: Implementation

Ensure that your application is free of cross-site scripting issues, because most CSRF defenses can be bypassed using attacker-controlled script.

Phase: Architecture and Design

Generate a unique nonce for each form, place the nonce into the form, and verify the nonce upon receipt of the form. Be sure that the nonce is not predictable (CWE-330).

Note that this can be bypassed using XSS.

Identify especially dangerous operations. When the user performs a dangerous operation, send a separate confirmation request to ensure that the user intended to perform that operation.

Note that this can be bypassed using XSS.

Use the ESAPI Session Management control.

This control includes a component for CSRF.

Do not use the GET method for any request that triggers a state change.

Phase: Implementation

Check the HTTP Referer header to see if the request originated from an expected page. This could break legitimate functionality, because users or proxies may have disabled sending the Referer for privacy reasons.
  `;



  return (
    <Grid container spacing={3}>
      <Grid item xs={12} xl={12}>
        <Breadcrumb title="Scan example Title">
          <Box display="flex" flexWrap="wrap" gap={1} mb={3}>
            <Chip label={`CWE Id: 352`} color="primary" variant="outlined" />
            <Chip label={`WASC Id: 9`} color="secondary" variant="outlined" />
            <Chip label={`Plugin Id: 10202`} color="info" variant="outlined" />
          </Box>
        </Breadcrumb>
      </Grid>

      <Grid item xs={12} xl={12}>
        <DashboardCard title="Description">
          <Box sx={{ height: '300px', overflow: 'auto', scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' } }}>
            <Typography sx={{ whiteSpace: 'pre-line' }}>
              {description}
            </Typography>
          </Box>
        </DashboardCard>
      </Grid>

      <Grid item xs={12} xl={aiSolution ? 6 : 12}>
        <DashboardCard title="Solution">
          <Box sx={{ height: '300px', overflow: 'auto', scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' } }}>
            <Typography sx={{ whiteSpace: 'pre-line' }}>
              {solution}
            </Typography>
          </Box>
          <Stack direction="row" justifyContent="end" spacing={2} mt={2}>
            <Button
              variant="outlined"
              color="error"
              onClick={handleAICall}
            >
              Generate AI Solution
            </Button>
          </Stack>
        </DashboardCard>
      </Grid>

      <Grid item xs={12} xl={6}>
          <Collapse in={aiSolution !== ''} timeout={500}>
            <DashboardCard title="Generated AI Solution">
              <Box sx={{ height: '300px', overflow: 'auto', scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' } }}>
                {
                  aiSolution === '...' &&
                  <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                    <Loader/>
                  </Box>
                }
                {
                  aiSolution !== '...' &&
                  <Typography sx={{ whiteSpace: 'pre-line' }}>
                    {aiSolution}
                  </Typography>
                }
              </Box>
            </DashboardCard>
          </Collapse>
        </Grid>

      <Grid item xl={12} xs={12}>
        <DashboardCard title="URLs">
          <Box>
            {alertURLReport.map((alert, index) => (
              <Accordion
                key={index}
                expanded={expanded === `panel${index}`}
                onChange={handleChange(`panel${index}`)}
                sx={{
                  backgroundColor: expanded === `panel${index}` ? '#fccbc5' : '#FEF9F8', // Change color when expanded
                  transition: 'background-color 0.3s ease',
                }}
              >
                <AccordionSummary
                  expandIcon={<IconChevronDown />}
                  aria-controls={`panel${index}bh-content`}
                  id={`panel${index}bh-header`}
                >
                  <Grid container xs={12}>
                    <Grid item xl={8} xs={12}>
                      <Typography variant="h6" sx={{
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 2, // Limits to two lines
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}>
                        {alert.URL}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle2" color="textSecondary">
                        {alert.Método} Method
                      </Typography>
                    </Grid>
                  </Grid>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                    <strong>Ataque:</strong> {alert.Ataque || "None"}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                    <strong>Evidencia:</strong> {alert.Evidencia}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    <strong>Otra Info:</strong> {alert["Otra Info"]}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </DashboardCard>
      </Grid>
    </Grid>
  );
};

export default AlertDetail;