import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import GradientHeader from '../components/GradientHeader';
import { useReceipts } from '../context/ReceiptsContext';
import { useNavigation } from '@react-navigation/native';

export default function AddReceiptScreen() {
    const nav = useNavigation();
    const { addFromCamera, addFromLibrary } = useReceipts();

    return (
        <View style={{ flex: 1, backgroundColor: '#0F0F12' }}>
            <GradientHeader title="Add Receipt" />
            <View style={styles.body}>
                <TouchableOpacity
                    style={styles.btnPrimary}
                    onPress={async () => {
                        const ok = await addFromCamera();
                        if (ok) nav.goBack();
                    }}
                >
                    <Text style={styles.btnText}>Take Photo</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.btnSecondary}
                    onPress={async () => {
                        const ok = await addFromLibrary();
                        if (ok) nav.goBack();
                    }}
                >
                    <Text style={styles.btnSecondaryText}>Choose from Gallery</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    body: { padding: 20 },
    btnPrimary: { backgroundColor: '#8F6CFF', padding: 16, borderRadius: 14, alignItems: 'center' },
    btnText: { color: 'white', fontWeight: '800' },
    btnSecondary: { backgroundColor: '#17171C', padding: 14, borderRadius: 14, alignItems: 'center', borderWidth: 1, borderColor: '#2A2B33', marginTop: 12 },
    btnSecondaryText: { color: '#B69CFF', fontWeight: '800' },
});
