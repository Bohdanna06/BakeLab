import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Функція для точного визначення категорії за ключовими словами в назві
const categorizeDessert = (title) => {
  const name = title.toLowerCase();
  
  if (name.includes('cake') || name.includes('gateau') || name.includes('brownie') || name.includes('sponge')) {
    return 'Cakes';
  }
  if (name.includes('pie') || name.includes('tart') || name.includes('crumble') || name.includes('cobbler')) {
    return 'Pies';
  }
  if (name.includes('cookie') || name.includes('biscuit') || name.includes('shortbread') || name.includes('macaron')) {
    return 'Cookies';
  }
  if (name.includes('cheesecake') || name.includes('pudding') || name.includes('mousse') || name.includes('eton')) {
    return 'Desserts';
  }
  
  return 'Cakes'; // Категорія за замовчуванням
};

// Асинхронний екшен завантаження десертів з API
export const fetchDesserts = createAsyncThunk('baking/fetchDesserts', async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert');
  const data = await response.json();
  
  // Обробляємо та збагачуємо дані з API
  return data.meals.map((meal) => {
    // Генерація реалістичної базової ціни від $12 до $35 залежно від ID
    const generatedPrice = 15 + (parseInt(meal.idMeal) % 20);

    return {
      id: meal.idMeal,
      title: meal.strMeal,
      image: meal.strMealThumb,
      price: generatedPrice,
      category: categorizeDessert(meal.strMeal),
    };
  });
});

const bakingSlice = createSlice({
  name: 'baking',
  initialState: {
    items: [],
    favorites: [],
    cart: [],
    selectedCategory: 'Cakes',
    selectedWeight: '1 kg',
    loading: false,
    error: null,
  },
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setSelectedWeight: (state, action) => {
      state.selectedWeight = action.payload;
    },
    toggleFavorite: (state, action) => {
      const id = action.payload;
      if (state.favorites.includes(id)) {
        state.favorites = state.favorites.filter((favId) => favId !== id);
      } else {
        state.favorites.push(id);
      }
    },
    addToCart: (state, action) => {
      state.cart.push(action.payload);
    },
    removeFromCart: (state, action) => {
      state.cart.splice(action.payload, 1);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDesserts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDesserts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchDesserts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { 
  setSelectedCategory, 
  setSelectedWeight, 
  toggleFavorite, 
  addToCart, 
  removeFromCart 
} = bakingSlice.actions;

export default bakingSlice.reducer;