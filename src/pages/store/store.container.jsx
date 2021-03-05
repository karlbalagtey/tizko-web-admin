import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import { selectIsStoreLoading } from "../../redux/store/store.selector";
import WithSpinner from "../../components/with-spinner/with-spinner.component";
import StorePage from "./store.component";

const mapStateToProps = createStructuredSelector({
    isLoading: state => selectIsStoreLoading(state)
});

const StorePageContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(StorePage);

export default StorePageContainer;