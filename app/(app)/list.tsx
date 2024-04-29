import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';

import { ShopsResponse, getShops } from 'services/db/shop.service';
import { IShop } from 'ts/interfaces/shop.interface';

import ShopCard from 'components/ShopCard';

export default function List() {
  const [shops, setShops] = useState<IShop[]>([]);

  useEffect(() => {
    const fetchShops = async () => {
      const shopsResponse: ShopsResponse = await getShops();
      return shopsResponse;
    };

    fetchShops()
      .then((res) => {
        const shopsArray = res.response as IShop[];
        setShops(shopsArray);
      })
      .catch((e) => console.error(e));
  }, []);

  return (
    <View style={styles.container}>
      {shops.length === 0 && <ActivityIndicator size="large" color="black" />}
      {shops.length > 0 && (
        <>
          <Text style={styles.heading}>DB fetch</Text>
          <FlatList
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
            data={shops}
            keyExtractor={(item) => item.uid}
            renderItem={({ item }) => <ShopCard shopItem={item as IShop} />}
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
    padding: 10,
  },
  errorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  heading: {
    fontSize: 20,
    paddingBottom: 10,
  },
});
