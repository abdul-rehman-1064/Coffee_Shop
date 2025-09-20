import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
  ImageBackground,
  ScrollView,
  FlatList,
  Image,
} from 'react-native';
import React, { useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto'
import coffeeMenu from '../data/index.js'
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import {addToCart} from '../store/authSlice.js'

const { width, height } = Dimensions.get('window');


const Home = () => {
	const navigation = useNavigation();
  const dispatch = useDispatch();
  	const BannerImage = require('../assests/homeSet.png');
	const [selectedCategory, setSelectedCategory] = useState('allCoffees');
	const [searchText, setSearchText] = useState("");


	const categories = [
    { id: 'allCoffees', label: 'All Coffee' },
    { id: 'latte', label: 'Latte' },
    { id: 'macchiato', label: 'Macchiato' },
    { id: 'espresso', label: 'Espresso' },
    { id: 'cappuccino', label: 'Cappuccino' },
  ];


	const onNavigateToDetail = (data)=>{
		navigation.navigate('Detail', { coffee: data });
		
	}

	const onAddToCart= (data)=>{
    const newData = {...data , size:'M'}
    dispatch(addToCart(newData))
		// navigation.navigate('Cart');
	}


	const getFilteredData = () => {
    return coffeeMenu.filter((item) => {

      const matchCategory =
        selectedCategory === 'allCoffees' || item.category === selectedCategory;

      const matchSearch =
        item.name.toLowerCase().includes(searchText.toLowerCase()) ||
        item.description.toLowerCase().includes(searchText.toLowerCase());

      return matchCategory && matchSearch;
    });
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#313131', '#111111']}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <Text style={styles.locationText}>Location</Text>
        <View style={styles.locationContainer}>
          <Text style={styles.location}>Ghakkhar Mandi , Pakistan</Text>
          <Ionicons name="chevron-down-outline" size={14} color="#D8D8D8" />
        </View>
        <View style={styles.searchBar}>
          <View style={styles.searchContainer}>
            <View style={styles.setIcon}>
              <Ionicons
                name="search"
                size={20}
                color="#999"
                style={styles.searchIcon}
              />
            </View>

            <TextInput
              style={styles.searchInput}
              placeholder="Search coffee"
              placeholderTextColor="#999"
			  onChangeText={(text) => setSearchText(text)}
            />
          </View>
          <TouchableOpacity style={styles.filterButton} activeOpacity={0.8}>
            <Ionicons name="options-outline" style={styles.filterText} />
          </TouchableOpacity>
        </View>

        <ImageBackground
          style={styles.promoSection}
          source={BannerImage}
        ></ImageBackground>
      </LinearGradient>


		 <View style={styles.content}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.button,
                selectedCategory === category.id && styles.active,
              ]}
              onPress={() => setSelectedCategory(category.id)} 
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.buttonText,
                  selectedCategory === category.id && styles.activeText, 
                ]}
              >
                {category.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

		<FlatList
        style={styles.itemList}
        data={getFilteredData()}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.contentContainer}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.coffeeCard}
            onPress={() => onNavigateToDetail(item)}
            activeOpacity={0.8}
          >
            <View style={styles.imageContainer}>
              <View style={styles.starContainer}>
                <Ionicons name="star" style={styles.starIcon} />
                <Text style={styles.stars}>{item.stars}</Text>
              </View>
              <Image source={item.image} style={styles.coffeeImage} />
            </View>
            <Text style={styles.coffeeName}>{item.name}</Text>
            <Text style={styles.coffeeDescription}>{item.description}</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.coffeePrice}>${item.price}</Text>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => onAddToCart(item)}
              >
                <Ionicons name="add" style={styles.addButtonText} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={() => (
          <Text style={{ textAlign: 'center',fontSize:19, marginTop: 120, color: '#999' }}>
            No coffee found <Fontisto name="coffeescript" color='#C67C4E' size={17}/>
          </Text>
        )}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 70,
    height: 320,
    paddingBottom: 100,
  },
  locationText: {
    fontSize: 12,
    lineHeight: '40',
    color: '#A2A2A2',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  location: {
    fontSize: 14,
    fontWeight: '700',
    color: '#D8D8D8',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginTop: 25,
  },
  searchContainer: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    borderWidth: 3,
    borderColor: '#2A2A2A',
    backgroundColor: '#2A2A2A',
    overflow: 'hidden',
    borderRadius: 12,
  },
  setIcon: {
    position: 'absolute',
    left: 38,
    top: 10,
    overflow: 'hidden',
  },
  searchIcon: {
    fontSize: 19,
    color: 'white',
    overflow: 'hidden',
  },
  searchInput: {
    borderRadius: 12,
    paddingVertical: 12,
    paddingLeft: 30,
    fontSize: 14,
    width: 200,
    color: '#A2A2A2',
    borderWidth: 0,
    outlineStyle: 'none',
  },
  filterButton: {
    backgroundColor: '#C67C4E',
    borderRadius: 12,
  },
  filterText: {
    color: 'white',
    fontSize: 20,
    padding: 10,
  },
  promoSection: {
    position: 'absolute',
    bottom: -75,
    left: 24,
    width: width - 48,
    height: 150,
    borderRadius: 16,
    overflow: 'hidden',
    paddingHorizontal: 24,
    paddingVertical: 14,
    resizeMode: 'cover',
  },
  content: {
		paddingHorizontal: 24,
		paddingTop: 100,
	},
	button: {
		backgroundColor: '#EDEDED',
		borderRadius: 6,
		paddingVertical: 4,
		paddingHorizontal: 8,
		marginRight: 16,
		alignItems: 'center',
		justifyContent: 'center',
	},
	active: {
		backgroundColor: '#C67C4E'
	},
	buttonText: {
		color: '#313131',
		fontSize: 14,
		fontWeight: '600',
		lineHeight: '150%'
	},
	activeText: {
		fontSize: 14,
		fontWeight: '800',
		color: 'white'
	},
	itemList: {
		paddingHorizontal: 24,
		marginTop: 16,
	},
	contentContainer: {
		paddingVertical: 16,
	},
	columnWrapper: {
		justifyContent: 'space-between',
		marginBottom: 24,
		gap: 16
	},
	coffeeCard: {	
		flex: 1,
		backgroundColor: 'white',
		borderRadius: 16,
		paddingHorizontal: 8,
		paddingTop: 8,
		paddingBottom: 12
	},
	imageContainer: {
		position: 'relative',
		borderRadius: 16,
		overflow: 'hidden'
	},
	starContainer: {
		position: 'absolute',
		top: 10,
		right: 10,
		zIndex: 10,
		flexDirection: 'row',
		alignItems: 'center',
		gap: 4
	},
	stars: {
		fontSize: 12,
		fontWeight: '700',
		lineHeight: '150%',
		color: 'white'
	},
	starIcon:{
		color: '#FBBE21',
		fontSize: 14
	},
	coffeeImage: {
		width: '100%',
		height:128,
	},
	coffeeName: {
		fontSize: 16,
		fontWeight: '700',
		lineHeight: '150%',
		color: '#242424'
	},
	coffeeDescription: {
		fontSize: 12,
		lineHeight: '120%',
		color: '#A2A2A2'
	},
	priceContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginTop: 5
	},
	coffeePrice: {
		fontSize: 18,
		fontWeight: '700',
		lineHeight: '150%',
		color: '#050505'
	},
	addButton: {
		backgroundColor: '#C67C4E',
		borderRadius: 8
	},
	addButtonText: {
		padding: 8,
		color: 'white',
		fontSize: 16
	}
});
