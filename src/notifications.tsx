import React from 'react';
import color from 'color';
import { Dimensions, Text } from 'react-native';
import { useTheme, Button, Menu, Divider, Provider } from 'react-native-paper';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import overlay from './overlay';
import { Feed } from './feed';
import { AllNotifications } from './all';
import MapView, { Marker } from 'react-native-maps';

const initialLayout = { width: Dimensions.get('window').width };

const All = () => <AllNotifications />;

const Mentions = () => <Feed />;

export const Notifications = () => {
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const [routes] = React.useState([
    { key: 'all', title: 'All' },
    { key: 'mentions', title: 'Mentions' },
  ]);

  const theme = useTheme();

  const renderScene = SceneMap({
    all: All,
    mentions: Mentions,
  });

  const tabBarColor = theme.dark
    ? (overlay(4, theme.colors.surface) as string)
    : theme.colors.surface;

  const rippleColor = theme.dark
    ? color(tabBarColor).lighten(0.5)
    : color(tabBarColor).darken(0.2);


  return (
    <React.Fragment>
      <Text>to jest text</Text>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={<Button onPress={openMenu}>Show menu</Button>}
      >
        <Menu.Item
          onPress={() => {
            console.log('running');
          }}
          title="Running"
        />
        <Menu.Item onPress={() => {}} title="Cycling" />
        <Divider />
        <Menu.Item onPress={() => {}} title="Swimming" />
      </Menu>
      <MapView
        style={{ width: '100%', height: 200 }}
        initialRegion={{
          latitude: 52.229676,
          longitude: 21.012229,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker coordinate={{ latitude: 52.229676, longitude: 21.012229 }} />
      </MapView>
      {/*  <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        renderTabBar={renderTabBar}
      /> */}
    </React.Fragment>
  );
};
