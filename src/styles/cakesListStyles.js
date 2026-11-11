import { StyleSheet } from 'react-native';
import { COLORS } from './colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 15,
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
  card: {
    width: '48%',
    marginBottom: 20,
  },
  imageContainer: {
    width: '100%',
    height: 140,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  favButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: COLORS.white,
    borderRadius: 15,
    padding: 6,
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 8,
  },
  subText: {
    color: COLORS.textSecondary,
    fontSize: 12,
    marginVertical: 2,
  },
  price: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontWeight: '500',
  },
});