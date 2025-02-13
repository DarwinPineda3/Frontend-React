import {
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  timelineOppositeContentClasses,
  TimelineSeparator,
} from '@mui/lab';
import Timeline from '@mui/lab/Timeline';
import { Box, Link, Typography } from '@mui/material';
import { useEffect } from 'react';
import DashboardCard from '../shared/DashboardCard';
import Loader from '../shared/Loader/Loader';

import { useTranslation } from 'react-i18next';
import { fetchRecentEventsData } from 'src/store/sections/dashboard/RecentEventsSlice';
import { AppState, useDispatch, useSelector } from 'src/store/Store';
import EmptyState from '../shared/EmptyState';
import HumanizedDate from '../shared/HumanizedDate';

const RecentEvents = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { loading, events, error } = useSelector((state: AppState) => state.dashboard.recentEvents);

  useEffect(() => {
    dispatch(fetchRecentEventsData());
  }, [dispatch]);


  const clickHandler = (event: any) => {

    const { tool, id } = event;

    let url = '';
    if (tool === 'Network') {
      url = `/vulnerabilities/network/scans/detail/${id}`;
    } else if (tool === 'Web App') {
      url = `/vulnerabilities/web/applications/${id}`;
    } else if (tool === 'WordPress') {
      url = `/vulnerabilities/web/wordpress/${id}`;
    } else if (tool === 'Cloud') {
      url = `/vulnerabilities/cloud/vulnerabilities/${id}`;
    } else if (tool === 'Applications') {
      url = `/vulnerabilities/web/applications/${id}`;
    }
    return url;
  }
  if (loading) {
    return (
      <DashboardCard title={t("dashboard.recent_events") as string}>
        <Box display="flex" justifyContent="center" mt={4} mb={4}>
          <Loader />
        </Box>
      </DashboardCard>
    );
  }

  if (error) {
    return <div>{t("dashboard.error", { error })}</div>;
  }

  if (events.length === 0) {
    return (
      <DashboardCard title={t("dashboard.recent_events") as string}>
        <EmptyState />
      </DashboardCard>
    );
  }
  return (
    <DashboardCard title={t("dashboard.recent_events") as string}>
      {/*@ts-ignore*/}
      <Timeline
        className="theme-timeline"
        sx={{
          p: 0,
          mb: '-40px',
          maxHeight: '400px',
          overflowY: 'auto',
          [`& .${timelineOppositeContentClasses.root}`]: {
            flex: 0.5,
            paddingLeft: 0,
          },
        }}
      >
        {events.map((event, index) => (
          <TimelineItem key={index}>
            <TimelineOppositeContent>
              <Link href={clickHandler(event)}>
                <HumanizedDate dateString={event.date} />
              </Link>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot variant="outlined" />
              {index < events.length - 1 && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent>
              <Typography fontWeight="600">{event.event}</Typography>
              {event.link && (
                <Link href={event.link} underline="none">
                  {event.link}
                </Link>
              )}
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </DashboardCard>
  );
};

export default RecentEvents;
