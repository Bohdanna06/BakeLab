import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedWeight, addToCart } from '../store/bakingSlice';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../styles/colors';
import styles from '../styles/dessertDetailStyles';

export default function DessertDetailScreen({ route, navigation }) {
  const item = route.params?.item || {};
  const dispatch = useDispatch();
  const selectedWeight = useSelector((state) => state.baking?.selectedWeight || '1 kg');

  const [quantity, setQuantity] = useState(1);
  const [showCustomizer, setShowCustomizer] = useState(false);
  const [toastMessage, setToastMessage] = useState(null); 
  const [selectedToppings, setSelectedToppings] = useState({
    berries: false,   
    chocolate: false, 
    candles: false,  
  });

  const weights = ['1 kg', '2 kg', '3 kg'];
  const weightMultiplier = parseInt(selectedWeight) || 1;

  const toppingsPrice = 
    (selectedToppings.berries ? 3 : 0) +
    (selectedToppings.chocolate ? 2 : 0) +
    (selectedToppings.candles ? 1 : 0);

  const basePrice = item.price || 15;
  const finalUnitPrice = basePrice * weightMultiplier + toppingsPrice;
  const totalPrice = finalUnitPrice * quantity;

  const toggleTopping = (key) => {
    setSelectedToppings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // 🟢 Функція для показу сповіщення
  const handleAddToCart = () => {
    dispatch(addToCart({ 
      ...item, 
      price: finalUnitPrice,
      quantity, 
      weight: selectedWeight 
    }));

    // Встановлюємо текст сповіщення
    setToastMessage(`🍰 "${item.title}" (${selectedWeight}) додано в кошик!`);

    // Автоматично ховаємо сповіщення через 2.5 секунди
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 🟢 Вспливаюче плаваюче сповіщення зверху */}
      {toastMessage && (
        <View style={localStyles.toastContainer}>
          <Ionicons name="checkmark-circle" size={22} color="#4CAF50" />
          <Text style={localStyles.toastText}>{toastMessage}</Text>
        </View>
      )}

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Шапка */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={20} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Cake</Text>
          <TouchableOpacity 
            style={styles.iconBtnTransparent}
            onPress={() => navigation.navigate('Cart')}
          >
            <Ionicons name="bag-outline" size={22} color="#FFF" />
          </TouchableOpacity>
        </View>

        <Image source={{ uri: item.image }} style={styles.detailImage} />
        <Text style={styles.cakeTitle}>{item.title}</Text>

        {/* Вибір ваги */}
        <View style={styles.weightContainer}>
          {weights.map((w) => (
            <TouchableOpacity
              key={w}
              style={[styles.chip, selectedWeight === w && styles.chipActive]}
              onPress={() => dispatch(setSelectedWeight(w))}
            >
              <Text style={[styles.chipText, selectedWeight === w && styles.chipTextActive]}>{w}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Кнопка кастомізації */}
        <TouchableOpacity 
          style={styles.customizeRow} 
          onPress={() => setShowCustomizer(!showCustomizer)}
        >
          <Text style={styles.customizeText}>Customize Cake</Text>
          <Ionicons name={showCustomizer ? "chevron-up" : "add"} size={20} color="#FFF" />
        </TouchableOpacity>

        {/* Список топінгів */}
        {showCustomizer && (
          <View style={{ backgroundColor: COLORS.cardBg, borderRadius: 12, padding: 12, marginBottom: 15, gap: 10 }}>
            <TouchableOpacity 
              style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
              onPress={() => toggleTopping('berries')}
            >
              <Text style={{ color: COLORS.textPrimary }}>🫐 Свіжі ягоди (+$3)</Text>
              <Ionicons 
                name={selectedToppings.berries ? "checkbox" : "square-outline"} 
                size={20} 
                color={COLORS.primary} 
              />
            </TouchableOpacity>

            <TouchableOpacity 
              style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
              onPress={() => toggleTopping('chocolate')}
            >
              <Text style={{ color: COLORS.textPrimary }}>🍫 Шоколадна глазур (+$2)</Text>
              <Ionicons 
                name={selectedToppings.chocolate ? "checkbox" : "square-outline"} 
                size={20} 
                color={COLORS.primary} 
              />
            </TouchableOpacity>

            <TouchableOpacity 
              style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
              onPress={() => toggleTopping('candles')}
            >
              <Text style={{ color: COLORS.textPrimary }}>🕯️ Святкові свічки (+$1)</Text>
              <Ionicons 
                name={selectedToppings.candles ? "checkbox" : "square-outline"} 
                size={20} 
                color={COLORS.primary} 
              />
            </TouchableOpacity>
          </View>
        )}

        <Text style={styles.description}>
          Fudge cake is a delectable and indulgent dessert that's known for its rich, moist texture... <Text style={styles.more}>More</Text>
        </Text>
      </ScrollView>

      {/* Нижній каунтер та ціна */}
      <View style={styles.bottomBar}>
        <View style={styles.counter}>
          <TouchableOpacity 
            style={{ padding: 6 }} 
            onPress={() => setQuantity((prev) => Math.max(1, prev - 1))}
          >
            <Ionicons name="remove" size={18} color="#FFF" />
          </TouchableOpacity>

          <Text style={styles.quantityText}>{quantity}</Text>

          <TouchableOpacity 
            style={{ padding: 6 }} 
            onPress={() => setQuantity((prev) => prev + 1)}
          >
            <Ionicons name="add" size={18} color="#FFF" />
          </TouchableOpacity>
        </View>

        <Text style={styles.totalPrice}>${totalPrice}</Text>

        <TouchableOpacity 
          style={styles.addBtn}
          onPress={handleAddToCart} // 👈 Клік викликає функцію додавання та показу плакатика
        >
          <Ionicons name="add" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// 🟢 Стилі для вспливаючого повідомлення
const localStyles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    top: 55,
    left: 20,
    right: 20,
    backgroundColor: '#1E1E1E',
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    zIndex: 999,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  toastText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
});