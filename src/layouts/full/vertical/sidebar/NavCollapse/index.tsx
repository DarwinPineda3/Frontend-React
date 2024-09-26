import React, { useState, useEffect } from 'react';
import { useSelector } from 'src/store/Store';
import { useLocation } from 'react-router-dom';
import {
  ListItemIcon,
  ListItemButton,
  Collapse,
  styled,
  ListItemText,
  useTheme,
} from '@mui/material';
import NavItem from '../NavItem';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { AppState } from 'src/store/Store';

interface NavCollapseProps {
  menu: any;
  level: number;
  pathWithoutLastPart: any;
  pathDirect: any;
  hideMenu: any;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
}

const NavCollapse = ({
  menu,
  level,
  pathWithoutLastPart,
  pathDirect,
  hideMenu,
  onClick
}: NavCollapseProps) => {
  const customizer = useSelector((state: AppState) => state.customizer);
  const Icon = menu?.icon;
  const theme = useTheme();
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const menuIcon =
    level > 1 ? <Icon stroke={1.5} size="1rem" /> : <Icon stroke={1.5} size="1.3rem" />;

  const handleClick = () => {
    setOpen(!open);
  };

  // Function to check if the current route matches or is a deeper route of this menu item
  const isChildActive = (childHref: string) => pathname.startsWith(childHref);

  // Automatically open if the current menu or any of its children are active
  useEffect(() => {
    if (menu.children?.some((child: any) => isChildActive(child.href))) {
      setOpen(true); // Open the parent if any child is active
    }
  }, [pathname, menu.children]);

  const ListItemStyled = styled(ListItemButton)(() => ({
    marginBottom: '2px',
    padding: '8px 10px',
    paddingLeft: hideMenu ? '10px' : level > 2 ? `${level * 15}px` : '10px',
    backgroundColor: isChildActive(menu.href) ? 'theme.palette.primary.light' : '',
    whiteSpace: 'nowrap',
    '&:hover': {
      backgroundColor: pathname.includes(menu.href) || open
        ? theme.palette.primary.main
        : theme.palette.primary.light,
      color: pathname.includes(menu.href) || open ? 'white' : theme.palette.primary.main,
    },
    color:
      isChildActive(menu.href)
        ? theme.palette.primary.main
        : `inherit` && level > 1 && open
        ? theme.palette.primary.main
        : theme.palette.text.secondary,
    borderRadius: `${customizer.borderRadius}px`,
  }));

  const submenus = menu.children?.map((item: any) => {
    if (item.children) {
      return (
        <NavCollapse
          key={item?.id}
          menu={item}
          level={level + 1}
          pathWithoutLastPart={pathWithoutLastPart}
          pathDirect={pathDirect}
          hideMenu={hideMenu}
          onClick={onClick}
        />
      );
    } else {
      return (
        <NavItem
          key={item.id}
          item={item}
          level={level + 1}
          pathDirect={pathDirect}
          hideMenu={hideMenu}
          onClick={onClick}
        />
      );
    }
  });

  return (
    <>
      <ListItemStyled
        onClick={handleClick}
        selected={isChildActive(menu.href)} // Highlight if this or any child route matches
        key={menu?.id}
      >
        <ListItemIcon
          sx={{
            minWidth: '36px',
            p: '3px 0',
            color: 'inherit',
          }}
        >
          {menuIcon}
        </ListItemIcon>
        <ListItemText color="inherit">{hideMenu ? '' : <>{t(`${menu.title}`)}</>}</ListItemText>
        {!open ? <IconChevronDown size="1rem" /> : <IconChevronUp size="1rem" />}
      </ListItemStyled>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {submenus}
      </Collapse>
    </>
  );
};

export default NavCollapse;
