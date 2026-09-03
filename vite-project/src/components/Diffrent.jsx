
import React from 'react'
import { useState } from 'react'
const Diffrent = ({transaction}) => {
  let expense=0;
  let profit=0;
  let total=0;
  // for(let i=0;i<transaction.length;i++){
  //   if(transaction[i].money<0){
  //         expense+=Number(transaction[i].money)
  //   }
  //   else if(transaction[i].money>0){
  //     profit+=Number(transaction[i].money)
  //   }
  //   total+=Number(transaction[i].money)
  // }
   expense=transaction.reduce((acc,val)=>{
    if(val.money<0){
        return Number(val.money)+acc
    }
    return acc;
   },0)
  return (
    <div className=' flex items-center gap-3'>
      <div 
          className=' bg-gray-600 rounded-xl text-center text-red-400'
          > Expense {expense}</div>
           
          <div 
          className=' bg-gray-600 rounded-xl text-center'
          > Profit {profit}</div>
           <div 
          className=' bg-gray-600 rounded-xl text-center'
          > total {total} </div>
    </div>
  )
}

export default Diffrent