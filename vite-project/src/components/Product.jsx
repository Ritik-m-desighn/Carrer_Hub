// import React from 'react'
// const Product = ({val,count,setCount, products,setProducts}) => {
//    const add=(idx)=>{
//     let quant=val.quantity;
//             setCount(count+1);
//             let newpro=products.map((item,i)=>(
//                 idx==val.id?{...val,quantity:quant-1}:{...val}
//             ))
//               setProducts(newpro)
//         }
//   return (
//     <div>
        
//          <div className='bg-gray-500 w-32 h-46 tracking-tighter 3'>
//         <p>NAME-{val.name}</p>
//         <p>PRICE-{val.price}</p>
//         <p>RATING-{val.rating}</p>
//         <p>QUANTITY-{val.quantity}</p>
//         <button className='bg-green-400 rounded-2xl p-1 ' onClick={()=>add(val.id)}>ADD</button>
//         </div>
        
//     </div>
//   )
// }

// export default Product