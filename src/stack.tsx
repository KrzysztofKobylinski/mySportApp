import React from 'react';
import { TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { Appbar, useTheme } from 'react-native-paper';
import { FontAwesome5 } from '@expo/vector-icons';
import { BottomTabs } from './bottomTabs';
import { StackNavigatorParamlist } from './types';

const Stack = createStackNavigator<StackNavigatorParamlist>();

export const StackNavigator = () => {
  const theme = useTheme();

  return (
    <Stack.Navigator
      initialRouteName="FeedList"
      headerMode="screen"
      screenOptions={{
        header: ({ scene, previous, navigation }) => {
          const { options } = scene.descriptor;
          const title =
            options.headerTitle !== undefined
              ? options.headerTitle
              : options.title !== undefined
              ? options.title
              : scene.route.name;

          return (
            <Appbar.Header
              theme={{ colors: { primary: theme.colors.surface } }}
            >
              {previous ? (
                <Appbar.BackAction
                  onPress={navigation.goBack}
                  color={theme.colors.primary}
                />
              ) : (
                <TouchableOpacity
                  style={{ marginLeft: 10 }}
                  onPress={() => {
                    ((navigation as any) as DrawerNavigationProp<{}>).openDrawer();
                  }}
                >
                  <FontAwesome5
                    style={{ marginRight: 10 }}
                    name="user-circle"
                    size={30}
                    color={theme.colors.primary}
                  />
                </TouchableOpacity>
              )}
              <Appbar.Content
                title={title}
                titleStyle={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: theme.colors.primary,
                }}
              />
            </Appbar.Header>
          );
        },
      }}
    >
      <Stack.Screen
        name="FeedList"
        component={BottomTabs}
        options={({ route }) => {
          return { headerTitle: getFocusedRouteNameFromRoute(route) };
        }}
      />
    </Stack.Navigator>
  );
};
