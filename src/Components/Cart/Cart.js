import React from 'react';
import './Cart.css'
const Cart = (props) => {
    const cart=props.cart;
    const totalPrice=cart.reduce((totalPrice,product)=>totalPrice+product.price,0);
    let shippingCost=0;
    if(cart.length>0){
        if(totalPrice>35){
            shippingCost=0;
        }else if(totalPrice>15){
            shippingCost=4.99;
        }else{
            shippingCost=12.99;
        }
    }
    const tax=totalPrice*.1;
    const grandTotal=totalPrice+shippingCost+tax;
    const formatNumber=number=>{
        const precision=number.toFixed(2);
        const precisionInNumber=Number(precision)
        return precisionInNumber;
        
    }


    return (
        <div className="cart">
            <h2>Order Summary</h2>
            <h3>Items Ordered:{cart.length}</h3>
            <table>
                <tr>
                    <td>Items:</td>
                    <td className="price-alignment">${formatNumber(totalPrice)}</td>
                </tr>
                <tr>
                    <td>Shipping & Handling:</td>
                    <td className="price-alignment">${formatNumber(shippingCost)}</td>
                </tr>
                <tr>
                    <td>Total before tax:</td>
                    <td className="price-alignment">${formatNumber(totalPrice)}</td>
                </tr>
                <tr>
                    <td>Estimated Tax:</td>
                    <td className="price-alignment">${formatNumber(tax)}</td>
                </tr>
                <tr className="price-highlight">
                    <td>Order Total:</td>
                    <td className="price-alignment">${Math.round(grandTotal)}</td>
                </tr>
            </table>   
        </div>
    );
};

export default Cart;