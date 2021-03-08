import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;
const appBarStyles = makeStyles((theme) => ({
    appBar: {
        width: `calc(100% - 64px)`,
        zIndex: theme.zIndex.drawer,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        boxShadow: 'none'
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    marginLeft: {
        marginLeft: 'auto'
    }
}));

export { appBarStyles };
