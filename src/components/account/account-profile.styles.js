import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
    root: {},
    details: {
        display: 'flex',
        justifyContent: 'center',
    },
    avatar: {
        height: 110,
        width: 100,
        flexShrink: 0,
        flexGrow: 0,
        marginBottom: 20
    },
    uploadButton: {
        marginRight: theme.spacing(2),
    },
}));

export { useStyles };