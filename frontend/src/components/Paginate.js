import React from 'react'
import { Link } from 'react-router-dom'


const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
    
    return pages > 1 && (
        
        <span className="pagination"  >
            {[...Array(pages).keys()].map(x => (
                <Link className="pagination" key={x + 1} to={!isAdmin ? keyword ? `/search/${keyword}/page/${x + 1}` : `/page/${x + 1} ` : `/admin/productlist/${x+1}`}>
                    <span active={x+1 === page} >{x + 1}</span>
                </Link>
            ))} 
        </span>
    )
}
{/* <span>1</span>
          <span>2</span>
          <span class="icon">››</span>
          <span class="last">Last »</span> */}
export default Paginate
