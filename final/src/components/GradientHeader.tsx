import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, StyleSheet } from 'react-native';

export default function GradientHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <LinearGradient colors={['#9D7CFD', '#7EE7A6']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.wrap}>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingTop: 54, paddingBottom: 18, paddingHorizontal: 20, borderBottomLeftRadius: 22, borderBottomRightRadius: 22 },
  title: { color: 'white', fontSize: 28, fontWeight: '700' },
  subtitle: { color: 'white', opacity: 0.8, marginTop: 4 },
});
