import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ReactStars from 'react-stars'
import Swal from 'sweetalert2'
import ImageSection from '../components/ImageSection'

export default function DProductOne() {

  // for page detail
  const { hollow2 } = useParams();

  // yahan product data ayega from api
  const [productdetail, setproductdetail] = useState({})

  // review leny k liye 
  const [review, setreview] = useState("")

  //rating stars by user right side wala
  const [ratingstar, setratingStar] = useState(0)

  // iska function
  const ratingChanged = (newRating) => {
    setratingStar(newRating)
  }


  // api fetching
  useEffect(() => {
    axios.get(`https://dummyjson.com/products/${hollow2}`)
      .then((res) => setproductdetail(res.data))

  }, [])


  // submit button function

  const SubmitReview = () => {
    const payload = {
      productid: productdetail.id,
      review: review,
      rating: ratingstar
    }
    console.log(payload)


    Swal.fire({
      title: 'Review Submitted',
      text: 'Thank you for reviewing our porduct',
      icon: 'success',
      confirmButtonText: 'Continue Shopping'
    })


  }


const[ProductQuantity,setProductQuantity]=useState(1)

const addtocart=()=>{

  const payload={
    ...productdetail,
    ProductQuantity,
    TotalPrice: productdetail.price * ProductQuantity
  }
  console.log(payload)

  Swal.fire({
    title: 'ADDED TO CART',
    text: 'check your cart for checkout',
    icon: 'success',
    confirmButtonText: 'Continue Shopping'
  })

}

  return (
    <>
      {/* heading, description and stars */}

      <div className="container text-center">
        <h1>{productdetail.title}</h1>
        <p>{productdetail.description}</p>
        <div className="d-flex justify-content-center">
          <ReactStars
            count={5}
            size={24}
            edit={false}
            value={productdetail.rating}
            color2={'#ffd700'} />

        </div>

      </div>

      {/* ADD TO CART FUNCTIONALITY */}
      <div >
        <div className='d-flex justify-content-center my-2 align-items-center'>
        <button disabled={ProductQuantity > 1 ? false : true} className="btn btn-dark mx-2"  onClick={()=>setProductQuantity(ProductQuantity-1)}>-</button>
        {ProductQuantity}
        <button className="btn btn-dark mx-2" onClick={()=>setProductQuantity(ProductQuantity+1)}>+</button>
        </div >
        <div className='d-flex justify-content-center my-2'>

          {/* add to cart button */}

        <button className='btn btn-dark' onClick={addtocart}>Add to Cart</button>
        </div>
      </div>


      <div className="container row">
        {/* RIGHT image and slider wala side */}

        <div className="col-md-6">
          {
            productdetail?.images?.length > 0 && <ImageSection images={productdetail.images} />
          }
        </div>

        {/* LEFT review wala side */}
        <div className="col-md-6">

          {/* is container ma heading and lorem */}
          <div className="container">
            <h2 className='text-center'>REVIEW US</h2>
            <p className='text-center text-secondary'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab accusamus eligendi, eveniet, facilis dolorum tempore at quaerat, dolorem eaque optio dolore voluptas. Facere suscipit fugiat veritatis dicta quae sint nihil?</p>
          </div>


          {/* yahan pe comment box */}

          <div className="form-floating">
            <textarea
              className="form-control"
              placeholder="Leave a comment here"
              id="floatingTextarea2"
              style={{ height: 100 }}
              defaultValue={""}
              onChange={(e) => setreview(e.target.value)}
            />
            <label htmlFor="floatingTextarea2">Comments</label>
          </div>

          {/* yahan pe rating star */}

          <div className="d-flex align-items-center">
            <ReactStars
              count={5}
              size={24}
              value={ratingstar}
              onChange={ratingChanged}
              color2={'#ffd700'}
            />
            <span className='ms-3'>({ratingstar})</span>
          </div>

          {/* submit button */}
          <button className='btn btn-dark' onClick={SubmitReview}>Submit review</button>

        </div>
      </div>





    </>
  )
}
