import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useReceipts } from '../context/ReceiptsContext';

export default function ReceiptDetailScreen() {
  const route = useRoute<any>();
  const nav = useNavigation();
  const { receipts, remove } = useReceipts();
  const item = receipts.find(r => r.id === route.params.id);

  if (!item) {
    return <View style={styles.center}><Text style={{ color: 'white' }}>Not found.</Text></View>;
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#0F0F12' }}>
      <Image source={{ uri: item.uri }} style={{ width: '100%', height: 400, backgroundColor: '#000' }} />
      <View style={{ padding: 16 }}>
        <Text style={{ color: '#EDEDF2', fontSize: 16, fontWeight: '700' }}>Saved</Text>
        <Text style={{ color: '#8C90A0', marginTop: 6 }}>{new Date(item.createdAtISO).toLocaleString()}</Text>

        <TouchableOpacity
          style={styles.delete}
          onPress={() => {
            Alert.alert('Delete receipt?', 'This cannot be undone.', [
              { text: 'Cancel', style: 'cancel' },
              {
                text: 'Delete', style: 'destructive', onPress: async () => {
                  await remove(item.id);
                  
                  nav.goBack();
                }
              }
            ]);
          }}
        >
          <Text style={{ color: 'white', fontWeight: '800' }}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#0F0F12' },
  delete: { marginTop: 18, backgroundColor: '#E14C4C', padding: 14, borderRadius: 12, alignItems: 'center' },
});
