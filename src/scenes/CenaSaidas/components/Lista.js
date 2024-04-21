import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Switch,
  Text,
} from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import GlobalStyle from '@styles/global';
import COLORS from '@constants/colors';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

const Lista = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const saidas = useSelector(state => state.appReducer.saidas);
  const isLoading = false;

  useEffect(() => {
    buscarSaidas();
  }, []);

  const buscarSaidas = () => {
    dispatch({
        type: 'LOAD_SAIDAS',
        payload: {},
    });
  };

  const keyExtractor = (item, index) => index.toString();

  const renderItem = ({ item, i }) => {
    console.log(item);
    return(
        <ListItem 
        key={i} 
        bottomDivider 
        onPress={() => {
        
        }} 
        >
        <ListItem.Content>
            <ListItem.Title>{item.goodCode} - {item.good.tx_descricao}</ListItem.Title>
            <ListItem.Subtitle> {item.kg}</ListItem.Subtitle>
        </ListItem.Content>
        </ListItem>
        )
    };

  return (
    <View style={styles.container}>
        <FlatList
          keyExtractor={keyExtractor}
          data={saidas}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          scrollEnabled
          ListEmptyComponent={<Text style={GlobalStyle.emptyListText}>Nenhum dado encontrado!</Text>}
          style={{ flex: 1 }}
          onRefresh={() => {
            buscarSaidas();
          }}
          refreshing={isLoading}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Lista;
