import { makeStyles } from '@material-ui/core/styles';

const useSubBarStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    colorSecondary: {
        backgroundColor: theme.palette.primary.light
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    searchMarginLeft: {
        marginLeft: '30px'
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
}));

export { useSubBarStyles };