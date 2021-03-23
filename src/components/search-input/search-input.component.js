import React, { useState } from 'react';

import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

import { searchInputStyle } from './search-input.styles';

const SearchInput = ({ pressEnter }) => {
    const classes = searchInputStyle();
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        const keyword = e.target.value;
        setSearchTerm(keyword);
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

export default SearchInput;
