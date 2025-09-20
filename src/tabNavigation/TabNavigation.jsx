import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from '../screens/Home';
import Favourite from '../screens/Favourite';
import History from '../screens/History';
import Cart from '../screens/Cart';



const Tab = createBottomTabNavigator();
const TabNavigation = () => {
  return (
    <Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color, size }) => {
					let iconName;

					if (route.name === 'main') {
						iconName = focused ? 'home' : 'home-outline';
					} else if (route.name === 'favourite') {
						iconName = focused ? 'heart' : 'heart-outline';
					}
					else if (route.name === 'store') {
						iconName = focused ? 'bag' : 'bag-outline';
					}
					else if (route.name === 'settings') {
						iconName = focused ? 'notifications' : 'notifications-outline';
					}

					return <Ionicons name={iconName} size={size} color={color} />;
				},
				tabBarShowLabel: false,
				tabBarActiveTintColor: '#C67C4E',
				tabBarInactiveTintColor: '#A2A2A2',
				tabBarStyle: {
					backgroundColor: '#fff',
					borderTopWidth: 0,
					borderTopLeftRadius: 22,
					borderTopRightRadius: 22,	
					paddingHorizontal: 20,
					height: 80
				},
				tabBarItemStyle: {
					paddingVertical: 20,
				},
			})}
		>
			<Tab.Screen 
				name="main" 
				component={Home} 
				options={{ headerShown: false }}
			/>
			<Tab.Screen 
				name="favourite" 
				component={Favourite} 
				options={{ headerShown: false }}
			/>
			<Tab.Screen 
				name="store" 
				component={Cart} 
				options={{ headerShown: false }}
			/>
			<Tab.Screen 
				name="settings" 
				component={History} 
				options={{ headerShown: false }}
			/>
		</Tab.Navigator>
  )
}

export default TabNavigation

const styles = StyleSheet.create({})




// import { StyleSheet } from 'react-native';
// import React from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { Home, Heart, ShoppingBag, Bell } from 'lucide-react-native';

// import HomeScreen from '../screens/Home';
// import FavouriteScreen from '../screens/Favourite';
// import CartScreen from '../screens/Cart';
// import HistoryScreen from '../screens/History';

// const Tab = createBottomTabNavigator();

// const TabNavigation = () => {
//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         tabBarIcon: ({ focused, color, size }) => {
//           let IconComponent;

//           if (route.name === 'main') {
//             IconComponent = Home;
//           } else if (route.name === 'favourite') {
//             IconComponent = Heart;
//           } else if (route.name === 'store') {
//             IconComponent = ShoppingBag;
//           } else if (route.name === 'settings') {
//             IconComponent = Bell;
//           }

//           // Lucide props: color & size
//           return <IconComponent color={color} size={size} strokeWidth={focused ? 2.5 : 2} />;
//         },
//         tabBarShowLabel: false,
//         tabBarActiveTintColor: '#C67C4E',
//         tabBarInactiveTintColor: '#A2A2A2',
//         tabBarStyle: {
//           backgroundColor: '#fff',
//           borderTopWidth: 0,
//           borderTopLeftRadius: 22,
//           borderTopRightRadius: 22,
//           paddingHorizontal: 20,
//           height: 80,
//         },
//         tabBarItemStyle: {
//           paddingVertical: 20,
//         },
//       })}
//     >
//       <Tab.Screen
//         name="main"
//         component={HomeScreen}
//         options={{ headerShown: false }}
//       />
//       <Tab.Screen
//         name="favourite"
//         component={FavouriteScreen}
//         options={{ headerShown: false }}
//       />
//       <Tab.Screen
//         name="store"
//         component={CartScreen}
//         options={{ headerShown: false }}
//       />
//       <Tab.Screen
//         name="settings"
//         component={HistoryScreen}
//         options={{ headerShown: false }}
//       />
//     </Tab.Navigator>
//   );
// };

// export default TabNavigation;

// const styles = StyleSheet.create({});
