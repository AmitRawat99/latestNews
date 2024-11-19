import React, { useEffect, useState } from 'react'

function MainPage() {
    const [GetApi, setGetApi] = useState([])
    const [searchQuary, setsearchQuary] = useState('')
    const [loading, setloading] = useState(false)
    const [error, seterror] = useState(null)

    const APi_Key = '442c692515c84ac29c0762e84db2a193'

    const GetData = async (query) => {
        setloading(true);
        seterror(null);
        try {
            const response = await fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=${APi_Key}`)
            const jsonData = await response.json()
            setGetApi(jsonData.articles)

        } catch (error) {
            seterror('Error fetching data. Please try again later..')
            console.error('Error fetching data', error)
        }
        setloading(false)
    }

    useEffect(() => {
        GetData('modi');
    }, [])

    const SearchHandle = (e) => {
        setsearchQuary(e.target.value)
    }

    const handleSearch = () => {
        if (searchQuary.trim()) {
            GetData(searchQuary)
        }
    }

    const searchHandle = (buttonValue) => {
        GetData(buttonValue);
    }

    return (
        <div>
            <header>
                <div className="main-header">
                    <div className="header-content">
                        <div className="header-logo">
                            <h1>Trending News</h1>
                        </div>
                        <ul className='ullist'>
                            <li><a href="/" onClick={(e) => searchHandle('All News')}>All News</a></li>
                            <li><a href="/" onClick={(e) => searchHandle('International News')}>International News</a></li>
                        </ul>
                        <div className="searchInput">
                            <input
                                type="text"
                                placeholder='Search Here'
                                value={searchQuary}
                                onChange={SearchHandle}
                            />
                            <button onClick={handleSearch}>Search</button>
                        </div>
                    </div>
                </div>
                <div className="title">
                    <h1>Stay Updated With Trending News</h1>
                </div>
                <div className="cardButton">
                    <div className="AllButton">
                        <button onClick={() => searchHandle('Sports')}>Sports</button>
                        <button onClick={() => searchHandle('Politics')}>Politics</button>
                        <button onClick={() => searchHandle('Entertainment')}>Entertainment</button>
                        <button onClick={() => searchHandle('Health')}>Health</button>
                        <button onClick={() => searchHandle('Fitness')}>Fitness</button>
                    </div>
                </div>
                <div className="MultiplesCards">
                    {loading ? (
                        <h1 style={{ margin: 'auto', textAlign: 'center' }}>Loading...</h1>
                    ) : error ? (
                        <h1>{error}</h1>
                    ) : GetApi.length > 0 ? (
                        GetApi.map((item, idx) => (
                            <div className="newsCards" key={idx}>
                                <div className="newsApiCards">
                                    <img
                                        src={item.urlToImage || 'https://via.placeholder.com/150'}
                                        alt={item.title}
                                    />
                                    <p>{item.title}</p>
                                    <h6 onClick={() => window.open(item.url, ('_blank'))}>{item.description}</h6>
                                    <div className="btn">
                                        <button onClick={() => window.open(item.url, '_blank')}>Read More</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <h1>No articles found</h1>
                    )}
                </div>
            </header>
        </div>
    )
}

export default MainPage
