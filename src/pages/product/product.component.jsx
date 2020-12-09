import React from "react";

import {
    Grid,
    Container
} from '@material-ui/core';

import ProductForm from '../../components/'

const ProductPage = () => (
    <Container>
        <Grid>
            <ProductForm />
        </Grid>
    </Container>
);

export default ProductPage;
