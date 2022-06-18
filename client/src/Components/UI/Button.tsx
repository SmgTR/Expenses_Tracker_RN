import { GlobalStyles } from '@/Constants/styles';
import { ButtonType } from '@/types/UI';
import { FC } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

const Button: FC<ButtonType> = ({ children, mode, style, onPress }) => {
  return (
    <View style={style}>
      <Pressable onPress={onPress} style={({ pressed }) => pressed && styles.pressed}>
        <View style={[styles.button, mode === 'flat' && styles.flat]}>
          <Text style={[styles.buttonText, mode === 'flat' && styles.flatText]}>{children}</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary500
  },
  flat: {
    backgroundColor: 'transparent'
  },
  buttonText: {
    color: 'white',
    textAlign: 'center'
  },
  flatText: {
    color: GlobalStyles.colors.primary200
  },
  pressed: {
    opacity: 0.75,
    backgroundColor: GlobalStyles.colors.primary100,
    borderRadius: 4
  }
});
