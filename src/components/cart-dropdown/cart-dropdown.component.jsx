import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';

import { selectCartItems } from '../../store/cart/cart.selector';
import {CartDropdownContianer, EmptyMessage, CartItems} from './cart-dropdown.style';


const CartDropdown = () => {

    const cartItems = useSelector(selectCartItems);
    const navigate = useNavigate();

    const goToCheckoutHandler = () => {
        navigate('/checkout');
    }

    return (
        <CartDropdownContianer>
            <CartItems>
                {
                    cartItems.length ? ( 
                        cartItems.map((item) => (
                            <CartItem key={item.id} cartItem={item}></CartItem>
                        ))
                    ) : (
                        <EmptyMessage>Your cart is empty</EmptyMessage>
                    )                 
                }
            </CartItems>
            <Button onClick={goToCheckoutHandler}>CHECKOUT</Button>
        </CartDropdownContianer>
    )
};

export default CartDropdown;