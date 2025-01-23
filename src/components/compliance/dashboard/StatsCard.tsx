import { Card, CardContent, CardHeader, Grid, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { styled } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { FaCubes, FaServer, FaTasks, FaUsers } from 'react-icons/fa';
import { fetchAssetsStatistics, fetchProjectsStatistics, fetchTemplatesStatistics, fetchUserStatistics } from 'src/store/sections/compliance/giottoDashboardSlice';
import { useDispatch, useSelector } from 'src/store/Store';

interface StatsCardProps {
  title: string;
  icon: React.ReactNode;
  data: { label: string; value: number | string }[];
  className: string;
}

const StyledCardHeader = styled(CardHeader)(({ theme }) => ({
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: '1.25rem',
  '&.bg-orange': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  '&.bg-rose': {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
  },
}));

const StatsCard: React.FC<StatsCardProps> = ({ title, icon, data, className }) => {
  return (
    <Card className="stats-card">
      <StyledCardHeader className={className} avatar={icon} title={title} />
      <CardContent>
        <TableContainer>
          <Table size="small">
            <TableBody>
              {data.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.label}</TableCell>
                  <TableCell>{row.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

const StatsCardGrid: React.FC = () => {
  const dispatch = useDispatch();
  const [stats, setStats] = useState({
    users: { adminUsersCount: 0, managerUsersCount: 0, technicianUsersCount: 0 },
    projects: { projectsCount: 0, groupsCount: 0, assetsCount: 0 },
    templates: { templatesCount: 0, controlsCount: 0, enabledControlsCount: 0 },
    assets: {
      assetsCountWithAssessment: 0,
      assetsCountWithHardening: 0,
      assetsCountWithRollback: 0
    },
  });

  const { usersResponse, projectsResponse, templatesResponse, assetsResponse } = useSelector((state) => state.giottoDashboardSlice);
  useEffect(() => {
    dispatch(fetchUserStatistics());
    dispatch(fetchProjectsStatistics());
    dispatch(fetchTemplatesStatistics());
    dispatch(fetchAssetsStatistics());
  }, [dispatch]);

  useEffect(() => {
    if (usersResponse && projectsResponse && templatesResponse && assetsResponse) {
      setStats({
        users: usersResponse,
        projects: projectsResponse,
        templates: templatesResponse,
        assets: assetsResponse,
      });
    }
  }, [usersResponse, projectsResponse, templatesResponse, assetsResponse]);

  return (
    <Grid container spacing={3}>
      {/* Cards Section */}
      <Grid item xs={12} sm={6} md={3}>
        <StatsCard
          title="Users"
          icon={<FaUsers />}
          className="bg-orange"
          data={[
            { label: 'Admins', value: stats.users.adminUsersCount },
            { label: 'Project Managers', value: stats.users.managerUsersCount },
            { label: 'Technicians', value: stats.users.technicianUsersCount },
          ]}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatsCard
          title="Projects"
          icon={<FaCubes />}
          className="bg-rose"
          data={[
            { label: 'Projects', value: stats.projects.projectsCount },
            { label: 'Groups', value: stats.projects.groupsCount },
            { label: 'Assets', value: stats.projects.assetsCount },
          ]}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatsCard
          title="Templates"
          icon={<FaTasks />}
          className="bg-orange"
          data={[
            { label: 'Templates', value: stats.templates.templatesCount },
            { label: 'Available Controls', value: stats.templates.controlsCount },
            { label: 'Enabled Controls', value: stats.templates.enabledControlsCount },
          ]}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatsCard
          title="Assets"
          icon={<FaServer />}
          className="bg-rose"
          data={[
            { label: 'With Assessment', value: stats.assets.assetsCountWithAssessment },
            { label: 'With Hardening', value: stats.assets.assetsCountWithHardening },
            { label: 'With Rollback', value: stats.assets.assetsCountWithRollback },
          ]}
        />
      </Grid>
    </Grid>
  );
};

export default StatsCardGrid;
