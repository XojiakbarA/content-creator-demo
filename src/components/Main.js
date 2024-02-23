import {styled} from "@mui/material";

export const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'leftDrawerOpen' && prop !== 'rightDrawerOpen' && prop !== 'drawerWidth' })(
    ({ theme, leftDrawerOpen, rightDrawerOpen, drawerWidth }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(leftDrawerOpen && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
        marginRight: `-${drawerWidth}px`,
        ...(rightDrawerOpen && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginRight: 0,
        }),
    }),
);