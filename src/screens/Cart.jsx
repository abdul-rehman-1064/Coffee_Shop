import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increaseQuantity, decreaseQuantity } from '../store/authSlice';
import { useNavigation } from '@react-navigation/native';

const Cart = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.auth.totalCart);
  const sortedCart = [...cartItems].sort((a, b) => a.id - b.id);
  const totalPrice =
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const goToHome = () => {
    navigation.navigate('main');
  };

  const decreaseQty = (data) => {
    dispatch(decreaseQuantity(data));
  };

  const increaseQty = (data) => {
    dispatch(increaseQuantity(data));
  };

  return (
    <ScrollView>
      <View>
        <View style={styles.setHead}>
          <Text style={styles.heading}>Shopping Cart</Text>
          <Text style={styles.Subheading}>
            Review your selected items before checkout in your shopping cart.
          </Text>
        </View>

        <View style={styles.container}>
          <FlatList
            data={sortedCart}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.item}>
               
                <Image source={item.image} style={styles.setImage} />
                <View style={styles.itemDetails}>
                  <Text
                    style={styles.itemText}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {item.name}
                  </Text>
                  <Text style={styles.itemSize}>({item.size})</Text>
                </View>
                <View style={styles.rightContainer}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.itemQtyMinus}
                    onPress={() => decreaseQty(item)}
                  >
                    <Text style={{ color: 'black' }}>-</Text>
                  </TouchableOpacity>

                  <Text style={styles.itemQty}>{item.quantity}</Text>

                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.itemQtyPlus}
                    onPress={() => increaseQty(item)}
                  >
                    <Text style={{ color: 'white' }}>+</Text>
                  </TouchableOpacity>
                  <Text style={styles.price}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </Text>
                </View>
              </View>
            )}
          />

          {cartItems.length > 0 ? (
            <Text style={styles.total}>Total: ${totalPrice.toFixed(2)}</Text>
          ) : (
            <View>
              <Text style={styles.noProduct}>No product in Cart</Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={goToHome}
                style={styles.setPage}
              >
                <Text style={styles.setLastText}>Buy Coffee</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    marginTop: 38,
    fontSize: 32,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    color: '#db8a58ff',
    textAlign: 'center',
  },
  setHead: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#252525ff',
    height: 190,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
  },
  Subheading: {
    color: 'white',
    textAlign: 'center',
    width: 320,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  setImage: {
    width: 50,
    height: 50,
    borderRadius: 12,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  itemSize: {
    fontSize: 13,
    fontWeight: '600',
    color: '#C67C4E',
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 8, 
  },
  itemQtyMinus: {
    backgroundColor: '#aaa7a7ff',
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemQty: {
    fontWeight: 'bold',
    fontSize: 15,
    marginHorizontal: 6,
  },
  itemQtyPlus: {
    backgroundColor: '#C67C4E',
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
  },
  total: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  noProduct: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    marginTop: 230,
  },
  setPage: {
    backgroundColor: '#C67C4E',
    padding: 10,
    width: 150,
    borderRadius: 12,
    marginLeft: 117,
    marginTop: 22,
  },
  setLastText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
});
