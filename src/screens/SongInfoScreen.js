import {useRoute, useNavigation} from '@react-navigation/native';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';

const SongInfoScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  //* HomeScreenden gönderilen veriyi useRoute ile aldık
  const {album} = route.params || {};

  //* Gelen verileri parçalayarak aldık
  const {coverArt, name, artist, year} = album;

  return (
    <LinearGradient colors={['#3F7D58', '#67AE6E']} style={{flex: 1}}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.paddingView}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>

          <View style={styles.imageView}>
            <Image source={{uri: coverArt}} style={styles.coverImage} />
          </View>
        </View>

        <Text style={styles.albumNameText}>{name} </Text>

        <View style={styles.artistContainer}>
          <Text style={styles.artistText}>{artist} </Text>
        </View>

        <Pressable style={styles.controlContainer}>
          <Pressable style={styles.downButton}>
            <AntDesign name="arrowdown" size={24} color="black" />
          </Pressable>

          <View style={styles.playButtonView}>
            <MaterialCommunityIcons
              name="cross-bolnisi"
              size={24}
              color="orange"
            />
            <Pressable style={styles.playButton}>
              <Entypo name="controller-play" size={24} color="black" />
            </Pressable>
          </View>
        </Pressable>

        <View>
          <View style={styles.infoView}>
            <View style={styles.infoContainer}>
              <Text style={styles.infoText}>Album {name} </Text>
              <Text style={styles.infoText}>Artist {artist} </Text>
              <Text style={styles.infoText}>Year {year} </Text>
            </View>
            <Entypo name="dots-three-vertical" size={24} color="black" />
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default SongInfoScreen;

const styles = StyleSheet.create({
  scrollView: {
    marginTop: 50,
  },
  paddingView: {
    padding: 10,
  },
  coverImage: {
    width: 250,
    height: 250,
    borderRadius: 15,
  },
  imageView: {
    flex: 1,
    alignItems: 'center',
  },
  albumNameText: {
    fontWeight: 'bold',
    marginHorizontal: 12,
    marginTop: 10,
    fontSize: 20,
  },
  artistContainer: {
    marginHorizontal: 12,
    marginTop: 10,
  },
  artistText: {
    fontSize: 13,
    fontWeight: '700',
  },
  controlContainer: {
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    margin:10
  },
  downButton: {
    backgroundColor: '#D0E7D2',
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  playButtonView: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  playButton: {
    backgroundColor: '#D0E7D2',
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover',
    borderRadius: 30,
  },
  infoView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 12,
    marginTop: 10,
  },
  infoContainer: {
    gap: 5,
  },
  infoText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
