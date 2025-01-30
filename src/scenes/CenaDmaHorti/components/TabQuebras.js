import React, { useState, useEffect } from 'react';
import {
	View,
	ScrollView
} from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { Button, ListItem, Text } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalReadDiscrepancies from '@components/Modals/ModalReadDiscrepancies';
import ResumoQuebras from './ResumoQuebras';

import COLORS from '@constants/colors';

const TabSaidas = (props) => {
	const dispatch = useDispatch();
    const navigation = useNavigation();

	const [goods, setGoods] = useState([]);
	const [modalVisible, setModalVisible] = useState(false);
	const [goodCode, setGoodCode] = useState("");
	
	const loadGoods = async () => {
		console.log('... Buscando mercadorias');
		try {
            const goodsData = await AsyncStorage.getItem('goods_produce_section');
            if (goodsData !== null) {
                // Se houver dados salvos, analise-os e atualize o estado 'goods'
                setGoods(JSON.parse(goodsData));
            } else {
				console.log('.. Lista de mercadorias vazia.')
			}
        } catch (error) {
            // Trate o erro, se necessário
            console.error('Failed to load goods from AsyncStorage', error);
        }
	}

    const loadDiscrepancies = async () => {
		console.log('... Buscando quebras');

        dispatch({
			type: 'LOAD_DISCREPANCIES',
			payload: {
				app_product_id: 2,
			},
        })
	}

	useEffect(() => {
		loadGoods();
        loadDiscrepancies();
	}, []);

    useEffect(() => {
        if ( modalVisible === false ) {
            setGoodCode('');
        }

    }, [modalVisible]);

	return (
		<>
		<ScrollView style={{flex: 1}}>
            <View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
                {
                    goods.map((good, index)=>{
                        if ( good.main === "N" ) {
                            return false;
                        }
                        return (
                        <ListItem 
                            bottomDivider key={'good_' + index}
                            onPress={()=>{
                                setGoodCode(good.cd_codigoint);
                                setModalVisible(true);
                            }}
                        >
                            <ListItem.Content>
                            <ListItem.Title>{good.tx_descricao}</ListItem.Title>
                            <ListItem.Subtitle>{good.cd_codigoint}</ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                        )
                    })
                }
            </View>
            <ModalReadDiscrepancies
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                goods={goods}
                goodCode={goodCode}
            />
		</ScrollView>

		<ResumoQuebras />

		<View style={{ paddingHorizontal: 16, paddingTop: 16, flexDirection: 'row' }}>
            <Button
                containerStyle={{marginTop: 15, marginBottom: 15, marginRight: 15}}
                titleStyle={{color: COLORS.primary}}                
                buttonStyle={{borderRadius: 25, paddingVertical: 10, borderColor: COLORS.primary}}
                type='outline'
                title="Histórico"
                onPress={()=>{
                    navigation.navigate('QuebrasHorti');
                }}
            />
            {1==2 && <Button
                containerStyle={{marginTop: 15, marginBottom: 15, marginRight: 15}}
                titleStyle={{}}
                buttonStyle={{borderRadius: 25, paddingVertical: 10, backgroundColor: '#CCC'}}
                title="FINALIZAR"
                onPress={()=>{
                    navigation.dispatch(
                        CommonActions.navigate({
                            name: 'Finalizar',
                            params: {
                                app_product_id: 2,
                            },
                        })
                    ); 
                }}
            />}
            <Button
                containerStyle={{marginTop: 15, marginBottom: 15, flex: 1}}
                titleStyle={{}}
                buttonStyle={{borderRadius: 25, paddingVertical: 10, backgroundColor: COLORS.primary}}
                title="ADICIONAR"
                onPress={()=>{
                    setGoodCode('');
                    setModalVisible(true);
                }}
            />
        </View>
        </>
	);
}

export default TabSaidas;
