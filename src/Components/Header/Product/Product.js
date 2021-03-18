import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Product = (props) => {
    // console.log(props);
    const { img, name, seller, price, stock,key } = props.product;
    return (
        <div className="product">
            <div>
                <img src={img} alt="" />
            </div>
            <div className="product-details">
            <h3><Link to={"/product/"+key}>{name}</Link></h3>
                <p>By: {seller}</p>
                <h2>${price}</h2>
                <p>only {stock} left in stock - order soon</p>
                { props.showAddToCart && <button 
                className="add-cart-btn" 
                onClick={()=>props.handleAddProduct(props.product)}
                ><FontAwesomeIcon icon={faShoppingCart} /> Add to Cart</button>}
            </div>
        </div>
    );
};

export default Product;