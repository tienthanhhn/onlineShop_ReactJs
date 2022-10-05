import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addCart,deleteCart } from "../redux/action";
import {useParams} from "react-router-dom";

const Cart = () => {
    const [product, setProduct] = useState([]);
    const [loading,setLoading] = useState(false);
    const dispatch = useDispatch();
    const state = useSelector((state)=> state.handleCart);

    useEffect(()=> {
        const getProducts = async() =>{
            setLoading(true);
            const response = await fetch(`fakestoreapi.com/products`);
            setProduct(await response.json());
            setLoading(false);
        }
        getProducts();
    }, [])

    const handleDelButton = (product)=>{
        dispatch(deleteCart(product))
    }
    const handleAddButton = (product)=>{
        dispatch(addCart(product))
    }
    
    const cartItems = (product) => {
        return(
            <div className="px-4 my-5 bg-light rounded-3">
                <div className="container py-4">
                    <div className="row justify-content-center">
                        <div key = {product.id} className="col-md-4">
                            <img src={product.image} alt = {product.title} height="200px" width="180px"/>
                        </div>
                        <div className="col-md-4">
                            <h3>{product.title}</h3>
                            <p className="lead fw-bold">
                                {product.qty} X ${product.price}= ${product.qty*product.price}
                            </p>
                            <button className="btn btn-outline-dark me-4" onClick={()=>handleDelButton(product)}>
                                <i className="fa fa-minus"></i>
                            </button>
                            <button className="btn btn-outline-dark me-4" onClick={()=>handleAddButton(product)}>
                                <i className="fa fa-plus"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const emptyCart = () => {
        return(
            <h2>Your Cart is empty</h2>
        )
    }

    return (
        <>
        {state.length === 0 && emptyCart()}
        {state.length !==0 && state.map(cartItems)}
        <div className="checkoutButton">
        <button className="btn btn-outline-dark mb-2 float-end">Check out</button>
        </div>
        </>
    );
}

export default Cart;