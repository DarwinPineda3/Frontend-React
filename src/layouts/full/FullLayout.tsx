import { FC } from 'react';
import { styled, Container, Box, useTheme, Button } from '@mui/material';
import { useSelector } from 'src/store/Store';
import { Outlet, Link } from 'react-router-dom';
import { AppState } from 'src/store/Store';
import Header from './vertical/header/Header';
import Sidebar from './vertical/sidebar/Sidebar';
import Customizer from './shared/customizer/Customizer';
import Navigation from '../full/horizontal/navbar/Navigation';
import HorizontalHeader from '../full/horizontal/header/Header';

const MainWrapper = styled('div')(() => ({
  display: 'flex',
  minHeight: '100vh',
  width: '100%',
}));

const PageWrapper = styled('div')(() => ({
  display: 'flex',
  flexGrow: 1,
  flexDirection: 'column',
  paddingBottom: '60px',
  zIndex: 1,
  width: '100%',
  backgroundColor: 'transparent',
}));

const FullLayout: FC = () => {
  const customizer = useSelector((state: AppState) => state.customizer);
  const theme = useTheme();

  return (
    <MainWrapper>
      {/* ------------------------------------------- */}
      {/* Sidebar */}
      {/* ------------------------------------------- */}
      {customizer.isHorizontal ? '' : <Sidebar />}
      {/* ------------------------------------------- */}
      {/* Main Wrapper */}
      {/* ------------------------------------------- */}
      <PageWrapper
        className="page-wrapper"
        sx={{
          ...(customizer.isCollapse && {
            [theme.breakpoints.up('lg')]: { ml: `${customizer.MiniSidebarWidth}px` },
          }),
        }}
      >
        {/* ------------------------------------------- */}
        {/* Header */}
        {/* ------------------------------------------- */}
        {customizer.isHorizontal ? <HorizontalHeader /> : <Header />}
        {/* PageContent */}
        {customizer.isHorizontal ? <Navigation /> : ''}
        <Container
          sx={{
            maxWidth: customizer.isLayout === 'boxed' ? 'lg' : '100%!important',
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: 'calc(100vh - 170px)', // Ajuste para mantener el espacio
          }}
        >
          {/* ------------------------------------------- */}
          {/* PageContent */}
          {/* ------------------------------------------- */}
          <Box sx={{ flexGrow: 1 }}>
            <Outlet />
          </Box>

          {/* ------------------------------------------- */}
          {/* Botón para acceder a AiSolution */}
          {/* ------------------------------------------- */}
          <Box sx={{ textAlign: 'center', marginTop: 'auto', marginBottom: '20px' }}>
            <Link to="/aisolution">
              <Button
                variant="contained"
                color="primary"
                sx={{
                  padding: '10px 20px',
                  fontSize: '16px',
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
                  '&:hover': {
                    backgroundColor: 'primary.dark', 
                  },
                }}
              >
                Ir a AiSolution
              </Button>
            </Link>
          </Box> 

          {/* ------------------------------------------- */}
          {/* End Page */}
          {/* ------------------------------------------- */}
        </Container>
        <Customizer />
      </PageWrapper>
    </MainWrapper>
  );
};

export default FullLayout;
