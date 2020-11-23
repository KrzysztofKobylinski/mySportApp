import React from 'react';
import color from 'color';
import { Text, PermissionsAndroid, Permission } from 'react-native';
import { useTheme, Button, Menu, Divider } from 'react-native-paper';
import overlay from './overlay';
import MapView, { Marker, AnimatedRegion } from 'react-native-maps';
import * as Permissions from 'expo-permissions';

/* const initialLayout = { width: Dimensions.get('window').width };

const All = () => <AllNotifications />;

const Mentions = () => <Feed />; */

export const Notifications = () => {
  const [visible, setVisible] = React.useState(false);
  const [positionLat, setPositionLat] = React.useState(52.2);
  const [positionLon, setPositionLon] = React.useState(21.1);
  const [positionAlt, setPositionAlt] = React.useState(0);
  const [positionTimeStamp, setPositionTimeStamp] = React.useState(0);
  const [timer, setTimer] = React.useState(0);
  const map = React.useRef(null);

  const checkLocationAfterTime = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log(position);
        setPositionLat(position.coords.latitude);
        setPositionLon(position.coords.longitude);
        setPositionTimeStamp(position.timestamp);
        setPositionAlt(position.coords.altitude);
        if (map.current) {
          map.current.animateToRegion({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          });
        }
      },
      err => console.log(err),
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 10000 }
    );
  };

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Permision',
          message: 'message here ',

          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      console.log(granted, PermissionsAndroid.RESULTS.GRANTED);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the Location');

        checkLocationAfterTime();
      } else {
        console.log('No way');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  /* const [routes] = React.useState([
    { key: 'all', title: 'All' },
    { key: 'mentions', title: 'Mentions' },
  ]); */

  // const theme = useTheme();

  /* const renderScene = SceneMap({
    all: All,
    mentions: Mentions,
  }); */

  // const tabBarColor = theme.dark
  //   ? (overlay(4, theme.colors.surface) as string)
  //   : theme.colors.surface;

  // const rippleColor = theme.dark
  //   ? color(tabBarColor).lighten(0.5)
  //   : color(tabBarColor).darken(0.2);
  return (
    <React.Fragment>
      <Text> Lat:{positionLat}</Text>
      <Text> LON:{positionLon}</Text>
      <Text> ALT:{positionAlt}</Text>
      <Text>Time :{positionTimeStamp}</Text>
      <Button
        onPress={requestLocationPermission}
        style={{ width: '100%', height: 50 }}
      >
        Permision
      </Button>
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
        ref={map}
        showsUserLocation={true}
        followsUserLocation={true}
        style={{ width: '100%', height: 200 }}
        initialRegion={{
          latitude: positionLat,
          longitude: positionLon,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onUserLocationChange={() => checkLocationAfterTime()}
      >
        <Marker
          coordinate={{ latitude: positionLat, longitude: positionLon }}
        />
      </MapView>
    </React.Fragment>
  );
};
