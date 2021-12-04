import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Loader from '../../../components/Loader.js'
import Message from '../../../components/Message.js'
import { createColor  } from '../../../actions/colorActions.js'
import AdminScreen from '../AdminScreen'
import { ColorPicker } from 'primereact/colorpicker';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Toolbar } from 'primereact/toolbar';
import { listProducts2 } from '../../../actions/productAction'

const ColorCreateScreen = ({ history }) => {
    
    
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
    const productList = useSelector(state => state.productList) 
    const {  products } = productList
    
    const colorCreate = useSelector(state => state.colorCreate)
    const { loading: loadingCreate, error: errorCreate,success: successCreate, } = colorCreate

    
    
      const submitHandler = (e) => {
           
         e.preventDefault() 
         dispatch(createColor(color1, color2, color3, color4, color5, color6,
    color7, color8, color9, color10, color11, color12,
    product))
        }
    
    
    useEffect(() => {
        dispatch(listProducts2())
        
       if (successCreate) { 
           history.push('/admin/colors/') 
        }
    }, [ dispatch, history, successCreate])
    
    

     

    const leftContents = (
    <React.Fragment>
            <div >
            <Button 
            label='Create'
            className="p-button-primary p-mr-2"
                    icon="pi pi-plus"
            type="submit"
                ></Button>
            <Link to={'/admin/colors/'}>   
            <Button 
            label="Cancle"
            className="p-button-secondary"
            icon="pi pi-arrow-circle-left"
            ></Button>
            </Link> 
          </div> 
    </React.Fragment>
    );
    

     return (
        <>
             <AdminScreen />
             <div className="main-content">
                 <main>
                     <Card title="Colors" subTitle="You can add colors here">
                          <form onSubmit={submitHandler}>
                          <div className="p-grid mb-5">
                                <div class="p-col-12">
                                     <Toolbar left={leftContents} />
                                </div>
                         </div>
                        <div class="p-grid" > 
                                 <div class="p-col-12">
                                {loadingCreate && <Loader />}
                                     {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
                                     
                                         <div class="p-fluid p-formgrid p-grid" >
                                             <div class="p-col-12 p-md-6 p-lg-4">
                                                 <label htmlFor="name">Color1</label>
                                                 <input value={color1} id="name" type="text" required
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
                                                 <label htmlFor="icon">Color8</label>
                                                 <input value={color9} id="icon" type="text"
                                                     onChange={(e) => setColor9(e.target.value)} />
                                             </div>
                                             <div class="p-col-12 p-md-6 p-lg-4">
                                                 <label htmlFor="name">Color1</label>
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
                                  
                                </div>
                        </div>
                        </form>
                     </Card>


            
             </main>
              </div>
        </>    
     )

}


export default ColorCreateScreen