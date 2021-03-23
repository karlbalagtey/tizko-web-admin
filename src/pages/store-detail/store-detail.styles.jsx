import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    containerTop: {
        marginTop: "20px !important",
    },
    paper: {
        height: 240,
        padding: theme.spacing(2),
        display: "flex",
        overflow: "auto",
        flexDirection: "column",
    },
}));

export { useStyles };