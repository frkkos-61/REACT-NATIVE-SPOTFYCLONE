import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {ProfileContext} from '../context/ProfileContext';
import round from 'lodash/round';

const ProfileScreen = () => {
  const {error, loading, profilData} = useContext(ProfileContext);

  const {name, image_url, followers_count, public_playlists} = profilData;

  const formatFollowers = count => {
    if (count >= 1000000) {
      return `${round(count / 1000000, 1)}M`;
    }
    if (count >= 1000) {
      return `${round(count / 1000, 1)}K`;
    }
    if (count >= 100) {
      return count;
    }
  };
  return (
    <LinearGradient colors={['#3F7D58', '#67AE6E']} style={{flex: 1}}>
      <ScrollView style={styles.mainContainer}>
        <View style={styles.mainView}>
          <View style={styles.profilContainer}>
            <Image source={{uri: image_url}} style={styles.profileImage} />

            <View style={styles.textView}>
              <Text style={styles.profileName}>{name} </Text>
              <Text style={styles.profilFollowers}>
                {formatFollowers(followers_count)}{' '}
              </Text>
            </View>
          </View>
        </View>
        <Text style={styles.sectionTitle}>Your Playlist</Text>
        <View style={styles.playlistContainer}>
          {public_playlists?.map(playlist => (
            <View
              key={playlist.uri}
              style={{
                marginVertical: 10,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 5,
              }}>
              <Image source={{uri: image_url}} style={styles.playlistImage} />
              <View>
                <Text style={styles.playlistName}>{playlist.name}</Text>
                <Text style={styles.playlistFollowers}>
                  {formatFollowers(playlist.followers_count)}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 50,
  },
  mainView: {
    padding: 15,
  },
  profilContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  textView: {},
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 20,
    resizeMode: 'cover',
  },
  profileName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  profilFollowers: {
    fontSize: 16,
    fontWeight: '300',
  },
  sectionTitle: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 20,
    marginHorizontal: 12,
  },
  playlistContainer: {
    padding: 15,
  },
  playlistName: {
    color: '#BDD2B6',
    fontWeight: 'bold',
    fontSize: 15,
    marginTop: 4,
  },
  playlistFollowers: {
    color: '#AC0C0C',
    fontWeight: 'bold',
  },
  playlistImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
});
