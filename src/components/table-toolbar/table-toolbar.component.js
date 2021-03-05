import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import SendIcon from '@material-ui/icons/Send';
import PageviewIcon from '@material-ui/icons/Pageview';
import PrintIcon from '@material-ui/icons/Print';
import FilterListIcon from '@material-ui/icons/FilterList';

import clsx from 'clsx';

import { useToolbarStyles } from './table-toolbar.styles';

const TableToolbar = (props) => {
    const classes = useToolbarStyles();
    const { numSelected } = props;

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            {numSelected > 0 ? (
                <Typography
                    className={classes.title}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    className={classes.title}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Stores
                </Typography>
            )}

            {numSelected > 1 ? (
                <Fragment>
                    <Tooltip title="Send email">
                        <IconButton aria-label="send">
                            <SendIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Print">
                        <IconButton aria-label="print">
                            <PrintIcon />
                        </IconButton>
                    </Tooltip>
                </Fragment>
            ) : numSelected === 1 ? (
                <Fragment>
                    <Tooltip title="View page">
                        <IconButton aria-label="pageview">
                            <PageviewIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Send email">
                        <IconButton aria-label="send">
                            <SendIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Print">
                        <IconButton aria-label="print">
                            <PrintIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <IconButton aria-label="delete">
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </Fragment>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton aria-label="filter list">
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
};

TableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

export default TableToolbar;