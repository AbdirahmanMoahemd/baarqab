import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Loader from '../../../components/Loader'
import Message from '../../../components/Message'
import {  listSizeDetails, updateSize} from '../../../actions/sizeActions.js'
import AdminScreen from '../AdminScreen'
import { ColorPicker } from 'primereact/colorpicker';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Toolbar } from 'primereact/toolbar';
import { CATEGORY_UPDATE_RESET } from '../../../constants/categoryConstants'
import { listProducts2 } from '../../../actions/productAction.js'


const SizeEditScreen = ({ match, history }) => {
    const sizeId = match.params.id
   
    
    const [size1, setSize1] = useState('')
    const [size2, setSize2] = useState('')
    const [size3, setSize3] = useState('')
    const [size4, setSize4] = useState('')
    const [size5, setSize5] = useState('')
    const [size6, setSize6] = useState('')
    const [size7, setSize7] = useState('')
    const [size8, setSize8] = useState('')
    const [size9, setSize9] = useState('')
    const [size10, setSize10] = useState('')
    const [size11, setSize11] = useState('')
    const [size12, setSize12] = useState('')
    const [product, setProduct] = useState('')

    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList) 
    const { products } = productList
    

    const sizeDetails = useSelector(state => state.sizeDetails)
    const { loading, error, size } = sizeDetails

    const sizeUpdate = useSelector(state => state.sizeUpdate)
    const { loading:loadingUpdate, error:errorUpdate, success:successUpdate } = sizeUpdate
    
    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: CATEGORY_UPDATE_RESET })
            history.push('/admin/sizes')
        }
        else {
            if (size.id !== sizeId) {
                dispatch(listSizeDetails(sizeId))
                dispatch(listProducts2())
            }
            else {
                setSize1(size.size1)
                setSize2(size.size2)
                setSize3(size.size3)
                setSize4(size.size4)
                setSize5(size.size5)
                setSize6(size.size6)
                setSize7(size.size7)
                setSize8(size.size8)
                setSize9(size.size9)
                setSize10(size.size10)
                setSize11(size.size11)
                setSize12(size.size12)
                setProduct(size.product)
             
            }
        }
    
    }, [ dispatch, history, successUpdate, sizeId, size])
    
    
    const updateCategoryFun = () => {
    dispatch(updateSize({
            _id: sizeId,
            size1, size2, size3, size4, size5, size6,
    size7, size8, size9, size10, size11, size12,
    product
            
        }))
    }
     const submitHandler = (e) => {
           
         e.preventDefault() 
             updateCategoryFun();
        }

    const leftContents = (
    <React.Fragment>
            <div >
            <Button 
            label='update'
            className="p-button-primary p-mr-2"
                    icon="pi pi-plus"
            type="submit"
            ></Button>
            <Button 
            label="Cancle"
            className="p-button-secondary"
            icon="pi pi-arrow-circle-left"
            ></Button>
          </div> 
    </React.Fragment> 
);

     return (
        <>
             <AdminScreen />
             <div className="main-content">
                 <main>
                     <Card title="Sizes" subTitle="You can edit sizes here">
                          <form onSubmit={submitHandler}>
                          <div className="p-grid mb-5">
                                <div class="p-col-12">
                                      <Toolbar left={leftContents}/>
                                </div>
                         </div>
                        <div class="p-grid" > 
                                 <div class="p-col-12">
                                     {loadingUpdate && <Loader />}
                                    {errorUpdate && <Message>{errorUpdate}</Message>}
                                     {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                                         <div class="p-fluid p-formgrid p-grid" >
                                              <div class="p-col-12 p-md-6 p-lg-4">
                                                 <label htmlFor="name">Size1</label>
                                                 <input value={size1} id="name" type="text" required
                                                     onChange={(e) => setSize1(e.target.value)} />
                                             </div>
                                             <div class="p-col-12 p-md-6 p-lg-4">
                                                 <label htmlFor="icon">Size2</label>
                                                 <input value={size2} id="icon" type="text"
                                                     onChange={(e) => setSize2(e.target.value)} />
                                             </div>
                                             <div class="p-col-12 p-md-6 p-lg-4">
                                                 <label htmlFor="name">Size3</label>
                                                 <input value={size3} id="name" type="text"
                                                     onChange={(e) => setSize3(e.target.value)} />
                                             </div>
                                             <div class="p-col-12 p-md-6 p-lg-4">
                                                 <label htmlFor="icon">Size4</label>
                                                 <input value={size4} id="icon" type="text"
                                                     onChange={(e) => setSize4(e.target.value)} />
                                             </div>
                                             <div class="p-col-12 p-md-6 p-lg-4">
                                                 <label htmlFor="name">Size5</label>
                                                 <input value={size5} id="name" type="text"
                                                     onChange={(e) => setSize5(e.target.value)} />
                                             </div>
                                             <div class="p-col-12 p-md-6 p-lg-4">
                                                 <label htmlFor="icon">Size6</label>
                                                 <input value={size6} id="icon" type="text"
                                                     onChange={(e) => setSize6(e.target.value)} />
                                             </div>
                                             <div class="p-col-12 p-md-6 p-lg-4">
                                                 <label htmlFor="name">Size7</label>
                                                 <input value={size7} id="name" type="text"
                                                     onChange={(e) => setSize7(e.target.value)} />
                                             </div>
                                             <div class="p-col-12 p-md-6 p-lg-4">
                                                 <label htmlFor="name">Size8</label>
                                                 <input value={size8} id="name" type="text"
                                                     onChange={(e) => setSize8(e.target.value)} />
                                             </div>
                                             <div class="p-col-12 p-md-6 p-lg-4">
                                                 <label htmlFor="icon">Size8</label>
                                                 <input value={size9} id="icon" type="text"
                                                     onChange={(e) => setSize9(e.target.value)} />
                                             </div>
                                             <div class="p-col-12 p-md-6 p-lg-4">
                                                 <label htmlFor="name">Size1</label>
                                                 <input value={size10} id="name" type="text"
                                                     onChange={(e) => setSize10(e.target.value)} />
                                             </div>
                                             <div class="p-col-12 p-md-6 p-lg-4">
                                                 <label htmlFor="icon">Size11</label>
                                                 <input value={size11} id="icon" type="text"
                                                     onChange={(e) => setSize11(e.target.value)} />
                                             </div>
                                             <div class="p-col-12 p-md-6 p-lg-4">
                                                 <label htmlFor="name">Size12</label>
                                                 <input value={size12} id="name" type="text"
                                                     onChange={(e) => setSize12(e.target.value)} />
                                             </div>
                                             <div class="p-col-12 p-md-6 p-lg-4 p-mt-1">
                                             <label htmlFor="icon">Product</label>
                                             <br/>
                                                    <select class="p-mt-1" name="" value={product} required style={{height: "30px", borderRadius:"0%"}}
                                                        onChange={(e) => setProduct(e.target.value)} >
                                                        {products.map(cat => (
                                                            <>
                                                                <option value={cat.id}>{cat.id}</option>
                                                        </>
                                                        ))}
                                                    
                                                    </select>
                                            </div>
                                         </div> 
                                     )}
                                </div>
                        </div>
                        </form>
                     </Card>


            
             </main>
              </div>
        </>    
     )

}


export default SizeEditScreen