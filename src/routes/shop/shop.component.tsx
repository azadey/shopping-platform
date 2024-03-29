import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';
import { fetchCateoriesStart } from '../../store/categories/category.action';

const Shop = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCateoriesStart());
    }, []);

    return (
        <Routes>
            <Route index element={<CategoriesPreview /> }></Route>
            <Route path=':category' element={<Category />}></Route>
        </Routes>
    );
};

export default Shop;