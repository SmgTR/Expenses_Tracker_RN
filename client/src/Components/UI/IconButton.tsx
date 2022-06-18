import { IconButtonType } from '@/types/UI';
import { Ionicons } from '@expo/vector-icons';
import { FC } from 'react';
import { Pressable, View, StyleSheet } from 'react-native';

const IconButton: FC<IconButtonType> = ({ icon, size, color, onPress, testID }) => {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => pressed && styles.pressed} testID={testID}>
      <View style={styles.buttonContainer}>
        <Ionicons name={icon} size={size} color={color} />
      </View>
    </Pressable>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 24,
    padding: 6,
    marginHorizontal: 8,
    marginVertical: 2
  },
  pressed: {
    opacity: 0.75
  }
});
