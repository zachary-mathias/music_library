import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Gallery from './Components/Gallery'
import SearchBar from './Components/SearchBar'
import AlbumView from './Components/AlbumView'
import ArtistView from './Components/ArtistView'
import { DataContext } from './Contexts/DataContext'

function App(){
    const [search, setSearch] = useState('')
    const [message, setMessage] = useState('Search for Music!')
    const [data, setData] = useState([])

    useEffect(() => {
      const fetchData = async () => {
        const API_URL = `https://itunes.apple.com/search?term=${encodeURI(search)}`
        const response = await fetch(API_URL)       
        const data = await response.json()
        console.log(data)
        if (data.results.length > 0) {
          setData(data.results)          
        } else {
            setMessage('Not Found')
        }
      }

      if (search) fetchData()
      
    }, [search])

    const handleSearch = (e, term) => {
      e.preventDefault()
      setSearch(term)
    }


    return (
      <div>
      {message}
          <Router>
              <Routes>
                  <Route path="/" element={
                      <>
                          <SearchBar handleSearch = {handleSearch}/>
                          <DataContext.Provider value={data}>
                          <Gallery data={data} />
                          </DataContext.Provider>
                      </>
                  } />
                  <Route path="/album/:id" element={<AlbumView />} />
                  <Route path="/artist/:id" element={<ArtistView />} />
              </Routes>
          </Router>
      </div>
  )
}
//     return (
//         <div>
//             <SearchBar handleSearch={handleSearch}/>
//             {message}
//             <DataContext.Provider value={data}>
//             <Gallery />
//             <AlbumView />
//             <ArtistView />
//             </DataContext.Provider>
//         </div>
//     )
// }

export default App