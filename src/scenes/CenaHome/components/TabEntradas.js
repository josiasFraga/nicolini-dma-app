import React, { useState, useEffect } from 'react';
import {
	View,
	ScrollView
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { Button, ListItem, Text } from 'react-native-elements';
import ModalReadIcomes from '@components/Modals/ModalReadIcomes';
import ResumoEntradas from './ResumoEntradas';
import COLORS from '@constants/colors';

import AsyncStorage from '@react-native-async-storage/async-storage';

import GlobalStyle from '@styles/global';

const TabEntradas = (props) => {
	const dispatch = useDispatch();
    const navigation = useNavigation();

	const [modalVisible, setModalVisible] = useState(false);
	const [cutOutCodes, setCutOutCodes] = useState([]);
	const [expectedYields, setExpectedYields] = useState([]);
	const [goodPrimeValue, setGoodPrimeValue] = useState(0);
	const [goodSecondValue, setGoodSecondValue] = useState(0);
	const [goodBoneAndSkinValue, setGoodBoneAndSkinValue] = useState(0);
	const [goodBoneDiscardValue, setGoodBoneDiscardValue] = useState(0);
	const [goods, setGoods] = useState([]);
    
    const entradas = useSelector(state => state.appReducer.entradas);
	
	const loadIncomes = async () => {
		console.log('... Buscando entradas');

        dispatch({
            type: 'LOAD_ENTRADAS',
            payload: {}
        })
	}

    const loadCutOutCodes = async () => {
		console.log('... Buscando códigos de retalhos');
		try {
            const cutOutCodesStorage = await AsyncStorage.getItem('cutOutCodes');
            if (cutOutCodesStorage !== null) {
                // Se houver dados salvos, analise-os e atualize o estado 'goods'
                setCutOutCodes(JSON.parse(cutOutCodesStorage));
            } else {
				console.log('.. Códigos de recorte vazios.')
			}
        } catch (error) {
            // Trate o erro, se necessário
            console.error('Failed to cutOutCodes from AsyncStorage', error);
        }
	}
	
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

    const loadExpectedYields = async () => {
		console.log('... Buscando rendimento esperado');
		try {
            const expectedYieldsStorage = await AsyncStorage.getItem('expectedYield');
            if (expectedYieldsStorage !== null) {
                setExpectedYields(JSON.parse(expectedYieldsStorage));
            } else {
				console.log('.. Rendimento esperado vazio.')
			}
        } catch (error) {
            // Trate o erro, se necessário
            console.error('Failed to expectedYield from AsyncStorage', error);
        }

    }

	useEffect(() => {
		loadIncomes();
        loadCutOutCodes();
        loadGoods();
        loadExpectedYields();
	}, []);

	useEffect(() => {
        if ( goods.length > 0 && cutOutCodes.length > 0 ) {
    
            console.log('... Carregando valores dos cortes');

            const primeCode = cutOutCodes.filter((cut_code)=>{
                return cut_code.cutout_type === 'PRIMEIRA';
            });
            const secondCode = cutOutCodes.filter((cut_code)=>{
                return cut_code.cutout_type === 'SEGUNDA';
            });
            const BoneAndSkinCode = cutOutCodes.filter((cut_code)=>{
                return cut_code.cutout_type === 'OSSO E PELANCA';
            });
            const BoneDiscardCode = cutOutCodes.filter((cut_code)=>{
                return cut_code.cutout_type === 'OSSO A DESCARTE';
            });


            const goodPrime = goods.filter((good)=>{
                return parseFloat(primeCode[0].cutout_code) === parseFloat(good.cd_codigoint);
            });
            const goodSecond = goods.filter((good)=>{
                return parseFloat(secondCode[0].cutout_code) === parseFloat(good.cd_codigoint);
            });
            const goodBoneAndSkin = goods.filter((good)=>{
                return parseFloat(BoneAndSkinCode[0].cutout_code) === parseFloat(good.cd_codigoint);
            });
            const goodBoneDiscard = goods.filter((good)=>{
                return parseFloat(BoneDiscardCode[0].cutout_code) === parseFloat(good.cd_codigoint);
            });

            if ( goodPrime.length > 0 ) {
                if ( goodPrime[0].opcusto === 'M' ) {
                    setGoodPrimeValue(parseFloat(goodPrime[0].customed));
                } else {
                    setGoodPrimeValue(parseFloat(goodPrime[0].custotab));
                }
            }

            if ( goodSecond.length > 0 ) {
                if ( goodSecond[0].opcusto === 'M' ) {
                    setGoodSecondValue(parseFloat(goodSecond[0].customed));
                } else {
                    setGoodSecondValue(parseFloat(goodSecond[0].custotab));
                }
            }

            if ( goodBoneAndSkin.length > 0 ) {
                if ( goodBoneAndSkin[0].opcusto === 'M' ) {
                    setGoodBoneAndSkinValue(parseFloat(goodBoneAndSkin[0].customed));
                } else {
                    setGoodBoneAndSkinValue(parseFloat(goodBoneAndSkin[0].custotab));
                }
            }

            if ( goodBoneDiscard.length > 0 ) {
                if ( goodBoneDiscard[0].opcusto === 'M' ) {
                    setGoodBoneDiscardValue(parseFloat(goodBoneDiscard[0].customed));
                } else {
                    setGoodBoneDiscardValue(parseFloat(goodBoneDiscard[0].custotab));
                }
            }

        }
	}, [goods, cutOutCodes]);

    // Calculando os somatórios
    const totalPrimeMeatKg = entradas ? entradas.reduce((acc, entrada) => acc + parseFloat(entrada.primeMeatKg.replace(',','.')), 0) : 0;
    const totalSecondMeatKg = entradas ? entradas.reduce((acc, entrada) => acc + parseFloat(entrada.secondMeatKg.replace(',','.')), 0) : 0;
    const totalBoneAndSkinKg = entradas ? entradas.reduce((acc, entrada) => acc +  parseFloat(entrada.boneAndSkinKg.replace(',','.')), 0) : 0;
    const totalBoneDiscardKg = entradas ? entradas.reduce((acc, entrada) => acc +  parseFloat(entrada.boneDiscardKg.replace(',','.')), 0) : 0;

    const primeCode = cutOutCodes && cutOutCodes.filter((cut_code)=>{
        return cut_code.cutout_type === 'PRIMEIRA';
    });
    const secondCode = cutOutCodes && cutOutCodes.filter((cut_code)=>{
        return cut_code.cutout_type === 'SEGUNDA';
    });
    const BoneAndSkinCode = cutOutCodes && cutOutCodes.filter((cut_code)=>{
        return cut_code.cutout_type === 'OSSO E PELANCA';
    });
    const BoneDiscardCode = cutOutCodes && cutOutCodes.filter((cut_code)=>{
        return cut_code.cutout_type === 'OSSO A DESCARTE';
    });

	return (
		<>
		<ScrollView style={{flex: 1}}>
            <View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
                
                <ListItem 
                    bottomDivider
                >
                    <ListItem.Content>
                    <ListItem.Title>Recortes de Primeira - Cód: {primeCode[0] && primeCode[0]['cutout_code']}</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
                <ListItem 
                    bottomDivider
                >
                    <ListItem.Content>
                    <ListItem.Title>{totalPrimeMeatKg.toString().replace('.',',')}Kg</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
                {/*
                    entradas && entradas.map((entrada, index)=>{
                        return (
                            <ListItem 
                                bottomDivider key={'prime_' + index}
                            >
                                <ListItem.Content>
                                <ListItem.Title>{entrada.primeMeatKg}Kg</ListItem.Title>
                                </ListItem.Content>
                            </ListItem>
                        )
                    })
                */}

                <View style={GlobalStyle.spaceSmall} />
                
                <ListItem 
                    bottomDivider
                >
                    <ListItem.Content>
                    <ListItem.Title>Recortes de Segunda - Cód: {secondCode[0] && secondCode[0]['cutout_code']}</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
                <ListItem 
                    bottomDivider
                >
                    <ListItem.Content>
                    <ListItem.Title>{totalSecondMeatKg.toString().replace('.',',')}Kg</ListItem.Title>
                    </ListItem.Content>
                </ListItem>

                <View style={GlobalStyle.spaceSmall} />
                
                <ListItem 
                    bottomDivider
                >
                    <ListItem.Content>
                    <ListItem.Title>Osso e Pelanca - Cód: {BoneAndSkinCode[0] && BoneAndSkinCode[0]['cutout_code']}</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
                <ListItem 
                    bottomDivider
                >
                    <ListItem.Content>
                    <ListItem.Title>{totalBoneAndSkinKg.toString().replace('.',',')}Kg</ListItem.Title>
                    </ListItem.Content>
                </ListItem>

                <View style={GlobalStyle.spaceSmall} />
                
                <ListItem 
                    bottomDivider
                >
                    <ListItem.Content>
                    <ListItem.Title>Osso a Descarte - Cód: {BoneDiscardCode[0] && BoneDiscardCode[0]['cutout_code']}</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
                <ListItem 
                    bottomDivider
                >
                    <ListItem.Content>
                    <ListItem.Title>{totalBoneDiscardKg.toString().replace('.',',')}Kg</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
            </View>
            <ModalReadIcomes
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
            />
		</ScrollView>

		<ResumoEntradas 
            goodPrimeValue={goodPrimeValue}
            goodSecondValue={goodSecondValue}
            goodBoneAndSkinValue={goodBoneAndSkinValue}
            goodBoneDiscardValue={goodBoneDiscardValue}

            goodPrimeCode={primeCode[0] && primeCode[0]['cutout_code']}
            goodSecondCode={secondCode[0] && secondCode[0]['cutout_code']}
            goodBoneAndSkinCode={BoneAndSkinCode[0] && BoneAndSkinCode[0]['cutout_code']}
            goodBoneDiscardCode={BoneDiscardCode[0] && BoneDiscardCode[0]['cutout_code']}

            totalPrimeMeatKg={totalPrimeMeatKg}
            totalSecondMeatKg={totalSecondMeatKg}
            totalBoneAndSkinKg={totalBoneAndSkinKg}
            totalBoneDiscardKg={totalBoneDiscardKg}

            expectedYields={expectedYields}

        />

		<View style={{ paddingHorizontal: 16, paddingTop: 16, flexDirection: 'row' }}>
            <Button
                containerStyle={{marginTop: 15, marginBottom: 15, flex: 1}}
                titleStyle={{}}
                buttonStyle={{borderRadius: 25, paddingVertical: 10, backgroundColor: COLORS.primary}}
                title="ADICIONAR ENTRADA"
                onPress={()=>{
                    setModalVisible(true);
                }}
            />
            <Button
                containerStyle={{ marginTop: 15, marginBottom: 15}}
                titleStyle={{color: COLORS.primary}}
                buttonStyle={{borderRadius: 25, paddingVertical: 10, paddingHorizontal: 20, marginLeft: 15, backgroundColor: COLORS.secondary}}
                title="FINALIZAR"
                onPress={()=>{
                    navigation.dispatch(
                        CommonActions.navigate({
                            name: 'Finalizar',
                        })
                    ); 
                }}
            />
        </View>
        </>
	);
}

export default TabEntradas;
