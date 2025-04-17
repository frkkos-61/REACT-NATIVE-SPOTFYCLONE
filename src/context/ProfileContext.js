import {createContext, useEffect, useState} from 'react';
import axios from 'axios';

export const ProfileContext = createContext();

export const ProfileProvider = ({children}) => {
  const [profilData, setProfilData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const getProfilData = async () => {
    const options = {
      method: 'GET',
      url: 'https://spotify23.p.rapidapi.com/user_profile/',
      params: {
        id: 'nocopyrightsounds',
        playlistLimit: '10',
        artistLimit: '10',
      },
      headers: {
        'x-rapidapi-key': '380ab61b48msha7ec17f410cc7dcp197aafjsna77b9ca90d72',
        'x-rapidapi-host': 'spotify23.p.rapidapi.com',
      },
    };

    try {
      const response = await axios.request(options);
      setProfilData(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfilData();
  }, []);

  return (
    <ProfileContext.Provider value={{error, loading, profilData}}>
      {children}
    </ProfileContext.Provider>
  );
};
