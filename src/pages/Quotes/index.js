import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Error from '../../components/Error';
import Loading from '../../components/Loading';
import { errorSelector, fetchAllQuotes, quotesSelector, statusSelector } from '../../redux/quotesSlice';
import Item from './Item';

function Quotes() {
    const quotes = useSelector(quotesSelector);
    const status = useSelector(statusSelector);
    const error = useSelector(errorSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        if(status === 'idle') {
            dispatch(fetchAllQuotes());
        }
    }, [dispatch]);

    if(status === 'loading') {
        return <Loading />
    }

    if(status === 'failed') {
        return <Error message={error} />
    }

    return (
        <div style={{ padding: "10px" }}>
            <h1>Quotes</h1>
            {status === 'succeeded' && 
                quotes.map((quote) => (
                    <Item key={quote.quote_id} item={quote} />
                )
            )}
        </div>
    )
}

export default Quotes
