//navigation宣告
import { NavigationContainer } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createStackNavigator();;
const Tab = createBottomTabNavigator();
//導入素材
import { Text, BottomNavigation } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
//導入頁面
import HomeTopScreen from '../screen/HomeTopScreen';
import SearchTopScreen from '../screen/SearchTopScreen';
import SearchFilterScreen from '../screen/SearchFilterScreen';
import DeckTopScreen from '../screen/DeckTopScreen';
import DeckInsideScreen from '../screen/DeckInsideScreen';
import ConfigTopScreen from '../screen/ConfigTopScreen';
//各頁面的堆疊
const HomeStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: true }} initialRouteName="home">
            <Stack.Screen name='home' component={HomeTopScreen} />
        </Stack.Navigator>
    );
}
const SearchStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: true }} initialRouteName="search">
            <Stack.Screen name='search' component={SearchTopScreen} />
            <Stack.Screen name='filter' component={SearchFilterScreen} />
        </Stack.Navigator>
    );
}
const DeckStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: true }} initialRouteName="deck">
            <Stack.Screen name='deck' component={DeckTopScreen} />
            <Stack.Screen name='inside' component={DeckInsideScreen} />
        </Stack.Navigator>
    );
}
const ConfigStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: true }} initialRouteName="config">
            <Stack.Screen name='config' component={ConfigTopScreen} />
        </Stack.Navigator>
    );
}
//主引導工具
function Navigator() {
    //使用paper提供的tabbar
    //不太建議碰，我還沒搞懂全部
    return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName="Home" screenOptions={{
                headerShown: false,
            }}
                tabBar={({ navigation, state, descriptors, insets }) => (
                    <BottomNavigation.Bar
                        navigationState={state}
                        safeAreaInsets={insets}
                        onTabPress={({ route, preventDefault }) => {
                            const event = navigation.emit({
                                type: 'tabPress',
                                target: route.key,
                                canPreventDefault: true,
                            });

                            if (event.defaultPrevented) {
                                preventDefault();
                            } else {
                                navigation.dispatch({
                                    ...CommonActions.navigate(route.name, route.params),
                                    target: state.key,
                                });
                            }
                        }}
                        renderIcon={({ route, focused, color }) => {
                            const { options } = descriptors[route.key];
                            if (options.tabBarIcon) {
                                return options.tabBarIcon({ focused, color, size: 24 });
                            }

                            return null;
                        }}
                        getLabelText={({ route }) => {
                            const { options } = descriptors[route.key];
                            const label =
                                options.tabBarLabel !== undefined
                                    ? options.tabBarLabel
                                    : options.title !== undefined
                                        ? options.title
                                        : route.title;

                            return label;
                        }}
                    />
                )}>
                <Tab.Screen name="Home" component={HomeStack}
                    options={{
                        tabBarLabel: '主頁',
                        tabBarIcon: ({ color, size }) => {
                            return <Icon name="home" size={size} color={color} />;
                        },
                    }} />
                <Tab.Screen name="Search" component={SearchStack}
                    options={{
                        tabBarLabel: '搜尋',
                        tabBarIcon: ({ color, size }) => {
                            return <Icon name="magnify" size={size} color={color} />;
                        },
                    }} />
                <Tab.Screen name="Deck" component={DeckStack}
                    options={{
                        tabBarLabel: '牌組',
                        tabBarIcon: ({ color, size }) => {
                            return <Icon name="bookmark-box-multiple" size={size} color={color} />;
                        },
                    }} />
                <Tab.Screen name="Config" component={ConfigStack}
                    options={{
                        tabBarLabel: '搜尋',
                        tabBarIcon: ({ color, size }) => {
                            return <Icon name="cog" size={size} color={color} />;
                        },
                    }} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default Navigator;