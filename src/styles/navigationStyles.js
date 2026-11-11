import { StyleSheet } from 'react-native';
import { COLORS } from './colors';

export default StyleSheet.create({
  tabBar: {
    backgroundColor: COLORS.black,
    borderTopWidth: 0,
    height: 65,
    position: 'absolute',
  },
  floatingPlus: {
    backgroundColor: COLORS.primary,
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
});