import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import { quotesSelector } from '../../redux/quotesSlice';

function QuoteDetail() {
    let { id } = useParams();
    const items = useSelector(quotesSelector);
    const quote = items.find(item => item.quote_id === Number(id))

    if(!quote) {
        return <Navigate to='/quotes' />;
    }

    return (
        <div>
            <h1>Quote Detail</h1>
            <pre>{JSON.stringify(quote, null, 2)}</pre>
        </div>
    )
}

export default QuoteDetail
