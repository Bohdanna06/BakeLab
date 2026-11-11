import { StyleSheet } from 'react-native';
import { COLORS } from './colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15,
  },
  iconBtn: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 8,
  },
  iconBtnTransparent: {
    padding: 8,
  },
  headerTitle: {
    color: COLORS.textPrimary,
    fontSize: 18,
    fontWeight: '600',
  },
  detailImage: {
    width: '100%',
    height: 220,
    borderRadius: 20,
    marginVertical: 10,
    resizeMode: 'cover',
  },
  cakeTitle: {
    color: COLORS.textPrimary,
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  weightContainer: {
    flexDirection: 'row',
    gap: 15,
    marginVertical: 10,
  },
  chip: {
    backgroundColor: COLORS.cardBg,
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 20,
  },
  chipActive: {
    backgroundColor: COLORS.primary,
  },
  chipText: {
    color: COLORS.textSecondary,
    fontWeight: 'bold',
  },
  chipTextActive: {
    color: COLORS.white,
  },
  customizeRow: {
    backgroundColor: COLORS.cardBg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 16,
    marginVertical: 15,
  },
  customizeText: {
    color: COLORS.textPrimary,
    fontWeight: '500',
  },
  description: {
    color: COLORS.textSecondary,
    fontSize: 13,
    lineHeight: 18,
  },
  more: {
    color: '#4A90E2',
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 20,
  },
  counter: {
    flexDirection: 'row',
    backgroundColor: COLORS.cardBg,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    gap: 15,
    alignItems: 'center',
  },
  quantityText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  totalPrice: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: 'bold',
  },
  addBtn: {
    backgroundColor: COLORS.primary,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});