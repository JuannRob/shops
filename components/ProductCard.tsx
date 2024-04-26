import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import { IProductEntity } from '../ts/interfaces/api.interface';
interface ItemProps {
  shopItem: IProductEntity;
}

export default function ProductCard(props: ItemProps) {
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
        <View style={styles.productBody}>
          <Text style={{ fontSize: 17, fontWeight: 'bold' }}>{shopItem.title}</Text>
          <Text style={{ fontSize: 15 }}>{shopItem.brand}</Text>
          <Text style={styles.description}>{shopItem.description}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  productCard: {
    flexDirection: 'row',
  },
  productImg: {
    height: '100%',
    width: '30%',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  productBody: {
    width: '70%',
    padding: 10,
    backgroundColor: 'white',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    alignItems: 'center',
  },
  description: {
    marginTop: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: 'black',
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
