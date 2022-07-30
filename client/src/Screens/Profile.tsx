import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GlobalStyles } from '@/Constants/styles';

import { useAppDispatch } from '@/redux/hooks';
import { logoutUser } from '@/redux/slices/user-slice';

const Profile = () => {
  const dispatch = useAppDispatch();

  const logOutUser = () => {
    dispatch(logoutUser());
  };

  return (
    <View style={styles.wrapper}>
      <Pressable style={styles.profileText} onPress={logOutUser}>
        <Ionicons name="log-out-outline" size={24} color={'#fff'} />
        <Text style={{ marginLeft: 10, color: '#fff' }}>Log out</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary700,
    padding: 20
  },
  profileText: {
    color: '#fff',
    fontSize: 18,
    flexDirection: 'row',
    alignItems: 'center'
  }
});

export default Profile;
