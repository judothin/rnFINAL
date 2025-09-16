import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ReceiptsStack from './ReceiptsStack';
import SettingsStack from './SettingsStack';
import { Ionicons } from '@expo/vector-icons';

export type RootTabsParamList = {
  ReceiptsTab: undefined;
  SettingsTab: undefined;
};

const Tab = createBottomTabNavigator<RootTabsParamList>();

export default function RootNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { backgroundColor: '#15151A', borderTopColor: '#1F1F24' },
        tabBarActiveTintColor: '#B69CFF',
        tabBarInactiveTintColor: '#888A92',
        tabBarIcon: ({ color, size }) => {
          const name = route.name === 'ReceiptsTab' ? 'document-text-outline' : 'settings-outline';
          return <Ionicons name={name as any} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="ReceiptsTab" component={ReceiptsStack} options={{ title: 'Receipts' }} />
      <Tab.Screen name="SettingsTab" component={SettingsStack} options={{ title: 'Settings' }} />
    </Tab.Navigator>
  );
}
