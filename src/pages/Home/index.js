import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCharacters } from '../../redux/characterSlice';
import Masonry from "react-masonry-css";
import "./styles.css";
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import { Link } from 'react-router-dom';

function Home() {
    const characters = useSelector(state => state.characters.items);
    const page = useSelector(state => state.characters.page);
    const hasNextPage = useSelector(state => state.characters.hasNextPage);
    const status = useSelector(state => state.characters.status);
    const error = useSelector(state => state.characters.error);

    const dispatch = useDispatch();

    useEffect(() => {
        if(status === 'idle') {
            dispatch(fetchCharacters());
        }
    }, [dispatch, status]);

    if(status === 'loading') {
        return <Loading />
    }

    if(status === 'failed') {
        return <Error message={error}/>
    }

    return (
        <div>
            <h1>Characters</h1>
            <Masonry
                breakpointCols={4}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
            >
                {characters.map((character) => (
                    <div key={character.char_id}>
                        <Link to={`/char/${character.char_id}`}>
                            <img 
                                alt={character.name}
                                src={character.img}
                                className='character'
                            />
                            <div className="character_name">{character.name}</div>
                        </Link>
                    </div>
                ))}
            </Masonry>
            {status === 'loading' && <Loading />}
            {hasNextPage && !status !== 'loading' && (
                <div style={{ padding: '20px 0 40px 0', textAlign: 'center' }}>
                    <button
                        onClick={() => dispatch(fetchCharacters(page))}
                    >
                        Load More
                    </button>
                </div>
            )}   
            {!hasNextPage && <div>There is nothing to be shown!</div>} 
        </div>
    )
}

export default Home
