import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCharacters } from '../../redux/characterSlice';
import Masonry from "react-masonry-css";
import "./styles.css";
import Loading from '../../components/Loading';
import Error from '../../components/Error';

function Home() {
    const characters = useSelector(state => state.characters.items);
    const page = useSelector(state => state.characters.page);
    const hasNextPage = useSelector(state => state.characters.hasNextPage);
    const isLoading = useSelector(state => state.characters.isLoading);
    const error = useSelector(state => state.characters.error);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCharacters(page));
    }, [dispatch]);

    if(isLoading) {
        return <Loading />
    }

    if(error) {
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
                        <img 
                            alt={character.name}
                            src={character.img}
                            className='character'
                        />
                        <div className="character_name">{character.name}</div>
                    </div>
                ))}
            </Masonry>
            {isLoading && <Loading />}
            {hasNextPage && !isLoading && (
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
