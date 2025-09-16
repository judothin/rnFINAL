import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ReceiptsHomeScreen from '../screens/ReceiptsHomeScreen';
import AddReceiptScreen from '../screens/AddReceiptScreen';
import ReceiptDetailScreen from '../screens/ReceiptDetailScreen';

export type ReceiptsStackParamList = {
  ReceiptsHome: undefined;
  AddReceipt: undefined;
  ReceiptDetail: { id: string };
};

const Stack = createNativeStackNavigator<ReceiptsStackParamList>();

export default function ReceiptsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ReceiptsHome" component={ReceiptsHomeScreen} />
      <Stack.Screen name="AddReceipt" component={AddReceiptScreen} />
      <Stack.Screen name="ReceiptDetail" component={ReceiptDetailScreen} />
    </Stack.Navigator>
  );
}
