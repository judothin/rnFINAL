import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import GradientHeader from '../components/GradientHeader';
import { useReceipts } from '../context/ReceiptsContext';
import ReceiptCard from '../components/ReceiptCard';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ReceiptsStackParamList } from '../navigation/ReceiptsStack';

type P = NativeStackScreenProps<ReceiptsStackParamList, 'ReceiptsHome'>;

export default function ReceiptsHomeScreen({ navigation }: P) {
  const { receipts } = useReceipts();

  return (
    <View style={{ flex: 1, backgroundColor: '#0F0F12' }}>
      <GradientHeader title="Receipts" subtitle={`${receipts.length} saved`} />
      <View style={styles.body}>
        {receipts.length === 0 ? (
          <Text style={styles.empty}>No receipts yet. Tap “Add Receipt”.</Text>
        ) : (
          <FlatList
            data={receipts}
            keyExtractor={i => i.id}
            extraData={receipts}
            renderItem={({ item }) => (
              <ReceiptCard
                item={item}
                onPress={() => navigation.push('ReceiptDetail', { id: item.id })}
              />
            )}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}

        <TouchableOpacity style={styles.fab} onPress={() => navigation.push('AddReceipt')}>
          <Text style={{ color: 'white', fontWeight: '800', fontSize: 18 }}>＋</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: { flex: 1, padding: 16 },
  empty: { color: '#8C90A0', marginTop: 20 },
  fab: {
    position: 'absolute', right: 18, bottom: 18, width: 56, height: 56,
    borderRadius: 28, backgroundColor: '#8F6CFF', alignItems: 'center', justifyContent: 'center',
    shadowColor: '#000', shadowOpacity: 0.3, shadowRadius: 8, elevation: 6,
  },
});
