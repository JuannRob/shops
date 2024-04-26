import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import { IProductEntity } from '../ts/interfaces/api.interface';
interface ItemProps {
  shopItem: IProductEntity;
}

export default function DetailedShopCard(props: ItemProps) {
  const { shopItem } = props;
  return (
    <View style={styles.boxShadow}>
      <View style={styles.productCard}>
        <Image
          key={shopItem.id}
          source={{
            uri: shopItem.thumbnail,
          }}
          style={styles.productImg}
        />
        <Text>{shopItem.title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  productCard: {
    backgroundColor: 'white',
    flexDirection: 'row',
    borderRadius: 10,
    alignItems: 'center',
  },
  productImg: {
    height: 130,
    width: 130,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  boxShadow: {
    borderRadius: 10,
    borderTopRightRadius: 20,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.2,
    elevation: 2,
  },
});
