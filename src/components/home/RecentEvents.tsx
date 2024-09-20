import React, { useEffect } from 'react';
import {
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
  timelineOppositeContentClasses,
} from '@mui/lab';
import { Link, Typography, Box } from '@mui/material';
import Timeline from '@mui/lab/Timeline';
import DashboardCard from '../shared/DashboardCard';
import Loader from '../shared/Loader/Loader'; // Loader component

import { useDispatch, useSelector } from 'src/store/Store'; // Correct imports
import { fetchRecentEventsData } from 'src/store/sections/dashboard/RecentEventsSlice';
import { AppState } from 'src/store/Store';

const RecentEvents = () => {
  const dispatch = useDispatch();
  const { loading, events, error } = useSelector((state: AppState) => state.dashboard.recentEvents);

  useEffect(() => {
    dispatch(fetchRecentEventsData());
  }, [dispatch]);

  if (loading) {
    return (
    <DashboardCard title="Recent Events">
      <Box display="flex" justifyContent="center" mt={4} mb={4}>
        <Loader />
      </Box>
    </DashboardCard>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <DashboardCard title="Recent Events">
      <Timeline
        className="theme-timeline"
        sx={{
          p: 0,
          mb: '-40px',
          [`& .${timelineOppositeContentClasses.root}`]: {
            flex: 0.5,
            paddingLeft: 0,
          },
        }} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}      >
        {events.map((event, index) => (
          <TimelineItem key={index}>
            <TimelineOppositeContent>{event.time}</TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color={event.color} variant="outlined" />
              {index < events.length - 1 && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent>
              <Typography fontWeight="600">{event.description}</Typography>
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
