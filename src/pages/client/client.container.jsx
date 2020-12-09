import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import { selectIsUserAccessing } from "../../redux/user/user.selector";
import WithSpinner from "../../components/with-spinner/with-spinner.component";
import ClientPage from "./client.component";

const mapStateToProps = createStructuredSelector({
    isLoading: state => selectIsUserAccessing(state)
});

const ClientPageContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(ClientPage);

export default ClientPageContainer;