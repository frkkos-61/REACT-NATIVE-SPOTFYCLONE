import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const AlbumCard = ({album}) => {
  const navigation = useNavigation()
  return (
    <TouchableOpacity onPress={()=>navigation.navigate("Info" ,{album})} style={styles.albumContainer}>
      <Image source={{uri: album.coverArt}} style={styles.albumImage} />
      <Text style={styles.albumName}>{album.name} </Text>
      <Text style={styles.albumArtist}>{album.artist} </Text>
    </TouchableOpacity>
  );
};

export default AlbumCard;

const styles = StyleSheet.create({
  albumContainer: {
    width:100,
    alignItems:"center",
    marginHorizontal:7,
    marginVertical:5
  },
  albumImage: {
    width: 100,
    height: 100,
  },
  albumName: {
    marginTop: 5,
    fontWeight: 'bold',
  },
  albumArtist: {
    color:"blue",
    fontSize:12,
    fontWeight:"bold"
  },
});
