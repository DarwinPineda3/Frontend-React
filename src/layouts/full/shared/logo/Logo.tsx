import { FC } from 'react';
import { useSelector } from 'src/store/Store';
import { Link } from 'react-router-dom';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import LogoDark from 'src/assets/images/logos/akila_logo_compressed.png';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import LogoDarkRTL from 'src/assets/images/logos/akila_logo_compressed.png';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import LogoLight from 'src/assets/images/logos/akila_white_logo_compressed.png';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import LogoLightRTL from 'src/assets/images/logos/akila_white_logo_compressed.png';
import { styled } from '@mui/material';
import { AppState } from 'src/store/Store';

const Logo: FC = () => {
  const customizer = useSelector((state: AppState) => state.customizer);
  const LinkStyled = styled(Link)(() => ({
    height: customizer.TopbarHeight,
    width: customizer.isCollapse ? '40px' : '180px',
    overflow: 'hidden',
    display: 'block',
  }));

  if (customizer.activeDir === 'ltr') {
    return (
      <LinkStyled
        to="/"
        style={{
          display: 'flex',
          alignItems: 'center',
          marginTop: 5,
          marginLeft: 15
        }}
      >
        {customizer.activeMode === 'dark' ? (
          <img style={{maxWidth: '100%'}} src={LogoLight} />
        ) : (
          <img style={{maxWidth: '100%'}} src={LogoDark} />
        )}
      </LinkStyled>
    );
  }

  return (
    <LinkStyled
      to="/"
      style={{
        display: 'flex',
        alignItems: 'center',
          maxWidth: '100%'
      }}
    >
      {customizer.activeMode === 'dark' ? (
        <img style={{maxWidth: '100%'}} src={LogoLightRTL} />
      ) : (
        <img style={{maxWidth: '100%'}} src={LogoDarkRTL} />
      )}
    </LinkStyled>
  );
};

export default Logo;
