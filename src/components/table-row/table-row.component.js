import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { TableRow, TableCell, Checkbox, Button } from '@material-ui/core';
import { useStyles } from './table-row.styles';
import WithSpinner from '../with-spinner/with-spinner.component';

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
        <TableRow role="checkbox" tabIndex={-1}>
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
                    <Button color="primary" size="large" className={classes.buttonLeft}>
                        {store.name}
                    </Button>
                </Link>
            </TableCell>
            <TableCell>{store.location}</TableCell>
            <TableCell>{store.contactNumber}</TableCell>
            <TableCell>{moment(store.created).format('ll')}</TableCell>
            <TableCell>{moment(store.updated).fromNow()}</TableCell>
        </TableRow>
    );
};

export default WithSpinner(EnhancedTableRow);
