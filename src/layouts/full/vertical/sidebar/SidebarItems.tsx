// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Box, List, useMediaQuery } from '@mui/material';
import { useLocation } from 'react-router';
import { getUserGroups } from 'src/guards/jwt/Jwt';
import { AppState, useDispatch, useSelector } from 'src/store/Store';
import { toggleMobileSidebar } from 'src/store/customizer/CustomizerSlice';
import Menuitems, { MenuitemsType } from './MenuItems';
import NavCollapse from './NavCollapse';
import NavGroup from './NavGroup/NavGroup';
import NavItem from './NavItem';

const SidebarItems = () => {
  const { pathname } = useLocation();
  const pathDirect = pathname;
  const pathWithoutLastPart = pathname.slice(0, pathname.lastIndexOf('/'));
  const customizer = useSelector((state: AppState) => state.customizer);
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up('lg'));
  const hideMenu: any = lgUp ? customizer.isCollapse && !customizer.isSidebarHover : '';
  const dispatch = useDispatch();

  function filterMenuByPermissions(menu: MenuitemsType[], userGroups: string[]): MenuitemsType[] {
    return menu
      .filter((item) => {
        // Show if user has permission or if it's a navlabel
        return (
          (item.permissions?.some((permission) => userGroups.includes(permission)) ?? false)
        );
      })
      .map((item) => ({
        ...item,
        // Recursively filter children if they exist
        children: item.children ? filterMenuByPermissions(item.children, userGroups) : undefined,
      }));
  }
  const userGroups = getUserGroups();
  const filteredMenu = filterMenuByPermissions(Menuitems, userGroups);
  return (
    <Box sx={{ px: 3 }}>
      <List sx={{ pt: 0 }} className="sidebarNav">
        {filteredMenu.map((item) => {
          // {/********SubHeader**********/}
          if (item.subheader) {
            return <NavGroup item={item} hideMenu={hideMenu} key={item.subheader} />;

            // {/********If Sub Menu**********/}
            /* eslint no-else-return: "off" */
          } else if (item.children) {
            return (
              <NavCollapse
                menu={item}
                pathDirect={pathDirect}
                hideMenu={hideMenu}
                pathWithoutLastPart={pathWithoutLastPart}
                level={1}
                key={item.id}
                onClick={() => dispatch(toggleMobileSidebar())}
              />
            );

            // {/********If Sub No Menu**********/}
          } else {
            return (
              <NavItem item={item} key={item.id} pathDirect={pathDirect} hideMenu={hideMenu}
                onClick={() => dispatch(toggleMobileSidebar())} />
            );
          }
        })}
      </List>
    </Box>
  );
};
export default SidebarItems;
