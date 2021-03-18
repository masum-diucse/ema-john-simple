import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import fakeData from '../../../fakeData';
import { addToDatabaseCart } from '../../../utilities/databaseManager';
import Cart from '../../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
const Shop = () => {
    const first10=fakeData.slice(0,10);
    const [products,setProducts]=useState(first10);
    const [cart,setCart]=useState([]);
    const handleAddProduct=(product)=>{
        const toBeAddedKey=product.key;
        const sameProduct=cart.find(pd=>pd.key===toBeAddedKey);
        console.log(sameProduct);
        let count=1;
        let newCart;
        if(sameProduct){
            count=sameProduct.quantity+1;
            sameProduct.quantity=count;
            const others=cart.filter(pd=>pd.key!==toBeAddedKey);
            newCart=[...others,sameProduct];
        }else{
            product.quantity=1;
            newCart=[...cart,product];
        }   
        setCart(newCart);
        addToDatabaseCart(product.key,count);
    }
    return (
        <div className="shop-container">
            <div className="product-container">
            {
                products.map(pr=><Product 
                    key={pr.key}
                    showAddToCart={true}
                    handleAddProduct={handleAddProduct}
                    product={pr}
                    ></Product>)
            }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="/review">
                         <button className="add-cart-btn">Order Review</button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;