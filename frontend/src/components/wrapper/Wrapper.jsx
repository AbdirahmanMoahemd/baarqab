import React from "react"
import "./style.css"

const Wrapper = ({ data }) => {
   var newdata = []
  data.map((val) => {
    newdata = [
    {
      cover: <i class='fa-solid fa-truck-fast'></i>,
      title: val.serviceTitle1,
      decs: val.serviceDecs1,
    },
    {
      cover: <i class='fa-solid fa-id-card'></i>,
      title: val.serviceTitle2,
      decs: val.serviceDecs2, 
    },
    {
      cover: <i class='fa-solid fa-headset'></i>,
      title: val.serviceTitle3,
      decs: val.serviceDecs3,
    },
  ]
  })
  
  return (
    <>
      <section className='wrapper background'>
        <div className='container grid22'>
          {newdata.map((val, index) => {
            return (
              <div className='product' key={index}>
                <div className='img icon-circle'>
                  {val.cover}
                </div> 
                <h3>{val.title}</h3>
                <p>{val.decs}</p>
              </div>
            ) 
          })}
        </div>
      </section>
    </>
  )
}

export default Wrapper
