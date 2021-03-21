import React, { useState} from 'react'
import { Form,  Button} from 'react-bootstrap'


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
        <div className="search_box">
                        <input type="search" id="inputText" placeholder="Search For a Product"
                onChange={(e) => setKeyword(e.target.value)}
                        />
                        <span className="fa fa-search" onClick={submitHandler}></span>
            </div>
        </form>
    )
}

export default SearchBox
