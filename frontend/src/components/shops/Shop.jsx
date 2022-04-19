import { useRef, useEffect , useState} from "react"
import "./style.css"
import { Link } from "react-router-dom"
import Rating from "../Rating"
import { listProducts2 } from '../../actions/productAction'
import { useDispatch, useSelector, } from 'react-redux'
import ShopCart from "./ShopCart"



const Shop = ({ packages }) => {

  const dispatch = useDispatch()
 
    const productList = useSelector(state => state.productList)
  const { loading, error, products } = productList
  console.log('p:' , products)
  useEffect(() => { 
      
        dispatch(listProducts2())
      
      
    }, [dispatch])
  return (
    <>
       {packages.filter(pro => pro.isFeatured === true).map((packageitem) => {
       return (
      <section className='shop background'>
        <div className='container'>
            <div className='heading  f_flex'>
            <i class={packageitem.icon}></i>
            <h1>{packageitem.packageName}</h1>
            </div>
              <div className='product-content  grid1'>
               
            <>
      {products.filter(pro => pro.category.name === packageitem.category.name).map((shopItems) => {
        return (

          <div className='box'>
            <div className='product '>
              <div className='img'>
                 <Link to={`product/${shopItems.id}`}>
                  <img src={shopItems.image} alt='' />
                  </Link>
              </div>
              <div className='product-details'>
                <h3>{shopItems.name}</h3>
                <div className='rate'>
                 <Rating
                                value={shopItems.rating}
                                />
                </div>
                <div className='price'>
                  <h4>${shopItems.price}.00 </h4>
                  {/* step : 3  
                     if hami le button ma click garryo bahne 
                    */}
                  <button>
                    <i className='fa fa-plus'></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </>
            </div>
        </div>
          </section>
       )
       })} 
    </>
  )
}

export default Shop
