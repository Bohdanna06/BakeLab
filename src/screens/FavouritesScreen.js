import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavorite } from '../store/bakingSlice';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../styles/colors';

export default function FavoritesScreen({ navigation }) {
  const dispatch = useDispatch();
  const { items = [], favorites = [] } = useSelector((state) => state.baking || {});

  // Фільтруємо лише обрані десерти
  const favItems = items.filter((item) => favorites.includes(item.id));

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Вподобані</Text>
      </View>

      {favItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="heart-dislike-outline" size={60} color={COLORS.textSecondary} />
          <Text style={styles.emptyText}>У вас поки немає обраних десертів</Text>
        </View>
      ) : (
        <FlatList
          data={favItems}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          contentContainerStyle={{ paddingBottom: 80 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate('DessertDetail', { item })}
            >
              <View style={styles.imageContainer}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <TouchableOpacity
                  style={styles.favButton}
                  onPress={() => dispatch(toggleFavorite(item.id))}
                >
                  <Ionicons name="heart" size={18} color="red" />
                </TouchableOpacity>
              </View>
              <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
              <Text style={styles.price}>${item.price}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, paddingHorizontal: 15 },
  header: { marginVertical: 15, alignItems: 'center' },
  headerTitle: { color: COLORS.textPrimary, fontSize: 20, fontWeight: 'bold' },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 15 },
  emptyText: { color: COLORS.textSecondary, fontSize: 16 },
  card: { width: '48%', marginBottom: 20 },
  imageContainer: { width: '100%', height: 140, borderRadius: 16, overflow: 'hidden', position: 'relative' },
  image: { width: '100%', height: '100%' },
  favButton: { position: 'absolute', bottom: 10, right: 10, backgroundColor: COLORS.white, borderRadius: 15, padding: 6 },
  title: { color: COLORS.textPrimary, fontSize: 14, fontWeight: 'bold', marginTop: 8 },
  price: { color: COLORS.primary, fontSize: 14, fontWeight: 'bold', marginTop: 2 },
});