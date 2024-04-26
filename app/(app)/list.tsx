import ProductCard from 'components/ProductCard';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { IProductEntity, TApiResponse } from 'ts/interfaces/api.interface';

import { useFetch } from '../../hooks/useFetch';

export default function List() {
  const data: TApiResponse = useFetch('https://dummyjson.com/products');

  if (data.error) {
    return (
      <View style={styles.errorContainer}>
        <Text>No data found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {data.loading && <ActivityIndicator size="large" color="black" />}
      {!data.loading && (
        <>
          <Text style={styles.heading}>API Fetch</Text>
          <FlatList
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
            data={data.data?.products || []}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <ProductCard shopItem={item as IProductEntity} />}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: 10,
  },
  errorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  heading: {
    fontSize: 20,
    paddingVertical: 10,
  },
});
