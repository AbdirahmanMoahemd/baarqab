import React from "react"

const Head = () => {
  return (
    <>
      <section className='head'>
        <div className='container flex-all '>
          <div className='left  left-flex'>
            <div>
            <i className='fa fa-phone'></i>
              <label> +252 610 872270</label>
            </div>
            <div>
            <i className='fa fa-envelope'></i>
              <label>info.baarqab@gmail.com</label>
              </div>
          </div>
         
           <div className='right row RText hide-right'>
            <label>Need Help?</label>
            <label>EN</label>
            <label>USD</label>
          </div>
          
        </div>
      </section>
    </>
  )
}

export default Head
