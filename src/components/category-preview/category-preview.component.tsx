import { Fragment, FC } from 'react';
import { useSelector } from 'react-redux';

import ProductCard from '../product-card/product-card.component';
import Spinner from '../spinner/spinner.component';
import { selectCategoriesIsLoading } from '../../store/categories/category.selector';
import { CategoryItem } from '../../store/categories/category.types';

import { 
    CategoryPreviewContainer, 
    Title, 
    Preview 
} from './category-preview.style';


type CategoriesPreviewProps = {
    title: string;
    products: CategoryItem[];
}

const CategoryPreview: FC<CategoriesPreviewProps> = ({title, products}) => {

    const isLoading = useSelector(selectCategoriesIsLoading);

    return (
        <Fragment>
            { isLoading ? (<Spinner/>) : (
                <CategoryPreviewContainer>
                    <h2>
                        <Title className='title' to={title}>{title.toUpperCase()}</Title>
                    </h2>
                    <Preview>
                        {
                            products
                            .filter((_, idx) => idx < 4)
                            .map((product) => (
                                <ProductCard key={product.id} product={product}></ProductCard>
                            ))
                        }
                    </Preview>
                </CategoryPreviewContainer>
            )}
        </Fragment>
    )
};

export default CategoryPreview;