import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const History = () => {
  const historyData = useSelector(state => state.auth.history);
  const navigation = useNavigation();

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {/* Container ko ScrollView ke andar daal diya */}
      <View style={styles.container}>
        <Text style={styles.conText}>Coffee History</Text>
        <Text style={styles.subText}>
          Your past orders are saved in history.
        </Text>
      </View>

      {historyData && historyData.length > 0 ? (
        historyData.map((coffee, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            activeOpacity={0.8}
            onPress={() => navigation.navigate("Detail", { coffee })}
          >
            <Image source={coffee.image} style={styles.image} />

            <View style={styles.info}>
              <Text style={styles.name}>{coffee.name}</Text>
              <Text style={styles.category}>{coffee.category}</Text>
              <Text style={styles.desc}>{coffee.description}</Text>

              <View style={styles.row}>
                <Ionicons name="star" size={16} color="#FFD700" />
                <Text style={styles.rating}>
                  {coffee.stars} ({coffee.opinions})
                </Text>
                <Text style={{ marginLeft: 100, color: "gray" }}>
                  Qty-x({coffee.quantity})
                </Text>
              </View>

              <View style={styles.bottomRow}>
                <Text style={styles.price}>$ {coffee.price}</Text>
                <Text style={styles.addedAt}>
                  Added on {new Date(coffee.addedAt).toLocaleDateString()}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))
      ) : (
        <Text
          style={{
            textAlign: "center",
            marginTop: 280,
            color: "gray",
          }}
        >
          No History
        </Text>
      )}
    </ScrollView>
  );
};

export default History;

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
    marginTop: 62,
    fontWeight: 'bold',
    fontSize: 32,
    textDecorationLine: 'underline',
  },
  subText: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 7,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    marginVertical: 10,
    marginHorizontal: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    overflow: 'hidden',
  },
  image: {
    width: 100,
    height: 135,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  info: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  category: {
    fontSize: 13,
    color: '#C67C4E',
    fontWeight: '600',
    marginTop: 2,
  },
  desc: {
    fontSize: 12,
    color: 'gray',
    marginVertical: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  rating: {
    fontSize: 12,
    marginLeft: 4,
    color: '#444',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  addedAt: {
    fontSize: 11,
    color: 'gray',
  },
});
