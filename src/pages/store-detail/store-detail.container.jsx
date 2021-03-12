import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { useParams } from 'react-router-dom';
import { createStructuredSelector } from "reselect";

import { selectStoreDetail } from "../../redux/store/store.selector";
import { getStoreDetails } from '../../redux/store/store.actions';
import Spinner from "../../components/spinner/spinner.component";
import StoreDetailPage from './store-detail.component';

const StoreDetailComponent = ({ getStoreDetailsInfo, store }) => {
    const { storeId } = useParams();

    useEffect(() => {
        getStoreDetailsInfo(storeId);
    }, [storeId]);

    return store ? <StoreDetailPage store={store} /> : <Spinner />
}

const mapStateToProps = createStructuredSelector({
    store: selectStoreDetail,
})

const mapDispatchToProps = (dispatch) => ({
    getStoreDetailsInfo: (storeId) => dispatch(getStoreDetails(storeId))
});

export default connect(mapStateToProps, mapDispatchToProps)(StoreDetailComponent);