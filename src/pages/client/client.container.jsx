import React, { Fragment, useEffect } from 'react';
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectIsUserAccessing } from "../../redux/user/user.selector";
import { getAllClientsList } from '../../redux/user/user.actions';
import Spinner from "../../components/spinner/spinner.component";
import ClientPage from "./client.component";

const ClientPageContainer = ({ isLoading, getAllClients }) => {
    useEffect(() => {
        getAllClients();
    }, [])

    return (
        <Fragment>
            { isLoading ? <Spinner /> : <ClientPage />}
        </Fragment>
    )
}

const mapStateToProps = createStructuredSelector({
    isLoading: state => selectIsUserAccessing(state)
});

const mapDispatchToProps = (dispatch) => ({
    getAllClients: () => dispatch(getAllClientsList())
});

export default connect(mapStateToProps, mapDispatchToProps)(ClientPageContainer);