import {Image, StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import React from 'react';

const ArtistCard = ({artist}) => {
  return (
    <TouchableOpacity>
      <View style={styles.artistContainer}>
        <Image
          source={{uri: artist?.data?.visuals?.avatarImage?.sources[1]?.url}}
          style={styles.artistImage}
        />
        <Text numberOfLines={1} style={styles.artistName}>
          {artist?.data?.profile?.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ArtistCard;

const styles = StyleSheet.create({
  artistContainer: {
    width: 100,
    margin: 4,
  },
  artistImage: {
    width: 90,
    height: 90,
    borderRadius: 50,
  },
  artistName: {
    color: 'black',
    marginTop: 7,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
