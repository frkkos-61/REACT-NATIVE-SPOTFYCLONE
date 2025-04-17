import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';


const LoginScreen = () => {

  const navigation = useNavigation()

  return (
    <LinearGradient colors={['#3F7D58', '#67AE6E']} style={{flex: 1}}>
      <SafeAreaView>
        <View style={{height: 80}} />
        <Entypo
          name="spotify"
          color="black"
          size={80}
          style={{textAlign: 'center'}}
        />

        <Text style={styles.loginText}>Millions of Songs Free on Spotify</Text>

        <View style={{height: 90}} />

        <Pressable style={styles.loginTitle} onPress={()=>navigation.navigate("Main")}>
          <Text style={styles.inText}>Sign In with Spotify !</Text>
        </Pressable>

        <Pressable style={styles.Button}>
          <MaterialIcons name="phone-android" color="black" size={24}/>
          <Text style={styles.outText}>Continue with Phone Number </Text>
        </Pressable>

        <Pressable style={styles.Button}>
          <AntDesign name="google" color="black" size={24} />
          <Text style={styles.outText}>Continue with Google</Text>
        </Pressable>

        <Pressable style={styles.Button}>
        <Entypo name="facebook" size={24} color="black" /> 
          <Text style={styles.outText}>Continue with FaceBook</Text>
        </Pressable>

      </SafeAreaView>
    </LinearGradient>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  loginText: {
    color: 'black',
    fontSize: 37,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 40,
  },
  loginTitle: {
    backgroundColor: '#C1CFA1',
    padding: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 300,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    borderRadius: 25,
  },
  inText: {
    fontWeight: 'bold',
  },
  Button: {
    backgroundColor: '#466551',
    padding: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    flexDirection: 'row',
    width: 300,
    marginVertical: 10,
    borderRadius: 25,
    justifyContent:"center",
    alignItems:"center"
  },
  outText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
});
