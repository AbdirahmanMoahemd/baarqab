import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { listTestimonials } from '../actions/testimonialActions'

const Testimonials = () => {  

    const dispatch = useDispatch()


    const testimonialList = useSelector(state => state.testimonialList)
    const { loading, error, testimonials } = testimonialList
  
    

    useEffect(() => {
      dispatch(listTestimonials())
    }, [dispatch])

    return (
        <>
           <div className="featured-heading">
                 <h2 style={{ marginTop: '0px'}}>Oraahda Macaamiisheyna</h2>
            </div> 
            <div className="testimonial">
                
                <div className="small-container">
                    <div className="row">
                        {testimonials.map((testimonial) => (
                            <div className="col-3" key={testimonial._id}>
                                <i className="fa fa-quote-left"></i>
                                <p>
                                    {testimonial.comment}
                            </p>
                                <div className="rating"> 
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                </div>
                                <img src={testimonial.image} alt="" />
                                <h3>{testimonial.name}</h3>
                            </div>
                        ))}
                        
                    </div>
                </div>
            </div> 
        </>
    )
}

export default Testimonials
