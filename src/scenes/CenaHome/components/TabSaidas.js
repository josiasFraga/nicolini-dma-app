import React, { useState, useEffect } from 'react';
import {
	View,
	ScrollView
} from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Button, ListItem, Text } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalReadExits from '@components/Modals/ModalReadExits';
import ResumoSaidas from './ResumoSaidas';

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
            const goodsData = await AsyncStorage.getItem('goods');
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

    const loadExits = async () => {
		console.log('... Buscando saidas');

        dispatch({
            type: 'LOAD_SAIDAS',
            payload: {}
        })
	}

	useEffect(() => {
		loadGoods();
        loadExits();
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
            <ModalReadExits
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                goods={goods}
                goodCode={goodCode}
            />
		</ScrollView>

		<ResumoSaidas />

		<View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
            <Button
                containerStyle={{width: '100%', marginTop: 15, marginBottom: 15}}
                titleStyle={{}}
                buttonStyle={{borderRadius: 25, paddingVertical: 10, backgroundColor: COLORS.primary}}
                title="ADICIONAR SAIDA"
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
