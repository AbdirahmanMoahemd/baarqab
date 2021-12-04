import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Loader from '../../../components/Loader'
import Message from '../../../components/Message'
import {  listColorDetails, updateColor} from '../../../actions/colorActions'
import AdminScreen from '../AdminScreen'
import { ColorPicker } from 'primereact/colorpicker';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Toolbar } from 'primereact/toolbar';
import { CATEGORY_UPDATE_RESET } from '../../../constants/categoryConstants'
import { listProducts2 } from '../../../actions/productAction'


const ColorEditScreen = ({ match, history }) => {
    const colorId = match.params.id
   
    
    const [color1, setColor1] = useState('')
    const [color2, setColor2] = useState('')
    const [color3, setColor3] = useState('')
    const [color4, setColor4] = useState('')
    const [color5, setColor5] = useState('')
    const [color6, setColor6] = useState('')
    const [color7, setColor7] = useState('')
    const [color8, setColor8] = useState('')
    const [color9, setColor9] = useState('')
    const [color10, setColor10] = useState('')
    const [color11, setColor11] = useState('')
    const [color12, setColor12] = useState('')
    const [product, setProduct] = useState('')

    const dispatch = useDispatch()

    

    const colorDetails = useSelector(state => state.colorDetails)
    const { loading, error, color } = colorDetails

    const productList = useSelector(state => state.productList) 
    const { products } = productList

    const colorUpdate = useSelector(state => state.colorUpdate)
    const { loading:loadingUpdate, error:errorUpdate, success:successUpdate } = colorUpdate
    

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: CATEGORY_UPDATE_RESET })
            history.push('/admin/colors')
        }
        else {
            if (color.id !== colorId) {
                dispatch(listColorDetails(colorId))
                dispatch(listProducts2())
            }
            else {
                setColor1(color.color1)
                setColor2(color.color2)
                setColor3(color.color3)
                setColor4(color.color4)
                setColor5(color.color5)
                setColor6(color.color6)
                setColor7(color.color7)
                setColor8(color.color8)
                setColor9(color.color9)
                setColor10(color.color10)
                setColor11(color.color11)
                setColor12(color.color12)
                setProduct(color.product)
             
            }
        }
    
    }, [ dispatch, history, successUpdate, colorId,color])
    
    
    const updateCategoryFun = () => {
    dispatch(updateColor({
            _id: colorId,
            color1, color2, color3, color4, color5, color6,
    color7, color8, color9, color10, color11, color12,
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
                     <Card title="Colors" subTitle="You can edit colors here">
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
                                                 <label htmlFor="name">Color1</label>
                                                 <input value={color1} id="name" type="text"
                                                     onChange={(e) => setColor1(e.target.value)} />
                                             </div>
                                             <div class="p-col-12 p-md-6 p-lg-4">
                                                 <label htmlFor="icon">Color2</label>
                                                 <input value={color2} id="icon" type="text"
                                                     onChange={(e) => setColor2(e.target.value)} />
                                             </div>
                                             <div class="p-col-12 p-md-6 p-lg-4">
                                                 <label htmlFor="name">Color3</label>
                                                 <input value={color3} id="name" type="text"
                                                     onChange={(e) => setColor3(e.target.value)} />
                                             </div>
                                             <div class="p-col-12 p-md-6 p-lg-4">
                                                 <label htmlFor="icon">Color4</label>
                                                 <input value={color4} id="icon" type="text"
                                                     onChange={(e) => setColor4(e.target.value)} />
                                             </div>
                                             <div class="p-col-12 p-md-6 p-lg-4">
                                                 <label htmlFor="name">Color5</label>
                                                 <input value={color5} id="name" type="text"
                                                     onChange={(e) => setColor5(e.target.value)} />
                                             </div>
                                             <div class="p-col-12 p-md-6 p-lg-4">
                                                 <label htmlFor="icon">Color6</label>
                                                 <input value={color6} id="icon" type="text"
                                                     onChange={(e) => setColor6(e.target.value)} />
                                             </div>
                                             <div class="p-col-12 p-md-6 p-lg-4">
                                                 <label htmlFor="name">Color7</label>
                                                 <input value={color7} id="name" type="text"
                                                     onChange={(e) => setColor7(e.target.value)} />
                                             </div>
                                             <div class="p-col-12 p-md-6 p-lg-4">
                                                 <label htmlFor="name">Color8</label>
                                                 <input value={color8} id="name" type="text"
                                                     onChange={(e) => setColor8(e.target.value)} />
                                             </div>
                                             <div class="p-col-12 p-md-6 p-lg-4">
                                                 <label htmlFor="icon">Color9</label>
                                                 <input value={color9} id="icon" type="text"
                                                     onChange={(e) => setColor9(e.target.value)} />
                                             </div>
                                             <div class="p-col-12 p-md-6 p-lg-4">
                                                 <label htmlFor="name">Color10</label>
                                                 <input value={color10} id="name" type="text"
                                                     onChange={(e) => setColor10(e.target.value)} />
                                             </div>
                                             <div class="p-col-12 p-md-6 p-lg-4">
                                                 <label htmlFor="icon">COLOR11</label>
                                                 <input value={color11} id="icon" type="text"
                                                     onChange={(e) => setColor11(e.target.value)} />
                                             </div>
                                             <div class="p-col-12 p-md-6 p-lg-4">
                                                 <label htmlFor="name">Color12</label>
                                                 <input value={color12} id="name" type="text"
                                                     onChange={(e) => setColor12(e.target.value)} />
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


export default ColorEditScreen