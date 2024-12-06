import {
  Box,
  Grid
} from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'src/store/Store';

import { useParams } from 'react-router';
import Loader from 'src/components/shared/Loader/Loader';
import { fetchWPScanById } from 'src/store/vulnerabilities/web/WPScanSlice';
import WPSFindings from './wpscanFindings';
import WPSMainTheme from './wpscanMainTheme';
import WPSPlugins from './wpscanPlugings';
import WpScanTopBar from './wpscanTopBar';
import WpScanTopCards from './wpScantopCards';
import WPSBackups from './wpscanBackups';
import WPSUsers from './wpscanUsers';


const WpScanDetail: React.FC = () => {
  const { scanId } = useParams<{ scanId?: string }>();
  const dispatch = useDispatch();
  const wpscan = useSelector((state: any) => state.wpscanReducer.wpscan);
  const isLoading = useSelector((state: any) => state.wpscanReducer.isLoading);

  React.useEffect(() => {
    const fetchData = async () => {
      if (scanId) {
        try {
          await dispatch(fetchWPScanById(scanId));
        } catch (error) {
          console.error('Error fetching wpscans:', error);
        }
      }
    };

    fetchData();
  }, [scanId, dispatch]);

  const usersCount = wpscan?.users ? Object.keys(wpscan?.users).length : 0;

  const wpscanData: { severity: 'critical' | 'high' | 'medium' | 'low'; value: string }[] = [
    { severity: 'critical', value: wpscan?.count_vulnerabulities || 0 },
    { severity: 'high', value: wpscan?.count_outdated_plugins || 0 },
    { severity: 'medium', value: usersCount.toString() },
    { severity: 'low', value: wpscan?.interesting_findings.length || 0 },
  ];

  const config_backups_list = [
    {
      "found_by": "Direct Access (Aggressive Detection)",
      "confidence": 100,
      "interesting_entries": [],
      "confirmed_by": {},
      "name": "http://107.173.154.73/wp-config.php.save"
    },
    {
      "found_by": "Direct Access (Aggressive Detection)",
      "confidence": 100,
      "interesting_entries": [],
      "confirmed_by": {},
      "name": "http://107.173.154.73/wp-config.php1"
    }
  ]

  const users = {
			"user": {
				"id": null,
				"found_by": "Rss Generator (Passive Detection)",
				"confidence": 100,
				"interesting_entries": [],
				"confirmed_by": {
					"Wp Json Api (Aggressive Detection)": {
						"confidence": 100,
						"interesting_entries": [
							"https://prueba-tu-pala.ofertasdepadel.com/wp-json/wp/v2/users/?per_page=100&page=1"
						]
					},
					"Oembed API - Author URL (Aggressive Detection)": {
						"confidence": 90,
						"interesting_entries": [
							"https://prueba-tu-pala.ofertasdepadel.com/wp-json/oembed/1.0/embed?url=https://prueba-tu-pala.ofertasdepadel.com/&format=json"
						]
					},
					"Rss Generator (Aggressive Detection)": {
						"confidence": 50,
						"interesting_entries": []
					},
					"Yoast Seo Author Sitemap (Aggressive Detection)": {
						"confidence": 100,
						"interesting_entries": [
							"https://prueba-tu-pala.ofertasdepadel.com/author-sitemap.xml"
						]
					},
					"Author Id Brute Forcing - Author Pattern (Aggressive Detection)": {
						"confidence": 100,
						"interesting_entries": []
					}
				}
			},
			"webnewe-eco": {
				"id": 4,
				"found_by": "Author Id Brute Forcing - Author Pattern (Aggressive Detection)",
				"confidence": 100,
				"interesting_entries": [],
				"confirmed_by": {}
			}
		}

  return (
    <Grid container spacing={3}>
      {isLoading ? (
        <Grid item xs={12} xl={12}>
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
            <Loader />
          </Box>
        </Grid>
      ) : (
        <>
          <Grid item xs={12} xl={12}>
            <WpScanTopBar status={wpscan?.version?.status} version={wpscan?.version?.number} site_url={wpscan?.target_url} effective_url={wpscan?.effective_url} />
          </Grid>
          <Grid item xs={12} xl={12}>
            <WpScanTopCards data={wpscanData} />
          </Grid>
          <Grid item xs={12} xl={6}>
            <WPSMainTheme main_theme={wpscan?.main_theme} />
          </Grid>
          <Grid item xs={12} xl={6}>
            <WPSPlugins plugins_list={wpscan?.plugins_list} scanId={scanId} />
          </Grid>
          <Grid item xs={12} xl={12}>
            <WPSFindings findings={wpscan?.interesting_findings} scanId={scanId} />
          </Grid>
          <Grid item xs={12} xl={12}>
            {/* <WPSBackups backups={wpscan?.config_backups_list} scanId={scanId} /> desbloquear antes de subir a commit */}
            <WPSBackups backups={config_backups_list} scanId={scanId} />
          </Grid>
          <Grid item xs={12} xl={12}>
            {/* <WPSUsers users={wpscan?.users} /> */}
            <WPSUsers users={users} />
          </Grid>
        </>
      )}

    </Grid>
  );
};

export default WpScanDetail;
