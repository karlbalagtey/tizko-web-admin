import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import { selectIsUserAccessing } from "../../redux/user/user.selector";
import WithSpinner from "../../components/with-spinner/with-spinner.component";
import StorePage from "./store.component";

const mapStateToProps = createStructuredSelector({
    isLoading: state => selectIsUserAccessing(state)
});

const StorePageContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(StorePage);

export default StorePageContainer;