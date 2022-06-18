import { View, Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { FC } from 'react';
import { InputType } from '@/types';

const Input: FC<InputType> = ({ label, textInputConfig }) => {
  return (
    <View>
      <Text>{label}</Text>
      <TextInput {...textInputConfig} />
    </View>
  );
};

export default Input;
