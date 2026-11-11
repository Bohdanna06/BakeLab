import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { setSelectedCategory } from '../store/bakingSlice';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../styles/colors';

const CATEGORIES = [
  { id: 'Cakes', title: 'Cakes', subtitle: 'Торти, бісквіти та кекси', icon: 'pie-chart-outline' },
  { id: 'Pies', title: 'Pies & Tarts', subtitle: 'Французькі тарти та пироги', icon: 'nutrition-outline' },
  { id: 'Cookies', title: 'Cookies', subtitle: 'Печиво, макаруни та сабле', icon: 'disc-outline' },
  { id: 'Desserts', title: 'Desserts', subtitle: 'Чізкейки, муси та пудинги', icon: 'ice-cream-outline' },
];

export default function CategoryScreen({ navigation }) {
  const dispatch = useDispatch();

  const handleSelectCategory = (catId) => {
    dispatch(setSelectedCategory(catId));
    navigation.navigate('HomeTab');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Категорії</Text>
        <TouchableOpacity 
          style={styles.iconBtn}
          onPress={() => navigation.navigate('Cart')}
        >
          <Ionicons name="bag-outline" size={22} color="#FFF" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 30 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.categoryCard}
            onPress={() => handleSelectCategory(item.id)}
          >
            <View style={styles.iconBox}>
              <Ionicons name={item.icon} size={26} color={COLORS.primary} />
            </View>

            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
            </View>

            <Ionicons name="chevron-forward" size={20} color={COLORS.textSecondary} />
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: COLORS.background, 
    paddingHorizontal: 20 
  },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginVertical: 15 
  },
  headerTitle: { 
    color: COLORS.textPrimary, 
    fontSize: 22, 
    fontWeight: 'bold' 
  },
  iconBtn: { 
    padding: 6 
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBg,
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#1E1E1E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardInfo: { 
    flex: 1, 
    marginLeft: 14 
  },
  cardTitle: { 
    color: COLORS.textPrimary, 
    fontSize: 16, 
    fontWeight: 'bold' 
  },
  cardSubtitle: { 
    color: COLORS.textSecondary, 
    fontSize: 12, 
    marginTop: 4 
  },
});