import { View, Image, Text, StyleSheet, Pressable, Animated } from 'react-native';
import { useRef } from 'react';
import type { Receipt } from '../context/types';

export default function ReceiptCard({ item, onPress }: { item: Receipt; onPress: () => void }) {
  const scale = useRef(new Animated.Value(1)).current;

  return (
    <Pressable
      onPressIn={() => Animated.spring(scale, { toValue: 0.97, useNativeDriver: true }).start()}
      onPressOut={() => Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start()}
      onPress={onPress}
      style={{ marginBottom: 14 }}
    >
      <Animated.View style={[styles.card, { transform: [{ scale }] }]}>
        <Image source={{ uri: item.uri }} style={styles.img} />
        <View style={styles.meta}>
          <Text style={styles.date}>{new Date(item.createdAtISO).toLocaleString()}</Text>
        </View>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#17171C', borderRadius: 14, overflow: 'hidden', borderWidth: 1, borderColor: '#2A2B33' },
  img: { width: '100%', height: 160, backgroundColor: '#0F0F12' },
  meta: { padding: 12 },
  date: { color: '#A0A3AD', fontSize: 12 },
});
