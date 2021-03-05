import React from 'react';
import { Link } from 'react-router-dom';

import { TableRow, TableCell, Checkbox, Button } from '@material-ui/core';
import { useStyles } from './table-row.styles';

const EnhancedTableRow = ({
    store,
    index,
    onHandleCheckClick,
    onIsSelected,
}) => {
    const classes = useStyles();
    const isItemSelected = onIsSelected(store.id);
    const labelId = `enhanced-table-checkbox-${index}`;

    const setHandleCheckClick = (e, storeId) => {
        onHandleCheckClick(e, storeId);
    };

    return (
        <TableRow hover role="checkbox" tabIndex={-1}>
            <TableCell
                onClick={(event) => setHandleCheckClick(event, store.id)}
                padding="checkbox"
            >
                <Checkbox
                    checked={isItemSelected}
                    inputProps={{
                        'aria-labelledby': labelId,
                    }}
                />
            </TableCell>
            <TableCell scope="row">
                <Link to={`/dashboard/store/${store.id}`} className={classes.linkText}>
                    <Button color="primary" size="large">
                        {store.name}
                    </Button>
                </Link>
            </TableCell>
            <TableCell>{store.location}</TableCell>
            <TableCell>{store.contactNumber}</TableCell>
            <TableCell>{store.created}</TableCell>
            <TableCell>{store.updated}</TableCell>
        </TableRow>
    );
};

export default EnhancedTableRow;
