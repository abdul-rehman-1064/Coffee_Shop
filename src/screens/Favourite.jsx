import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector  ,useDispatch} from 'react-redux';
import { removeFavourites } from '../store/authSlice.js';

const Favourite = () => {
  const dispatch = useDispatch()
  const favouriteData = useSelector(state => state.auth?.favourite);

  const handleRemoveFavourite = item => {
    const updatedItem = { ...item, favouriteBool: false };
    dispatch(removeFavourites(updatedItem));
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.conText}>Favourite Coffees</Text>
        <Text style={styles.subText}>
          Here are all the coffees you’ve marked as favourite.
        </Text>
        <View style={styles.heartIconText}>
          <Ionicons
            name="heart"
            size={27}
            style={[styles.heartIcon, { color: '#C67C4E' }]}
          />
          <Text style={styles.setTextIcon}>({favouriteData?.length || 0})</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {favouriteData && favouriteData.length > 0 ? (
          favouriteData.map((item, index) => (
            <View style={styles.cardContainer} key={index}>
              <View style={styles.textContainer}>
                <Text style={styles.setName}>{item.name}</Text>
                <TouchableOpacity activeOpacity={0.6} onPress={()=>handleRemoveFavourite(item)}>
                  <Ionicons
                    name="heart"
                    style={[styles.heartIcon1, { color: '#C67C4E' }]}
                  />
                </TouchableOpacity>
              </View>
              <Image style={styles.setImage} source={item.image} />
              <View style={styles.footerSet}>
                <Text style={{ fontWeight: 'bold' }}>{item.description}</Text>
                <Text>
                  <Ionicons name="star" style={styles.starIcon} /> {item.stars}{' '}
                  ({item.opinions})
                </Text>
                <Text style={styles.Price}>$ {item.price}</Text>
              </View>
            </View>
          ))
        ) : (
          <Text style={{ textAlign: 'center', marginTop: 20, color: 'gray',marginTop:280 }}>
            No Favourite Item
          </Text>
        )}
      </ScrollView>
    </View>
  );
};

export default Favourite;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#252525ff',
    height: 180,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
  },
  conText: {
    color: '#db8a58ff',
    textAlign: 'center',
    marginTop: 52,
    fontWeight: 'bold',
    fontSize: 32,
    textDecorationLine: 'underline',
  },
  subText: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 7,
  },
  heartIcon: {
    marginTop: 12,
    marginLeft:152
  },
  heartIconText: {
    color: 'white',
    marginLeft: 16,
    flexDirection: 'row',
  },
  setTextIcon: {
    color: 'white',
    marginTop: 12,
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardContainer: {
    backgroundColor: 'white',
    marginTop: 12,
    marginHorizontal: 10,
    paddingBottom: 10,
    borderRadius: 12,
    elevation: 3,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    marginHorizontal: 20,
  },
  setName: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  heartIcon1: {
    fontSize: 24,
  },
  setImage: {
    height: 120,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 12,
    marginTop: 10,
    marginBottom: 2,
  },
  starIcon: {
    color: '#FBBE21',
    fontSize: 14,
  },
  footerSet: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    marginHorizontal: 20,
  },
  Price: {
    fontWeight: 'bold',
    color: '#C67C4E',
    fontSize: 16,
  },
});
