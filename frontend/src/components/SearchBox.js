import React, { useState} from 'react'


const SearchBox = ({ history }) => {
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
        <div class="search_box">
                <input type="search" placeholder="Search For a Product"
                    onChange={(e) => setKeyword(e.target.value)} />
                <span class="pi pi-search" style={{ fontSize: "1.4rem" }} onClick={submitHandler} ></span>
    </div>
        </form>
    )
}

export default SearchBox
