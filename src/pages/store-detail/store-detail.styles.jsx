import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    paper: {
        height: 240,
        padding: theme.spacing(2),
        display: "flex",
        overflow: "auto",
        flexDirection: "column",
    },
}));

export { useStyles };