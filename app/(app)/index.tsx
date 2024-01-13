import SmallShopCard from 'components/SmallShopCard';
import { useAuth } from 'hooks/useAuth';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { IProductEntity, TApiResponse } from 'ts/interfaces/api.interface';

import { useFetch } from '../../hooks/useFetch';

export default function Home() {
  const data: TApiResponse = useFetch('https://dummyjson.com/products');
  const { user } = useAuth();

  if (data.error) {
    return (
      <View style={styles.errorMsgContainer}>
        <Text>No se encontraron datos</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {data.loading && <ActivityIndicator size="large" color="black" />}
      {!data.loading && (
        <>
          <Text>{user?.displayName}</Text>
          <FlatList
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
            data={data.data?.products || []}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <SmallShopCard shopItem={item as IProductEntity} />}
            horizontal
          />
          <View style={styles.separator} />
          <FlatList
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
            data={data.data?.products || []}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <SmallShopCard shopItem={item as IProductEntity} />}
            horizontal
          />
          <View style={styles.separator} />
          <FlatList
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
            data={data.data?.products || []}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <SmallShopCard shopItem={item as IProductEntity} />}
            horizontal
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
    paddingHorizontal: 10,
    flex: 1,
  },
  separator: {
    height: 1,
    width: '100%',
    marginVertical: 15,
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: 'gray',
  },
  errorMsgContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
