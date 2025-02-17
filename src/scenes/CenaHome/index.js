import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, CommonActions } from '@react-navigation/native';

import AnimatedLoader from '@components/Loader';
import { Icon } from 'react-native-elements';

import Header from '@components/Header';

const COLORS = {
  primary: '#E30613', // Vermelho Nicolini
  secondary: '#FF6600', // Laranja Nicolini
  white: '#FFFFFF',
  text: '#333333',
};

const icons = {
    bull: require('@assets/imgs/bull.png'),
    vegetable: require('@assets/imgs/vegetable.png'),
    bakery: require('@assets/imgs/bread.png')
};


const CenaHome = (props) => {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const isLoading = useSelector((state) => state.appReducer.is_user_products_loading);
    const products = useSelector((state) => state.appReducer.user_products);

    const loadUserProducts = async () => {
        console.log('... Buscando produtos que o usuário tem acesso');
        dispatch({
        type: 'GET_USER_PRODUCTS',
        payload: '',
        });
    };

    useEffect(() => {
        loadUserProducts();
    }, []);

    const renderButtons = () => {
        return products.map((product) => {
          console.log(icons[product.app_product.icon]);
          return (
            <View key={`btn_${product.app_product_id}`} style={{ alignItems: 'center' }}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  if (product.app_product.cene) {
                    navigation.navigate(product.app_product.cene);
                  } else {
                    console.log('Cena não definida para este produto.');
                  }
                }}>
                {product.app_product.icon ? (
                  <Image
                    source={icons[product.app_product.icon]}
                    style={styles.icon}
                    resizeMode="contain"
                  />
                ) : (
                  <Icon
                    name="layers"
                    type="material"
                    color={COLORS.white}
                    size={40}
                    containerStyle={styles.iconPlaceholder}
                  />
                )}
              </TouchableOpacity>
              <Text style={styles.buttonText}>{product.app_product.name}</Text>
            </View>
          );
        });
    };
      
      

    return (
        <View style={styles.container}>
        <StatusBar
            translucent={true}
            backgroundColor={'transparent'}
            barStyle={'light-content'}
        />
        <Header
            titulo={'Pra onde deseja ir?'}
            styles={{ backgroundColor: COLORS.primary }}
            titleStyle={{ color: COLORS.white }}
            leftElement={() => {
            return (
                <Icon
                name="logout"
                type="simple-line"
                color={COLORS.white}
                size={30}
                onPress={() => {
                    dispatch({
                    type: 'LOGOUT',
                    payload: {
                        callbackSuccess: () => {
                        navigation.dispatch(
                            CommonActions.navigate({
                            name: 'Login',
                            })
                        );
                        },
                    },
                    });
                }}
                containerStyle={{ backgroundColor: 'transparent' }}
                />
            );
            }}
        />

        {isLoading && <AnimatedLoader visible={true} speed={1} />}
        {!isLoading && (
            <View style={styles.buttonsContainer}>{renderButtons()}</View>
        )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.white
    },
    buttonsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
      padding: 20,
      flex: 1,
    },
    button: {
      width: 80, // Ajuste do tamanho do botão
      height: 80,
      backgroundColor:  COLORS.secondary,
      borderRadius: 50, // Botão redondo
      marginHorizontal: 15,
      //marginVertical: 20,
      marginBottom: 7,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 6,
    },
    icon: {
      width: 50, // Tamanho do ícone no botão
      height: 50,
    },
    iconPlaceholder: {
      width: 60,
      height: 60,
      backgroundColor: COLORS.secondary,
      borderRadius: 30, // Placeholder redondo
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonText: {
      //marginTop: 10, // Espaçamento entre o texto e o botão
      color: COLORS.secondary,
      textAlign: 'center',
      fontSize: 12,
      fontWeight: 'bold',
    },
});  

export default CenaHome;
