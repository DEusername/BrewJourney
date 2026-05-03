import { View, Text, StyleSheet } from 'react-native';
import PageHeader from '../../components/PageHeader';
import { Stack, useLocalSearchParams } from 'expo-router';
import { BackButton } from '../../components/BackButton';

export default function ID() {
  const { id } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Stack />
      <BackButton />
      <PageHeader title={`Brew Details ${id}`} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});