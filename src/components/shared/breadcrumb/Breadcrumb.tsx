// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import { Grid, Typography, Box, Breadcrumbs, Link, Theme } from '@mui/material';
import { NavLink } from 'react-router-dom';

import breadcrumbImg from 'src/assets/images/logos/logoIcon.svg';
import { IconCircle } from '@tabler/icons-react';

interface BreadCrumbType {
  subtitle?: string;
  items?: any[];
  title: string;
  children?: JSX.Element;
}

const Breadcrumb = ({ subtitle, items, title, children }: BreadCrumbType) => (
  <Grid
    container
    sx={{
      backgroundColor: 'error.light',
      borderRadius: (theme: Theme) => theme.shape.borderRadius / 4,
      p: '30px 25px 20px',
      marginBottom: '20px',
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    <Grid item xs={12} sm={6} lg={8} mb={1}>
      <Typography variant="h4">{title}</Typography>
      <Typography color="textSecondary" variant="h6" fontWeight={400} mt={0.8} mb={0}>
        {subtitle}
      </Typography>
      <Breadcrumbs
        separator={
          <IconCircle
            size="5"
            fill="textSecondary"
            fillOpacity={'0.6'}
            style={{ margin: '0 5px' }}
          />
        }
        sx={{ alignItems: 'center', mt: items ? '10px' : '' }}
        aria-label="breadcrumb"
      >
        {items
          ? items.map((item) => (
              <div key={item.title}>
                {item.to ? (
                  <Link underline="none" color="inherit" component={NavLink} to={item.to}>
                    {item.title}
                  </Link>
                ) : (
                  <Typography color="textPrimary">{item.title}</Typography>
                )}
              </div>
            ))
          : children}
      </Breadcrumbs>
    </Grid>
    <Grid item xs={12} sm={6} lg={4} display="flex" alignItems="flex-end">
      <Box
        sx={{
          display: { xs: 'none', md: 'block', lg: 'flex' },
          alignItems: 'center',
          justifyContent: 'flex-end',
          width: '100%',
        }}
      >
        {children&&items ? (
          <Box sx={{ top: '0px', position: 'absolute' }}>{children}</Box>
        ) : (
          <>
            <Box sx={{ bottom: '5px', position: 'absolute' }}>
              <img src={breadcrumbImg} alt={breadcrumbImg} width={'135px'} />
            </Box>
          </>
        )}
      </Box>
    </Grid>
  </Grid>
);

export default Breadcrumb;
