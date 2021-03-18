import React from 'react';
import './ReviewItem.css';
const ReviewItem = (props) => {
    console.log(props.product)
    const {name,quantity,key,price}=props.product;
    return (
        <div className="review-item">
            <h3>{name}</h3>
            <p>Quantity:{quantity}</p>
            <p>Price:{price}</p>
            <button onClick={()=>props.handleRemoveItem(key)} className="add-cart-btn">Remove</button>
        </div>
    );
};

export default ReviewItem;