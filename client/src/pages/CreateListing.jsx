import React, { useState } from 'react';
import Header from '../components/Header';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
;

export default function CreateListing() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    regularPrice: 0,
    discountPrice: 0,
    bathrooms: 1,
    bedrooms: 1,
    furnished: false,
    parking: false,
    type: 'rent', 
    offer: false,
    userRef: 'USER_ID', 
    imageUrls: [], 
  });
  
  const {currentUser}=useSelector(state=>state.user)
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [creatingListing, setCreatingListing] = useState(false);
  const navigate=useNavigate()
  // Handle input change
  const handleChange = (e) => {
    const { id, type, value, checked } = e.target;
    setFormData((prev) => {
      let newValue;
      if (type === "checkbox") {
        newValue = checked; // ✅ Ensures true/false values for checkboxes
      } else if (type === "number") {
        newValue = Number(value); // ✅ Ensures number values
      } else {
        newValue = value;
      }
      
      const updatedForm = { ...prev, [id]: newValue };
   
      return updatedForm;
    });
  };
  
const handelDelete=(index)=>{
  setFormData({
    ...formData,
    imageUrls:formData.imageUrls.filter((__,i) => i!==index),
  });

}
  // Handle file selection
  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  // Upload Images First
  const handleUpload = async () => {
    if (files.length === 0) {
      alert('Please select images first.');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('images', files[i]);
    }

    try {
      const response = await fetch('/api/listing/upload', {  // Backend upload route
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        setFormData((prev) => ({ ...prev, imageUrls: [...prev.imageUrls, ...data.imageUrls] }));
        alert('Images uploaded successfully!');
      } else {
        alert('Image upload failed');
      }
    } catch (error) {
      console.error('Error uploading images:', error);
      alert('Image upload failed');
    }

    setUploading(false);
  };

  // Submit Form Data
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.imageUrls.length === 0) {
      alert('Please upload images first.');
      return;
    }

    setCreatingListing(true);

    try {
      const response = await fetch('/api/listing/create', { // Backend listing route
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({...formData,
          userRef : currentUser._id
        }),
      });

      const data = await response.json();
      if (data) {
        alert('Listing created successfully!');
      } else {
        alert('Failed to create listing');
      }
      navigate(`/listing/${data?.listing?._id}`)
    } catch (error) {
      console.error('Error:', error);
      alert('Error creating listing');
    }

    setCreatingListing(false);
  };

  return (
    <>
      <Header />
      <main className='p-3 max-w-4xl mx-auto'>
        <h1 className='text-3xl font-semibold text-center my-7'>Create a Listing</h1>
        <form className='flex flex-col sm:flex-row gap-4' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-4 flex-1'>
            <input type="text" id="name" placeholder='Name' className='border p-3 rounded-lg' 
              value={formData.name} onChange={handleChange} required />
            <input type="text" id="description" placeholder='Description' className='border p-3 rounded-lg' 
              value={formData.description} onChange={handleChange} required />
            <input type="text" id="address" placeholder='Address' className='border p-3 rounded-lg' 
              value={formData.address} onChange={handleChange} required />

            <div className='flex gap-6 flex-wrap'>
              {['sell', 'rent'].map((type) => (
                <div key={type} className='flex gap-2'>
                  <input type="radio" id="type" value={type} checked={formData.type === type} 
                    onChange={handleChange} className='w-5' />
                  <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
                </div>
              ))}
            </div>

            <div className='flex gap-6 flex-wrap'>
              {['furnished', 'parking', 'offer'].map((item) => (
                <div key={item} className='flex gap-2'>
                  <input type="checkbox" id={item} checked={formData[item]} onChange={handleChange} className='w-5' />
                  <span>{item.charAt(0).toUpperCase() + item.slice(1)}</span>
                </div>
              ))}
            </div>

            <div className='flex flex-wrap gap-6'>
              <div className='flex items-center gap-2'>
                <input type="number" id="bedrooms" min={1} max={10} className='p-3 border rounded-lg' 
                  value={formData.bedrooms} onChange={handleChange} required />
                <p>Beds</p>
              </div>
              <div className='flex items-center gap-2'>
                <input type="number" id="bathrooms" min={1} max={10} className='p-3 border rounded-lg' 
                  value={formData.bathrooms} onChange={handleChange} required />
                <p>Bathrooms</p>
              </div>
              <div className='flex items-center gap-2'>
                <input type="number" id="regularPrice" className='p-3 border rounded-lg' 
                  value={formData.regularPrice} onChange={handleChange} required />
                <p>Regular Price </p>
                {formData.type==="rent"&&<span>($/Month)</span>}
              </div>
              {formData.offer&&<div className='flex items-center gap-2'>
                <input type="number" id="discountPrice" className='p-3 border rounded-lg' 
                  value={formData.discountPrice} onChange={handleChange} required />
                <p>Discount Price </p>
                {formData.type==="rent"&&<span>($/Month)</span>}
              </div>}
            </div>
          </div>

          <div className='flex flex-col gap-4 flex-1'>
            <p className='font-semibold'>Images:
              <span className='font-normal text-gray-600 ml-2'>(Max 6 images)</span>
            </p>
            <div className='flex gap-4'>
              <input onChange={handleFileChange} className="p-3 border rounded w-full"
                type='file' id="images" accept='image/*' multiple />
              <button type="button" onClick={handleUpload} disabled={uploading}
                className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg'>
                {uploading ? 'Uploading...' : 'Upload'}
              </button>
            </div>
            {
            formData.imageUrls.length > 0 && formData.imageUrls.map((url,index)=>(
            <div className='flex justify-between p-3 border items-center' >
              <img src={url} className='w-20 h-20 object-contain rounded-lg'/>
              <button  type="submit"className='p-3 text-red-600 rounded-lg uppercase hover:opacity-75' onClick={()=>handelDelete(index)}>Delete</button>
            </div>))
          }
            <button type="submit" disabled={creatingListing || uploading}
              className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95'>
              {creatingListing ? 'Creating...' : 'Create Listing'}
            </button>
            
          </div>
         
        </form>
      </main>
    </>
  );
}
