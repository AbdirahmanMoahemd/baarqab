import React from 'react'
import { Helmet } from 'react-helmet'


const Meta = ({ title, description, keywords, viewport }) => {
    return (
        <Helmet>
            <title>{title}</title>
                <meta
                    name='description'
                    content={description} />
                <meta
                    name='keywords'
                    content={keywords}
                />
                <meta name="viewport" content={viewport}></meta>
            </Helmet>
    )
}

Meta.defaultProps = {
    title: 'Welcome To Caawiye Souq',
    keywords: 'caawiye, caawiye suuq, caawiye souq, electronics, cheap, suuq, souq, Dhar, kabo, somali online',
    description: 'We sell the best products for cheap',
    viewport: 'width=device-width, initial-scale=1.0',
}

export default Meta
