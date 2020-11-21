import _, { StringNullableChain } from 'lodash';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  DrawerContentComponentProps,
  DrawerNavigationProp,
  DrawerContentOptions,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';

import React, { useState, useEffect } from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import {
  storeLocalData,
  getLocalData,
  clearAll,
} from './dataManagement/localStorage';
import { addUser, addUser2 } from './dataManagement/firebase';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import {
  Avatar,
  Caption,
  Drawer,
  Paragraph,
  Switch,
  Text,
  Title,
  TouchableRipple,
  useTheme,
} from 'react-native-paper';
import Animated from 'react-native-reanimated';

import { PreferencesContext } from './context/preferencesContext';

type Props = DrawerContentComponentProps<DrawerNavigationProp>;
type UserData = {
  id?: string;
  name?: string;
  surname?: string;
  height?: number;
  weigth?: number;
  age?: number;
};
export function DrawerContent(props: Props) {
  const paperTheme = useTheme();
  const { theme, toggleTheme } = React.useContext(PreferencesContext);
  let initUserData: UserData;
  initUserData = {};
  const [userData, setUserData] = useState(initUserData);

  const translateX = Animated.interpolate(props.progress, {
    inputRange: [0, 0.5, 0.7, 0.8, 1],
    outputRange: [-100, -85, -70, -45, 0],
  });

  useEffect(() => {
    if (_.isEmpty(userData)) {
      getCurrentUserData();
    }
  }, [userData.id]);

  const getCurrentUserData = async () => {
    const userID = await getLocalData('userID');
    let data = {};
    if (userID) {
      data = {
        // fetch from db
        id: userID,
        name: 'Jan',
        surname: 'Kowalski',
        age: 20,
        height: 180,
        weigth: 80,
      };
    }
    setUserData(data);
  };

  const title = `${userData.id || ''} ${userData.name ||
    ''} ${userData.surname || ''}`;
  return (
    <DrawerContentScrollView {...props}>
      <Animated.View
        style={[
          styles.drawerContent,
          {
            backgroundColor: paperTheme.colors.surface,
            transform: [{ translateX }],
          },
        ]}
      >
        <View style={styles.userInfoSection}>
          <TouchableOpacity
            style={{ marginLeft: 10 }}
            onPress={() => {
              props.navigation.toggleDrawer();
            }}
          >
            <FontAwesome5
              style={{ marginRight: 10 }}
              name="user-circle"
              size={50}
              color={paperTheme.colors.primary}
            />
          </TouchableOpacity>
          <Title style={styles.title}>
            {!_.isEmpty(title) ? title : 'no title'}
          </Title>
        </View>

        <Drawer.Section title="Account informations">
          <TouchableRipple
            onPress={async () => {
              storeLocalData('userID', 69);
              getCurrentUserData();
            }}
          >
            <View style={styles.preference}>
              <Text>Store data test</Text>
              <View pointerEvents="none">
                <Text>{'ddd'}</Text>
              </View>
            </View>
          </TouchableRipple>
          <TouchableRipple
            onPress={async () => {
              clearAll();
              getCurrentUserData();
            }}
          >
            <View style={styles.preference}>
              <Text>Clear local storage</Text>
            </View>
          </TouchableRipple>
        </Drawer.Section>
        <Drawer.Section title="User informations">
          <TouchableRipple
            onPress={() => {
              console.log('dududud');
              addUser();
            }}
          >
            <View style={styles.preference}>
              <Text>Age</Text>
              <View pointerEvents="none">
                <Text>{userData.age || '?'}</Text>
              </View>
            </View>
          </TouchableRipple>
          <TouchableRipple
            onPress={() => {
              console.log('dududud');
              addUser2();
            }}
          >
            <View style={styles.preference}>
              <Text>Height</Text>
              <View pointerEvents="none">
                <Text>{userData.height || '?'}</Text>
              </View>
            </View>
          </TouchableRipple>
          <TouchableRipple>
            <View style={styles.preference}>
              <Text>Weigth</Text>
              <View pointerEvents="none">
                <Text>{userData.weigth || '?'}</Text>
              </View>
            </View>
          </TouchableRipple>
        </Drawer.Section>

        <Drawer.Section title="Preferences">
          <TouchableRipple onPress={toggleTheme}>
            <View style={styles.preference}>
              <Text>Dark Theme</Text>
              <View pointerEvents="none">
                <Switch value={theme === 'dark'} />
              </View>
            </View>
          </TouchableRipple>
        </Drawer.Section>
      </Animated.View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    marginTop: 20,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
