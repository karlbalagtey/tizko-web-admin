import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import { selectIsUserSubmitting } from "../../redux/user/user.selector";
import WithSpinner from "../../components/with-spinner/with-spinner.component";
import StoreSignUpPage from "./store-sign-up.component";

const mapStateToProps = createStructuredSelector({
    isLoading: state => selectIsUserSubmitting(state)
});

const StoreSignUpPageContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(StoreSignUpPage);

export default StoreSignUpPageContainer;