import React, { useContext, useEffect, useState } from 'react';
import { PostContext } from '../../Store/postContext';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../../Firebase/config';

import './View.css';

function View() {

  const {postDatail} = useContext(PostContext)
  const [seller,setSeller] = useState('')

  useEffect(()=>{

    const {userId} = postDatail
    const userCollection = collection(firestore,'users')

    getDocs(query(userCollection,where('id','==',userId))).then((res)=>{
      res.forEach((doc)=>{
        setSeller(doc.data())
      })
    }).catch((err)=>{
      alert(err.message)
    })
  })
  
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDatail.image}
          alt={postDatail.name}
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDatail.price} </p>
          <span>{postDatail.name}</span>
          <p>{postDatail.category}</p>
          <span>{postDatail.date}</span>
        </div>
        {seller &&
          <div className="contactDetails">
            <p>Seller details</p>
            <p>{seller.name}</p>
            <p>{seller.phon}</p>
          </div>
        }
      </div>
    </div>
  );
}
export default View;
