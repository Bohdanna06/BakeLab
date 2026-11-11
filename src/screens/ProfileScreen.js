import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../styles/colors';

export default function ProfileScreen() {
  const { favorites = [], cart = [] } = useSelector((state) => state.baking || {});

  return (
    <SafeAreaView style={styles.container}>
      {/* Аватарка та ім'я */}
      <View style={styles.profileHeader}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={40} color={COLORS.white} />
        </View>
        <Text style={styles.userName}>Марія Кондитер</Text>
        <Text style={styles.userEmail}>baker@bakelab.com</Text>
      </View>

      {/* Статистика з Redux */}
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{cart.length}</Text>
          <Text style={styles.statLabel}>У кошику</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{favorites.length}</Text>
          <Text style={styles.statLabel}>Обраних</Text>
        </View>
      </View>

      {/* Меню налаштувань */}
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="receipt-outline" size={22} color={COLORS.primary} />
          <Text style={styles.menuText}>Мої замовлення</Text>
          <Ionicons name="chevron-forward" size={18} color={COLORS.textSecondary} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="notifications-outline" size={22} color={COLORS.primary} />
          <Text style={styles.menuText}>Сповіщення</Text>
          <Ionicons name="chevron-forward" size={18} color={COLORS.textSecondary} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="settings-outline" size={22} color={COLORS.primary} />
          <Text style={styles.menuText}>Налаштування</Text>
          <Ionicons name="chevron-forward" size={18} color={COLORS.textSecondary} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, paddingHorizontal: 20 },
  profileHeader: { alignItems: 'center', marginTop: 20, marginBottom: 25 },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  userName: { color: COLORS.textPrimary, fontSize: 20, fontWeight: 'bold' },
  userEmail: { color: COLORS.textSecondary, fontSize: 13, marginTop: 4 },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.cardBg,
    borderRadius: 16,
    paddingVertical: 15,
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  statBox: { alignItems: 'center' },
  statNumber: { color: COLORS.primary, fontSize: 22, fontWeight: 'bold' },
  statLabel: { color: COLORS.textSecondary, fontSize: 12, marginTop: 4 },
  divider: { width: 1, backgroundColor: '#333' },
  menuContainer: { gap: 12 },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBg,
    padding: 16,
    borderRadius: 14,
  },
  menuText: { flex: 1, color: COLORS.textPrimary, fontSize: 15, marginLeft: 12, fontWeight: '500' },
});