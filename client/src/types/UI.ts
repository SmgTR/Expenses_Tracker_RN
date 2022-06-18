import { TextInputProps, GestureResponderEvent } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export interface InputType {
  label: string;
  textInputConfig: TextInputProps;
}

export interface ButtonType {
  mode?: string;
  style?: Object;
  onPress: (event: GestureResponderEvent) => void;
}

export interface IconButtonType {
  icon: keyof typeof Ionicons.glyphMap;
  size: number;
  color: string | undefined;
  onPress: (event: GestureResponderEvent) => void;
  testID?: string;
}
