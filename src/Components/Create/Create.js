import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import {firestore, storage} from '../../Firebase/config'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { addDoc, collection,getFirestore } from 'firebase/firestore';
import { AuthContext } from '../../Store/firebaseContext';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [err, setErr] = useState('');
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      if (name.trim().length < 4) {
        setErr('Enter a valid product name');
        return;
      } else if (category.trim().length < 3) {
        setErr('Enter a valid category');
        return;
      } else if (price < 1) {
        setErr('Enter a valid price');
        return;
      } else if (image.length === 0) {
        setErr('Select an image');
        return;
      }
  
      const storageRef = ref(storage, `Product/${user.uid}_${Date.now()}_${image.name}`);
      await uploadBytes(storageRef, image);
  
      const downloadURL = await getDownloadURL(storageRef);
  
      const db = getFirestore();
      await addDoc(collection(db, 'sellingProducts'), {
        name: name,
        category: category,
        price: price,
        image: downloadURL,
        date: Date.now(),
        userId: user.uid,
      });
  
      navigate('/');
    } catch (error) {
      console.error('Error:', error);
    }
  };


    // if(!image){
    //   setErr('image required')
    //   return
    // }else if(name && name.length < 4){
    //   setErr('name must be at least 4 character')
    //   return
    // }else if(category && category.length < 4){
    //   setErr('category must be at least 4 character')
    //   return
    // }else if(price && price < 0){
    //   setErr('Price must be greaterthan 0 ')
    //   return
    // }

    // const refImage = ref(storage,`/Product/${image,name}`)
    // const uploadImag = uploadBytesResumable(refImage,image)

    // uploadImag.on("state_changed",(snapshot)=>{
    // },(err) =>{
    //   alert(err.message)
    // },
    // ()=>{
    //   getDownloadURL(uploadImag.snapshot.ref).then((url)=>{
    //     const productCollection = collection(firestore,'products')
    //     addDoc(productCollection,{
    //       name,
    //       category,
    //       price,
    //       url,
    //       userId :user.uid,
    //       date:new Date().toDateString(),
    //     }).then(()=>{
    //       navigate("/")
    //     }).catch((err)=>{
    //       console.log(err.message);
    //       alert('cant add product deltails to firestore',err.message)
    //     })
    //   }).catch((err)=>{
    //     alert('cant get image url',err.message)
    //   })
    //   navigate('/')
    // }
    // )
  
  return (
    <Fragment>
      <Header />
      <card >
        <div className="centerDiv">
          <form>
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="Name"
              value={name}
              onChange={(e)=>setName(e.target.value)}
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="category"
              value={category}
              onChange={(e)=>setCategory(e.target.value)}
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" type="number" id="fname" name="Price" value={price}
              onChange={(e)=>setPrice(e.target.value)} />
            <br />
          </form>
          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ''}></img>
          <form>
            <br />
            <input type="file"  onChange={(e)=>setImage(e.target.files[0])}/>
            <br />
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
          </form>
          { err ? <span style={{color:'red'}}>{err}</span> : ''}
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
