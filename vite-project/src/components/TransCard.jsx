import React from 'react'

const TransCard = ({val,transaction,setTransaction ,v}) => {
const del=(idx)=>{
  let newtrans=transaction.filter((item,i)=>(
    item.id!=idx
  ))
  setTransaction(newtrans)
}
const update=(idx)=>{
  let newtrans=transaction.map((item,i)=>(
    item.id==idx? {...item,
       "money":v }
      
    :{...item}  
  )) 
  setTransaction(newtrans)
}
  return (
    <div>
      <div  className='flex gap-3'>
        <div className={`${val.money>0 ? "text-green-600" : "text-red-600"}` }>
  {val.money}
        </div>
                 <button onClick={()=>del(val.id)} className='bg-red-500 rounded-2xl'>Delete</button>
                  <button onClick={()=>update(val.id)} className='bg-yellow-500 rounded-2xl'>Update</button>

                 
      </div>
      </div>
  )
}

export default TransCard