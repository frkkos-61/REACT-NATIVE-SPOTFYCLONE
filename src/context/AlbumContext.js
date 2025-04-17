import {createContext, useEffect, useState} from 'react';
import axios from 'axios';

export const AlbumContext = createContext();

export const AlbumProvider = ({children}) => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getAlbums = async () => {
    const options = {
      method: 'GET',
      url: 'https://spotify23.p.rapidapi.com/search/',
      params: {
        q: 'Türkiye de popüler olanlar',
        type: 'albums',
        offset: '0',
        limit: '10',
        numberOfTopResults: '5',
      },
      headers: {
        'x-rapidapi-key': '380ab61b48msha7ec17f410cc7dcp197aafjsna77b9ca90d72',
        'x-rapidapi-host': 'spotify23.p.rapidapi.com',
      },
    };

    try {
        const response = await axios.request(options);
        const albumItems = response.data?.albums?.items?.map(item => ({
          uri: item.data.uri,
          name: item.data.name,
          artist: item.data.artists.items[0].profile.name,
          coverArt: item.data.coverArt.sources[0].url,
          year: item.data.date.year,
        }));
        setAlbums(albumItems);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

  useEffect(() => {
    getAlbums();
  }, []);

  return (
    <AlbumContext.Provider value={{albums, loading, error}}>
      {children}
    </AlbumContext.Provider>
  );
};
