import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToCart,
  addToFavourites,
  removeFavourites,
} from '../store/authSlice.js';

const Detail = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { coffee } = route.params;
  const [selectedSize, setSelectedSize] = useState('M');
  const favouriteList = useSelector(state => state.auth.favourite);

  const handleNavigateBack = () => {
    navigation.navigate('Home');
  };

  const isFavourite = favouriteList.some(item => item.id === coffee.id);

  const addingToCart = () => {
    const newData = { ...coffee, size: selectedSize };
    // console.warn(newData);

    dispatch(addToCart(newData));
    navigation.navigate('Home');
  };

  const toggle = () => {
    if (isFavourite) {
      dispatch(removeFavourites(coffee));
    } else {
      dispatch(addToFavourites({ ...coffee, favouriteBool: true }));
    }
  };

  const sizeArray = ['S', 'M', 'L'];
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.8} onPress={handleNavigateBack}>
          <Ionicons
            name="chevron-back-outline"
            style={styles.backArrow}
          ></Ionicons>
        </TouchableOpacity>
        <Text style={styles.detailText}>Detail</Text>
        {isFavourite ? (
          <TouchableOpacity activeOpacity={0.6} onPress={toggle}>
            <Ionicons
              name="heart"
              style={[styles.heartIcon, { color: '#C67C4E' }]}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity activeOpacity={0.6} onPress={toggle}>
            <Ionicons name="heart-outline" style={styles.heartIcon} />
          </TouchableOpacity>
        )}
      </View>

      <Image source={coffee.image} style={styles.coffeImage}></Image>
      <Text style={styles.coffeeName}>{coffee.name}</Text>
      <View style={styles.descriptionContainer}>
        <Text style={styles.coffeeDescription}>{coffee.description}</Text>
        <View style={styles.tipeIconsContainer}>
          <Ionicons name="pint" style={styles.icon}></Ionicons>
          <Ionicons name="ribbon" style={styles.icon}></Ionicons>
          <Ionicons name="flame" style={styles.icon}></Ionicons>
        </View>
      </View>

      <View style={styles.starContainer}>
        <Ionicons name="star" style={styles.starIcon}></Ionicons>
        <Text style={styles.stars}>{coffee.stars}</Text>
        <Text style={styles.opinions}>({coffee.opinions})</Text>
      </View>

      <View style={styles.line}></View>
      <Text style={styles.descriptionTitle}>Description</Text>
      <Text style={styles.description}>
        {coffee.longDescription}
        <TouchableOpacity activeOpacity={0.8}>
          <Text style={styles.readMore}> Read More</Text>
        </TouchableOpacity>
      </Text>

      <Text style={styles.sizeTitle}>Size</Text>
      <View style={styles.sizeList}>
        {sizeArray.map(size => (
          <TouchableOpacity
            key={size}
            style={[
              styles.sizeBox,
              selectedSize === size && styles.activeSizeBox,
            ]}
            onPress={() => setSelectedSize(size)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.sizeText,
                selectedSize === size && styles.activeSizeText,
              ]}
            >
              {size}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.bottomPanel}>
        <View>
          <Text style={styles.pricetitle}>Price</Text>
          <Text style={styles.price}>{coffee.price}</Text>
        </View>
        <TouchableOpacity
          style={styles.buyNowButton}
          activeOpacity={0.8}
          onPress={addingToCart}
        >
          <Text style={styles.buyNowButtonText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Detail;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 60,
    flex: 1,
    position: 'relative',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backArrow: {
    fontSize: 24,
    color: '#242424',
  },
  detailText: {
    fontSize: 16,
    fontWeight: 700,
    lineHeight: '120%',
    color: '#242424',
  },
  heartIcon: {
    fontSize: 24,
    color: '#242424',
  },
  coffeImage: {
    width: '100%',
    height: 202,
    borderRadius: 16,
    marginTop: 20,
  },
  coffeeName: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: 700,
    lineHeight: '150%',
    color: '#242424',
  },
  descriptionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'flex-start',
  },
  coffeeDescription: {
    fontSize: 12,
    fontWeight: 500,
    lineHeight: '120%',
    color: '#A2A2A2',
  },
  tipeIconsContainer: {
    flexDirection: 'row',
    gap: 4,
  },
  icon: {
    padding: 10,
    backgroundColor: '#EDEDED',
    color: '#C67C4E',
    borderRadius: 12,
    fontSize: 20,
  },
  starContainer: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  },
  starIcon: {
    color: '#FBBE21',
    fontSize: 14,
  },
  stars: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2A2A2A',
  },
  opinions: {
    fontSize: 12,
    fontWeight: '500',
    color: '#2A2A2A',
  },
  line: {
    backgroundColor: '#E3E3E3',
    width: '100%' - 10,
    height: 2,
    marginTop: 14,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  descriptionTitle: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: '700',
    lineHeight: '24',
    color: '#2A2A2A',
  },
  description: {
    fontSize: 14,
    marginTop: 12,
    fontWeight: '500',
    lineHeight: '18',
    color: '#A2A2A2',
  },
  readMore: {
    color: '#C67C4E',
    fontWeight: '600',
    marginLeft: 2,
  },
  sizeTitle: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: '700',
    lineHeight: '24',
    color: '#2A2A2A',
  },
  sizeList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
    marginTop: 10,
  },

  sizeBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E3E3E3',
    marginTop: 12,
  },

  activeSizeBox: {
    backgroundColor: '#F9F2ED',
    borderColor: '#C67C4E',
  },

  sizeText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2A2A2A',
  },

  activeSizeText: {
    color: '#C67C4E',
  },
  bottomPanel: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 22,
    marginTop: 30,
    paddingHorizontal: 20,
    paddingTop: 28,
    paddingBottom: 36,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 66,
  },
  buyNowButton: {
    flex: 1,
    backgroundColor: '#C67C4E',
    paddingVertical: 16,
    borderRadius: 16,
  },
  buyNowButtonText: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: '150%',
    color: 'white',
    textAlign: 'center',
  },
  pricetitle: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: '120%',
    color: '#909090',
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    lineHeight: '150%',
    color: '#C67C4E',
    marginTop: 4,
  },
});
