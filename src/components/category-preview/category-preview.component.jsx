import { Link } from 'react-router-dom';

import ProductCard from '../product-card/product-card.component';
import './category-preview.style.css';
import Spinner from '../spinner/spinner.component';
import { selectCategoriesIsLoading } from '../../store/categories/category.selector';
import { useSelector } from 'react-redux';
import { Fragment } from 'react';

const CategoryPreview = ({title, products}) => {

    const isLoading = useSelector(selectCategoriesIsLoading);

    return (
        <Fragment>
            { isLoading ? (<Spinner/>) : (
                <div className='category-preview-container'>
                    <h2>
                        <Link className='title' to={title}>{title.toUpperCase()}</Link>
                    </h2>
                    <div className='preview'>
                        {
                            products
                            .filter((_, idx) => idx < 4)
                            .map((product) => (
                                <ProductCard key={product.id} product={product}></ProductCard>
                            ))
                        }
                    </div>
                </div>
            )}
        </Fragment>
    )
};

export default CategoryPreview;