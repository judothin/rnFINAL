import React, { createContext, useContext, useEffect, useState } from 'react';
import { Platform, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics';
import { getUtcIsoNow } from '../services/api';
import type { Receipt, ReceiptsContextType } from './types';

const CTX = createContext<ReceiptsContextType | null>(null);
const STORAGE_KEY = 'receipts.v1';

const IS_WEB = Platform.OS === 'web';
const IS_NATIVE = !IS_WEB;


function getWritableDir() {
  
  return FileSystem.documentDirectory ?? FileSystem.cacheDirectory ?? null;
}

const RECEIPTS_DIR = (() => {
  const base = getWritableDir();
  return base ? base + 'receipts/' : null;
})();

export const ReceiptsProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [receipts, setReceipts] = useState<Receipt[]>([]);

  
  useEffect(() => {
    (async () => {
      if (RECEIPTS_DIR) {
        try {
          const info = await FileSystem.getInfoAsync(RECEIPTS_DIR);
          if (!info.exists) await FileSystem.makeDirectoryAsync(RECEIPTS_DIR, { intermediates: true });
        } catch (e) {
          console.warn('Could not create receipts dir, will fall back:', e);
        }
      }
    })();
  }, []);

  // hydrate
  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) setReceipts(JSON.parse(raw));
      } catch (e) {
        console.warn('Load receipts failed', e);
      }
    })();
  }, []);

  
  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(receipts)).catch(() => { });
  }, [receipts]);

  const pushReceipt = async (uri: string) => {
    const id = Math.random().toString(36).slice(2);
    const createdAtISO = await getUtcIsoNow();
    const rec: Receipt = { id, uri, createdAtISO };
    setReceipts(prev => [rec, ...prev]);
    try { await Haptics.selectionAsync(); } catch { }
  };

  
  const copyIntoAppDirOrFallback = async (srcUri: string, mime?: string, base64?: string) => {
    
    if (RECEIPTS_DIR) {
      try {
        const dest = `${RECEIPTS_DIR}receipt_${Date.now()}.jpg`;
        await FileSystem.copyAsync({ from: srcUri, to: dest });
        await pushReceipt(dest);
        return true;
      } catch (e) {
        console.warn('copyAsync failed, will fallback to raw uri:', e);
      }
    }

    
    if (IS_WEB) {
      if (base64) {
        const dataUri = `data:${mime ?? 'image/jpeg'};base64,${base64}`;
        await pushReceipt(dataUri);
        return true;
      } else {
        Alert.alert('Save failed', 'Browser did not return base64 data.');
        return false;
      }
    }

    
    if (srcUri) {
      await pushReceipt(srcUri);
      return true;
    }

    return false;
  };

  const addFromLibrary = async (): Promise<boolean> => {
    try {
      const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (perm.status !== 'granted') {
        Alert.alert('Permission required', 'Please allow photo library access.');
        return false;
      }

      const res = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.9,
        base64: IS_WEB,
        selectionLimit: 1,
      });

      if (res.canceled) return false;

      const asset = res.assets?.[0];
      if (!asset?.uri) {
        Alert.alert('No image selected');
        return false;
      }

      const ok = await copyIntoAppDirOrFallback(asset.uri, asset.mimeType, asset.base64 ?? undefined);
      if (!ok) Alert.alert('Save failed', 'Could not save the selected image.');
      return ok;
    } catch (e: any) {
      console.warn('addFromLibrary error', e);
      Alert.alert('Error', e?.message ?? 'Could not pick image.');
      return false;
    }
  };

  const addFromCamera = async (): Promise<boolean> => {
    try {

      
      const camPerm = Platform.OS === 'web'
        ? { status: 'granted' as const }
        : await ImagePicker.requestCameraPermissionsAsync();

      if (camPerm.status !== 'granted') {
        Alert.alert('Permission required', 'Please allow camera access.');
        return false;
      }

      const res = await ImagePicker.launchCameraAsync({
        quality: 0.9,
        base64: IS_WEB, 
      });

      if (res.canceled) return false;

      const asset = res.assets?.[0];
      if (!asset?.uri) {
        Alert.alert('No photo captured');
        return false;
      }

      const ok = await copyIntoAppDirOrFallback(asset.uri, asset.mimeType, asset.base64 ?? undefined);
      if (!ok) Alert.alert('Save failed', 'Could not save the photo.');
      return ok;
    } catch (e: any) {
      console.warn('addFromCamera error', e);
      Alert.alert('Error', e?.message ?? 'Could not take photo.');
      return false;
    }
  };

  const remove = async (id: string) => {
    const rec = receipts.find(r => r.id === id);
    if (rec) {
      
      const base = getWritableDir();
      if (base && rec.uri.startsWith(base)) {
        try { await FileSystem.deleteAsync(rec.uri, { idempotent: true }); } catch { }
      }
    }
    setReceipts(prev => prev.filter(r => r.id !== id));
  };

  return (
    <CTX.Provider value={{ receipts, addFromCamera, addFromLibrary, remove }}>
      {children}
    </CTX.Provider>
  );
};

export const useReceipts = () => {
  const ctx = useContext(CTX);
  if (!ctx) throw new Error('useReceipts must be used within ReceiptsProvider');
  return ctx;
};
