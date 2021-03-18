import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import happyImage from '../../images/giphy.gif';
import { useHistory } from 'react-router';

const Review = () => {
    const [carts,setCarts]=useState([]);
    const [orderPlaced,setOrderPlaced]=useState(false);
    useEffect(()=>{
        const savedCart=getDatabaseCart();
        const productKeys=Object.keys(savedCart);
        // const productCounts=Object.values(savedCart);
        const cartProducts=productKeys.map(key=>{
            const product=fakeData.find(pd=>pd.key===key);
            product.quantity=savedCart[key];
            return product;
        });
        setCarts(cartProducts);
    },[])

    const history=useHistory();
    const handleProceedCheckout=()=>{
        // setOrderPlaced(true);
        // setCarts([]);
        // processOrder();
        history.push('/shipment');
    }

    const handleRemoveItem=(productKey )=>{
            const newCarts=carts.filter(pd=>pd.key!==productKey);
            setCarts(newCarts);
            removeFromDatabaseCart(productKey);
    }

    const thankYou= <img src={happyImage} alt=""/>;
    return (
        <div className="shop-container">
            <div className="product-container">
            { 
                carts.map(pd=><ReviewItem 
                key={pd.key} 
                product={pd}
                handleRemoveItem={handleRemoveItem}
                ></ReviewItem>)
            }
            {
                orderPlaced && thankYou
            }

        </div>
        <div className="cart-container">
            <Cart cart={carts}>
                <button onClick={handleProceedCheckout} className="add-cart-btn">Proceed Checkout</button>
            </Cart>    
        </div>
        </div>
    );
};

export default Review;