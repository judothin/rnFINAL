import { View, Text, StyleSheet, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SettingsScreen() {
  return (
    <>
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0F0F12' }}>
      <View style={styles.wrap}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.sub}>Minimal app for saving receipt photos.</Text>
        <Text style={styles.link} onPress={() => Linking.openURL('https://expo.dev/')}>Built with Expo</Text>
      </View>
    </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: '#0F0F12', padding: 20 },
  title: { color: '#EDEDF2', fontSize: 22, fontWeight: '700' },
  sub: { color: '#9AA0A6', marginTop: 6 },
  link: { color: '#9ED2F8', marginTop: 12 },
});
