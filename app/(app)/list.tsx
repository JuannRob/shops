import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { ShopsResponse, getShops } from 'services/db/shop.service';
import { IShop } from 'ts/interfaces/shop.interface';

export default function List() {
  const [shops, setShops] = useState<IShop[]>([]);

  useEffect(() => {
    const fetchShops = async () => {
      const shopsResponse: ShopsResponse = await getShops();
      return shopsResponse;
    };

    fetchShops()
      .then((res) => {
        const shopsArr = res.response as IShop[];
        console.log(shopsArr);
        setShops(shopsArr);
      })
      .catch((e) => console.log(e));
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
            renderItem={({ item }) => (
              <TouchableOpacity>
                <Text>{item.name}</Text>
                <Text>{item.contactInfo}</Text>
                <Text>{item.description}</Text>
              </TouchableOpacity>
            )}
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
