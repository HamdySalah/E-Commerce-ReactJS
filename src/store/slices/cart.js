import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState:{
        cartItems:[],
    },
    reducers:{
        addToCart:(state,action)=>{
            const product= action.payload;
            const exist = state.cartItems.find((i)=>i.id == product.id);
            if(exist){
                exist.quantity +=1;
            }else{
                state.cartItems.push({...product,quantity:1});
            }            
        },
        removeFromCart: (state, action)=>{
            state.cartItems= state.cartItems.filter((i)=> i.id !=action.payload);
        },
        incrementByOne:(state, action)=>{
            const product = state.cartItems.find((i)=>i.id === action.payload);
            if(product){
                product.quantity += 1;
            }            
        },
        decreaseByOne:(state, action)=>{
            const product = state.cartItems.find((i)=>i.id === action.payload);
            if(product){
                if(product.quantity > 1){
                    product.quantity -= 1; 
                }else{
                    state.cartItems= state.cartItems.filter((i)=> i.id != product.id);
                }                 
            }
        }
    }
});


export const {
    addToCart,
    removeFromCart,
    incrementByOne,
    decreaseByOne
} = cartSlice.actions;

export default cartSlice.reducer;