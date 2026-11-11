import React, { useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet,  ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDesserts, toggleFavorite } from '../store/bakingSlice';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../styles/colors';
import styles from '../styles/cakesListStyles';

export default function CakesListScreen({ navigation }) {
  const dispatch = useDispatch();
  const { items, favorites, loading } = useSelector((state) => state.baking);

  useEffect(() => {
    dispatch(fetchDesserts());
  }, [dispatch]);

  const renderCard = ({ item }) => {
    const isFav = favorites.includes(item.id);

    return (
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
            <Ionicons name={isFav ? "heart" : "heart-outline"} size={18} color={isFav ? "red" : "#000"} />
          </TouchableOpacity>
        </View>

        <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.subText}>{item.weight}</Text>
        <Text style={styles.price}>USD {item.price} - {item.price + 35}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={20} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cakes</Text>
     <TouchableOpacity 
  style={styles.iconBtnTransparent} 
  onPress={() => navigation.navigate('Cart')}
>
  <Ionicons name="bag-outline" size={22} color="#FFF" />
</TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={COLORS.primary} style={{ marginTop: 50 }} />
      ) : (
        <FlatList
          data={items}
          renderItem={renderCard}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      )}
    </SafeAreaView>
  );
}