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
  listContainer: {
    marginTop: 20,
    gap: 15,
  },
  categoryButton: {
    backgroundColor: COLORS.primary,
    height: 55,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 15,
    letterSpacing: 1,
  },
});