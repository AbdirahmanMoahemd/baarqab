import React, {useState} from "react"

const SearchBoxxx =  ({ history }) => {
    const [keyword, setKeyword] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        if (keyword.trim()) {
            history.push(`/search/${keyword}`)
            
        }
        else {
            history.push('/')
        }
    }
    return (
     <form onSubmit={submitHandler}>
    <div class="search_box-dd">
                <input type="search" placeholder="Search here ..."
                onChange={(e) => setKeyword(e.target.value)} />
            
                <span class="fa fa-search" onClick={submitHandler} ></span>
            </div>
            </form> 
  )
}

export default SearchBoxxx