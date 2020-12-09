import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import { selectIsUserSubmitting } from "../../redux/user/user.selector";
import WithSpinner from "../../components/with-spinner/with-spinner.component";
import ClientSignUpPage from "./client-sign-up.component";

const mapStateToProps = createStructuredSelector({
    isLoading: state => selectIsUserSubmitting(state)
});

const ClientSignUpPageContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(ClientSignUpPage);

export default ClientSignUpPageContainer;