import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  DrawerContentComponentProps,
  DrawerNavigationProp,
  DrawerContentOptions,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';

import React from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import { addUser, addUser2 } from './firebase';
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

export function DrawerContent(props: Props) {
  const paperTheme = useTheme();
  const { theme, toggleTheme } = React.useContext(PreferencesContext);

  const translateX = Animated.interpolate(props.progress, {
    inputRange: [0, 0.5, 0.7, 0.8, 1],
    outputRange: [-100, -85, -70, -45, 0],
  });

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
          <Title style={styles.title}>Profile Name</Title>
        </View>

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
                <Text>0</Text>
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
              <Text>Heigth</Text>
              <View pointerEvents="none">
                <Text>0</Text>
              </View>
            </View>
          </TouchableRipple>
          <TouchableRipple>
            <View style={styles.preference}>
              <Text>Weigth</Text>
              <View pointerEvents="none">
                <Text>0</Text>
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
