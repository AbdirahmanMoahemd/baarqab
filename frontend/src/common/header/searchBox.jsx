import React,{ useState} from 'react'

const searchBox =  ({ history }) => {
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
    
    <div class="search_box-dd">
                <input type="search" placeholder="Search here ..."
                    />
                <span class="fa fa-search" ></span>
    </div>
  )
}

export default searchBox