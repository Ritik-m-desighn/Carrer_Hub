import React from 'react'
import Footer from './Footer'
import { useState } from 'react'

const ProductCard = ({products,setProducts}) => {
     const [count,setCount]=useState(0);
     const [sum,setSum]=useState(0);
     const add=(i)=>{
      for(let k=0;k<products.length;k++){
          if(products[k].id==i&&products[k].quantity==0){
            return;
          }}
        setCount(count+1);
            let newpro=products.map((item,idx)=>(
                i==item.id?{...item,quantity:item.quantity-1}:{...item}
            ))
          for(let j=0;j<products.length;j++){
          if(products[j].id==i){
            setSum(Number(products[j].price+sum))
          }
      }
            setProducts(newpro)
     }

  return (
    <div >
        <div className='flex gap-5 w-full'>
            {products.map((item,i)=>(
              <div key={item.id}>
                 <div className='bg-gray-500 w-32 h-46 tracking-tighter 3'>
         <p>NAME-{item.name}</p>
         <p>PRICE-{item.price}</p>
         <p>RATING-{item.rating}</p>
         <p>QUANTITY-{item.quantity}</p>
         <div className=' flex gap-3'>
         <button className='bg-green-400 rounded-2xl p-1 ' onClick={()=>add(item.id)} >ADD</button>
         </div>
        </div>
        </div>
            ))}
        </div>
         <Footer count={count} sum={sum}/>
    </div>
  )
}

export default ProductCard