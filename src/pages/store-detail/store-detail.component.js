import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentStore } from '../../redux/store/store.selector';
import PrimarySearchAppBar from '../../components/sub-bar/sub-bar.component';

const StoreDetailPage = ({ store }) => {
    return (
        <Fragment>
            {store && (
                <Fragment>
                    <PrimarySearchAppBar title={store.data.name} />
                    <div>
                        {store.data.name}
                    </div>
                </Fragment>
            )}
        </Fragment>

    )
}

const mapStateToProps = createStructuredSelector({
    store: selectCurrentStore
});

export default connect(mapStateToProps, null)(StoreDetailPage);
