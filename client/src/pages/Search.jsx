import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { useNavigate } from 'react-router-dom'
import ListingItem from '../components/ListingItem'

function Search() {
    const [sidebardata ,setSidebardata]=useState({

        searchTerm: '',
        type:'all',
        parking:false,
        furnished:false,
        offer:false,
        sort :'created_at',
        order:'desc'
    })
    const [loading ,setLoading] = useState(false)
    const [listings , setListing] = useState([])
    const [showmore,setShowmore] = useState(false)
    console.log(listings)
    useEffect(()=>{
   
     const urlParams = new URLSearchParams(location.search)
     const searchTermFormUrl= urlParams.get('searchTerm')
     const typeFormUrl = urlParams.get('type');
     const parkingFormUrl = urlParams.get('parking');
     const furnishedFormUrl = urlParams.get('furnished');
     const offerFormUrl = urlParams.get('offer')
     const sortFormUrl = urlParams.get('sort');
     const orderFormUrl = urlParams.get('order')
     
      if(searchTermFormUrl || 
         typeFormUrl || 
         parkingFormUrl || 
        furnishedFormUrl ||
        offerFormUrl ||
        sortFormUrl ||
        orderFormUrl){
             setSidebardata({
               searchTerm : searchTermFormUrl || '',
               type:typeFormUrl || 'all',
               parking: parkingFormUrl === 'true' ? true :false,
               furnished: furnishedFormUrl === 'true'? true : false,
               offer : offerFormUrl === 'true' ? true :false,
               sort : sortFormUrl || 'created_at',
               order : orderFormUrl || 'desc',
             })
        }
        const fetchListing =async ()=> {
            setLoading(true);
            setShowmore(false);
            const searchQuery = urlParams.toString();
            const res = await fetch(`/api/listing/get?${searchQuery}`)
            const data = await res.json();
            if(data.length > 8){
                setShowmore(true)
            }else{
                setShowmore(false)
            }
            setLoading(false)
            setListing(data);
           

        }
        fetchListing()
    },[location.search])
    const navigate= useNavigate();
    
    const handelChange=(e)=>{

        if(e.target.id === 'all' || e.target.id ==='rent'||e.target.id === 'sell'){
            
            setSidebardata({...sidebardata ,type : e.target.id})
        }

        if(e.target.id === 'searchTerm'){
            setSidebardata({...sidebardata , searchTerm : e.target.value})
        }
        
        if(e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer'){
        
             setSidebardata({...sidebardata , [e.target.id] :
                 e.target.checked || e.target.checked === 'true'? true : false,})
      
              
        
        }

        if(e.target.id === 'sort_order'){

            const sort = e.target.value.split('_')[0]||'created_at';
            const order = e.target.value.split('_')[1]|| 'desc';

            setSidebardata({...sidebardata , sort , order})
        }
    }

    const handelSubmit=(e)=>{
       e.preventDefault()
       const urlParams = new URLSearchParams();
       urlParams.set('searchTerm' ,sidebardata.searchTerm)
       urlParams.set('type', sidebardata.type)
       urlParams.set('parking' , sidebardata.furnished)
       urlParams.set('offer', sidebardata.offer) 
       urlParams.set('sort', sidebardata.sort)
       urlParams.set('order',sidebardata.order)
       const searchQuery = urlParams.toString()
       navigate(`/search?${searchQuery}`);      
    }
    const onShowMoreClick = async()=>{
        const numberOfListings = listings.length;
        const startIndex = numberOfListings
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('startIndex',startIndex)
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/listing/get?${searchQuery}`);
        const data = await res.json();
        if(data.length < 9){
            setShowmore(false)
        }
        setListing([...listings, ...data])
    }
  return (
    <>
    <Header/>
    <div className='flex flex-col md:flex-row md:min-h-screen'>
        <div className='p-7 border-b-2 md:border-r-2'>
            <form className='flex flex-col gap-8' onSubmit={handelSubmit}>
                  <div className='flex item-center gap-2'>
                      <label className='whitespace-nowrap'>Search Term:</label>
                      <input type ="text" id='searchTerm' placeholder='search...' 
                      className='border rounded-lg p-3 w-full' 
                      value={sidebardata.searchTerm}
                      onChange={handelChange}/>
                  </div>
                  <div className='flex gap-2 flex-wrap items-center'>
                       <label>Type:</label>
                       <div className='flex gap-2'>
                       <input type="checkbox" id="all" className='w-5'
                        onChange={handelChange}
                        checked={sidebardata.type==='all'}
                       />
                       <span>Rent & Sale</span>
                       </div>

                       <div className='flex gap-2'>
                       <input type="checkbox" id="rent" className='w-5' onChange={handelChange}
                          checked={sidebardata.type==="rent"}/>
                       <span>Rent</span>
                       </div>

                       <div className='flex gap-2'>
                       <input type="checkbox" id="sell" className='w-5' onChange={handelChange}
                        checked={sidebardata.type==="sell"}
                        />
                       <span>Sale</span>
                       </div>

                       <div className='flex gap-2'>
                       <input type="checkbox" id="offer" className='w-5' onChange={handelChange}
                       
                       checked={sidebardata.offer}/>
                       <span>offer</span>
                       </div>
                  </div>
                  <div className='flex gap-2 flex-wrap items-center'>
                       <label>Amenities:</label>
                       <div className='flex gap-2'>
                       <input type="checkbox" id="parking" className='w-5' onChange={handelChange}
                         checked={sidebardata.parking}
                       />
                       <span>parking</span>
                       </div>

                       <div className='flex gap-2'>
                       <input type="checkbox" id="furnished" className='w-5' onChange={handelChange} 
                         checked={sidebardata.furnished}
                       />
                       <span>Furnushed</span>
                       </div>
                  </div>
                  <div className='flex items-center gap-2'>
                    <label>Sort:</label>
                    <select id="sort_order"
                      className='border rounded-lg p-3' 
                      onChange={handelChange}
                      defaultValue={'created_at_desc'}
                    >
                        <option value={'regulaPrice_desc'}>Price high to low</option>
                        <option value={'regularPrice_asc'}>Price low to high</option>
                        <option value={'createdAt_desc'}>latest</option>
                        <option value={'createdAt_asc'}>oldest</option>
                    </select>
                  </div>
                  <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>Search</button>
            </form>

        </div>
        <div className='flex-1'>
            <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5'>Listing Results:</h1>
            <div className='p-7 flex flex-wrap gap-4'>
                {!loading && listings.length === 0 && (
                    <p className='text-xl text-slate-700'>No listing found </p>
                )}
                {
                    loading &&(
                        <p className='text-xl text-slate-700 text-center w-4'>loading...</p>
                    )
                }
                {
                    !loading && listings && listings.map((listing)=>(
        
                        <ListingItem  key={listing._id} listing={listing}/>
                    ))
                }
                
            </div>
                {
                    showmore && (
                        <button onClick={()=>{onShowMoreClick()}} className='text-green-700 hover:underline p-7'>Show More...</button>
                    )
                }
        </div>
    </div>
    </>

  )
}

export default Search