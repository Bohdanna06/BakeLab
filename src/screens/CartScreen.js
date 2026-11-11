import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../store/bakingSlice'; // 👈 Імпортуємо екшен
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../styles/colors';

export default function CartScreen({ navigation }) {
  const dispatch = useDispatch();
  const { cart = [] } = useSelector((state) => state.baking || {});

  // Обчислюємо загальну суму замовлення
  const totalPrice = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={20} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Кошик</Text>
        <View style={{ width: 36 }} />
      </View>

      {cart.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="bag-handle-outline" size={60} color={COLORS.textSecondary} />
          <Text style={styles.emptyText}>Ваш кошик порожній</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{ paddingBottom: 20 }}
            renderItem={({ item, index }) => (
              <View style={styles.cartCard}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <View style={styles.info}>
                  <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
                  <Text style={styles.subText}>Вага: {item.weight || '1 kg'}</Text>
                  <Text style={styles.price}>${item.price} x {item.quantity || 1}</Text>
                </View>

                <View style={styles.rightBlock}>
                  <Text style={styles.itemTotal}>${item.price * (item.quantity || 1)}</Text>
                  
                  {/* Кнопка видалення товарного позиції */}
                  <TouchableOpacity
                    style={styles.deleteBtn}
                    onPress={() => dispatch(removeFromCart(index))}
                  >
                    <Ionicons name="trash-outline" size={18} color="#FF4D4D" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />

          <View style={styles.footer}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Разом до сплати:</Text>
              <Text style={styles.totalPrice}>${totalPrice}</Text>
            </View>

            <TouchableOpacity 
              style={styles.checkoutBtn}
              onPress={() => Alert.alert('BakeLab 🍰', 'Дякуємо! Ваше замовлення прийнято в обробку!')}
            >
              <Text style={styles.checkoutText}>Оформити замовлення</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, paddingHorizontal: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 15 },
  iconBtn: { backgroundColor: COLORS.white, borderRadius: 20, padding: 8 },
  headerTitle: { color: COLORS.textPrimary, fontSize: 18, fontWeight: '600' },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 15 },
  emptyText: { color: COLORS.textSecondary, fontSize: 16 },
  cartCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.cardBg,
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  image: { width: 65, height: 65, borderRadius: 12 },
  info: { flex: 1, marginLeft: 12 },
  title: { color: COLORS.textPrimary, fontWeight: 'bold', fontSize: 15 },
  subText: { color: COLORS.textSecondary, fontSize: 12, marginTop: 2 },
  price: { color: COLORS.primary, fontWeight: 'bold', marginTop: 4 },
  rightBlock: { alignItems: 'flex-end', justifyContent: 'space-between', gap: 10 },
  itemTotal: { color: COLORS.white, fontSize: 16, fontWeight: 'bold' },
  deleteBtn: { padding: 4 },
  footer: { marginTop: 'auto', marginBottom: 20, paddingTop: 15, borderTopWidth: 1, borderTopColor: '#222' },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  totalLabel: { color: COLORS.textSecondary, fontSize: 16 },
  totalPrice: { color: COLORS.white, fontSize: 22, fontWeight: 'bold' },
  checkoutBtn: {
    backgroundColor: COLORS.primary,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkoutText: { color: COLORS.white, fontWeight: 'bold', fontSize: 16 },
});