import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { Toolbar, Typography, IconButton, Tooltip } from '@material-ui/core';

import ArchiveIcon from '@material-ui/icons/Archive';
import SendIcon from '@material-ui/icons/Send';
import PageviewIcon from '@material-ui/icons/Pageview';
import PrintIcon from '@material-ui/icons/Print';
import FilterListIcon from '@material-ui/icons/FilterList';

import SearchInput from '../../components/search-input/search-input.component';
import { useToolbarStyles } from './table-toolbar.styles';

const TableToolbar = (props) => {
    const { numSelected, handlePressEnter } = props;
    const classes = useToolbarStyles();

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
                <>
                    <SearchInput pressEnter={handlePressEnter} />
                </>
            )}

            {numSelected > 1 ? (
                <>
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
                </>
            ) : numSelected === 1 ? (
                <>
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
                    <Tooltip title="Archive">
                        <IconButton aria-label="archive">
                            <ArchiveIcon />
                        </IconButton>
                    </Tooltip>
                </>
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
