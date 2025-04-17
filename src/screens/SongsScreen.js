import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import TrackPlayer, {useProgress} from 'react-native-track-player';
import Modal from 'react-native-modal';
import {useNavigation} from '@react-navigation/native';

const SongsScreen = () => {
  const navigation = useNavigation();
  const progress = useProgress();
  const [searchText, setSearchText] = useState('Türkiye de popüler müzikler');
  const [searchedTracks, setSearchTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSearch = async () => {
    const options = {
      method: 'GET',
      url: 'https://shazam.p.rapidapi.com/search',
      params: {
        term: searchText,
        locale: 'tr-TR',
        offset: '0',
        limit: '5',
      },
      headers: {
        'x-rapidapi-key': '0b0caf0281mshb38311d44ea7344p14c303jsn4396613a5ebc',
        'x-rapidapi-host': 'shazam.p.rapidapi.com',
      },
    };

    try {
      const response = await axios.request(options);
      setSearchTracks(response.data?.tracks?.hits);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const setupPlayer = async () => {
    try {
      await TrackPlayer.setupPlayer();
      TrackPlayer.updateOptions({
        capabilities: [
          TrackPlayer.CAPABILITY_PLAY,
          TrackPlayer.CAPABILITY_PAUSE,
          TrackPlayer.CAPABILITY_STOP,
          TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
          TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
          TrackPlayer.CAPABILITY_SEEK_TO,
        ],
      });
    } catch (error) {
      console.log('Error setting up player:', error);
    }
  };

  const handlePlay = async track => {
    const trackData = {
      id: track?.track?.key,
      url: track?.track?.hub?.actions?.find(action => action.type === 'uri')
        ?.uri,
      title: track?.track?.title,
      artist: track?.track?.subtitle,
      artwork: track?.track?.images?.coverart,
    };

    try {
      await TrackPlayer.reset();
      await TrackPlayer.add(trackData);
      await TrackPlayer.play();
      setSelectedTrack(track?.track);
      setModalVisible(true);
      setIsPlaying(true);
    } catch (error) {
      console.log(error);
    }
  };

  const formatTime = seconds => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);

    return `${mins}:${secs < 10 ? '0' : ' '}${secs}`;
  };

  const togglePlayback = async () => {
    if (isPlaying) {
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.play();
    }
    setIsPlaying(!isPlaying);
  };

  const seekBackward = async () => {
    const position = await TrackPlayer.getPosition();
    await TrackPlayer.seekTo(position - 10);
  };

  const seekForward = async () => {
    const position = await TrackPlayer.getPosition();
    await TrackPlayer.seekTo(position + 10);
  };

  useEffect(() => {
    handleSearch();
    setupPlayer();
  }, []);

  return (
    <>
      <LinearGradient colors={['#3F7D58', '#67AE6E']} style={{flex: 1}}>
        <ScrollView style={{flex: 1, marginTop: 50}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Pressable
              onPress={() => navigation.goBack()}
              style={{marginHorizontal: 10}}>
              <Ionicons name="arrow-back" size={24} color="black" />
            </Pressable>
            <Pressable
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 9,
                marginHorizontal: 10,
              }}>
              <Pressable
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 11,
                  height: 40,
                  backgroundColor: '#ECE2E1',
                  padding: 4,
                  borderRadius: 7,
                }}>
                <AntDesign name="search1" size={24} color="black" />
                <TextInput
                  placeholder="Find in Search Songs"
                  placeholderTextColor={'black'}
                  style={{fontWeight: '300', width: '80%', color: 'black'}}
                  onChangeText={setSearchText}
                  onSubmitEditing={handleSearch}
                />
              </Pressable>
            </Pressable>
          </View>

          <View style={{marginHorizontal: 10, marginVertical: 10}}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>Search Songs</Text>
            <Text style={{fontSize: 15, fontWeight: '400', marginTop: 5}}>
              5
            </Text>
          </View>

          {loading ? (
            <ActivityIndicator size={'large'} color={'black'} />
          ) : (
            searchedTracks.map((item, index) => (
              <Pressable
                onPress={() => handlePlay(item)}
                key={item?.track?.key || index}>
                <View style={styles.trackContainer}>
                  <Image
                    source={{uri: item?.track?.images?.coverart}}
                    style={styles.albumCover}
                  />
                  <View style={styles.trackInfo}>
                    <Text style={styles.trackName}>{item?.track?.title}</Text>
                    <Text style={styles.artistName}>
                      {item?.track?.subtitle}
                    </Text>
                  </View>
                  <Entypo name="controller-play" size={24} color="black" />
                </View>
              </Pressable>
            ))
          )}
        </ScrollView>
      </LinearGradient>

      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        swipeDirection="down"
        onSwipeComplete={() => setModalVisible(false)}
        style={{margin: 0}}>
        <View
          style={{
            backgroundColor: '#3F7D58',
            height: '100%',
            width: '100%',
            paddingTop: 60,
            paddingHorizontal: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <AntDesign name="down" size={24} color="black" />
            </TouchableOpacity>
            <Text style={{fontSize: 16, fontWeight: 'bold', color: 'black'}}>
              Songs
            </Text>
            <Entypo name="dots-three-vertical" size={24} color="black" />
          </View>

          <View style={{padding: 10, marginTop: 20}}>
            <Image
              source={{uri: selectedTrack?.images?.coverart}}
              style={{width: '100%', height: 330, borderRadius: 7}}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 20,
              }}>
              <View>
                <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                  {selectedTrack?.title}{' '}
                </Text>
                <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                  {selectedTrack?.subtitle}{' '}
                </Text>
              </View>
              <AntDesign name="heart" size={24} color="black" />
            </View>

            <View style={{marginTop: 10}}>
              <View
                style={{
                  width: '100%',
                  marginTop: 10,
                  height: 3,
                  backgroundColor: '#ECE2E3',
                  borderRadius: 5,
                }}>
                <View
                  style={[
                    styles.progressbar,
                    {
                      width: `${
                        (progress.position / progress.duration) * 100
                      }%`,
                    },
                  ]}
                />
                <View
                  style={{
                    position: 'absolute',
                    top: -5,
                    width: 10,
                    height: 10,
                    backgroundColor: 'white',
                    borderRadius: 5,
                    left: `${(progress.position / progress.duration) * 100}%`,
                  }}
                />
              </View>

              <View
                style={{
                  marginTop: 12,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text style={{color: 'white', fontSize: 16}}>
                  {formatTime(progress.position)}
                </Text>
                <Text style={{color: 'white', fontSize: 16}}>
                  {formatTime(progress.duration)}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 18,
                  alignItems: 'center',
                }}>
                <Pressable onPress={seekBackward}>
                  <Entypo
                    name="controller-fast-backward"
                    size={30}
                    color="white"
                  />
                </Pressable>
                <Pressable>
                  <Ionicons name="play-skip-back" size={30} color="white" />
                </Pressable>

                <Pressable onPress={togglePlayback}>
                  {isPlaying ? (
                    <AntDesign name="pausecircle" size={60} color="white" />
                  ) : (
                    <Entypo name="controller-play" size={60} color="white" />
                  )}
                </Pressable>

                <Pressable>
                  <Ionicons name="play-skip-forward" size={30} color="white" />
                </Pressable>

                <Pressable onPress={seekForward}>
                  <Entypo
                    name="controller-fast-forward"
                    size={30}
                    color="white"
                  />
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default SongsScreen;

const styles = StyleSheet.create({
  trackContainer: {
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ECE2E1',
  },
  albumCover: {
    width: 70,
    height: 70,
    borderRadius: 30,
  },
  trackInfo: {
    flex: 1,
    marginLeft: 10,
  },
  trackName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  artistName: {
    fontSize: 16,
    color: '#ECE2E1',
    fontWeight: 'bold',
  },
  progresBar: {
    height: '100%',
    backgroundColor: 'white',
  },
});
