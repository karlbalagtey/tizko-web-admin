import React, { useState } from 'react';
import { connect } from 'react-redux';

import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

import { searchInputStyle } from './search-input.styles';

import { searchStores } from '../../redux/store/store.actions';

const SearchInput = ({ searchForStores }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const classes = searchInputStyle();

    const handleSearch = (e) => {
        const keyword = e.target.value;
        setSearchTerm(keyword);
        console.log(searchTerm);
    }
    
    const pressEnter = (e) => {
        if(e.key === 'Enter') {
            console.log(searchTerm);
            searchForStores(searchTerm);
        }
    }

    return (
        <div className={classes.search}>
            <div className={classes.searchIcon}>
                <SearchIcon />
            </div>
            <InputBase
                placeholder="Search…"
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                onChange={handleSearch}
                onKeyDown={pressEnter}
                value={searchTerm}
            />
        </div>
    );
};

const mapDispatchToProps = (dispatch) => ({
    searchForStores: (searchTerm) => dispatch(searchStores(searchTerm))
});

export default connect(null, mapDispatchToProps)(SearchInput);
