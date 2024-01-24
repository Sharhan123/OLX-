import React, { useContext, useEffect, useState } from 'react';

import Heart from '../../assets/Heart';
import './Post.css';
import { firestore } from '../../Firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import { PostContext } from '../../Store/postContext';
import { useNavigate } from 'react-router-dom';

function Posts() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const { setPostDetail } = useContext(PostContext);
  const navigate = useNavigate();

  useEffect(() => {
    const getDocuments = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, 'sellingProducts'));
        const dataArray = [];

        querySnapshot.forEach((doc) => {
          dataArray.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        setProducts(dataArray);
        setLoading(false);
        console.log(dataArray);
      } catch (error) {
        console.error(error);
      }
    };

    getDocuments();
  }, []);

  
  if (loading) {
    return <p>Loading...</p>; // Display loading state
  }

  return (
    <div className="postParentDiv">
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          {
          products.map((product)=>{
            return(
              <div key={product.id}
              className="card" onClick={()=>{
                setPostDetail(product)
                navigate('/post')
              }}
            >
              <div className="favorite">
                <Heart></Heart>
              </div>
              <div className="image">
                <img src={product.image} alt="" />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {product.price}</p>
                <span className="kilometer">{product.category}</span>
                <p className="name"> {product.name}</p>
              </div>
              <div className="date">
              <span>{new Date(product.date).toLocaleString()}</span>
              </div>
            </div>
            )
          }) 
        }
        </div>
      </div>
    </div>
  );
}

export default Posts;
