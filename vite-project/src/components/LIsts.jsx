import React from 'react'
import TransCard from './TransCard'
const LIsts = ({transaction,setTransaction,word}) => {
  return (
    <div>
  {
              transaction.length>0 && (
                transaction.map((item,i)=>(
                  <TransCard key={item.id} v={word} val={item} transaction={transaction} setTransaction={setTransaction} />
                ))
              )

        }
      </div>
      
    
  )
}

export default LIsts