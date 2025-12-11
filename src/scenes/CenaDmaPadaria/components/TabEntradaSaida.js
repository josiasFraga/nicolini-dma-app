import React, { useState, useEffect } from 'react';
import {
    View,
    ScrollView,
    Linking
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { Button, ListItem, Text } from 'react-native-elements';
import ModalReadIcomes from '@components/Modals/ModalReadIcomes';
import COLORS from '@constants/colors';


import GlobalStyle from '@styles/global';
import ModalReadOutcomesIncomes from '../../../components/Modals/ModalReadOutcomesIncomes';

const TabEntradaSaida = (props) => {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const [modalVisible, setModalVisible] = useState(false);
    const [goodPrimeValue, setGoodPrimeValue] = useState(0);
    const [goodSecondValue, setGoodSecondValue] = useState(0);
    const [goodBoneAndSkinValue, setGoodBoneAndSkinValue] = useState(0);
    const [goodBoneDiscardValue, setGoodBoneDiscardValue] = useState(0);
    const [goods, setGoods] = useState([]);
    
    const entradas = useSelector(state => state.appReducer.entradas_padaria);
    const saidas = useSelector(state => state.appReducer.saidas_padaria);
    
    const loadIncomes = async () => {
        console.log('... Buscando entradas');

        dispatch({
            type: 'LOAD_ENTRADAS',
            payload: {
                app_product_id: 3,
            }
        })
    }

    const loadOutcomes = async () => {
        console.log('... Buscando saidas');

        dispatch({
            type: 'LOAD_SAIDAS',
            payload: {
                app_product_id: 3,
            }
        })
    }

    useEffect(() => {
        loadIncomes();
        loadOutcomes();
    }, []);

    // Calculando os somatórios
    //const totalPrimeMeatKg = entradas ? entradas.reduce((acc, entrada) => acc + parseFloat(entrada.primeMeatKg.replace(',','.')), 0) : 0;
    //const totalSecondMeatKg = entradas ? entradas.reduce((acc, entrada) => acc + parseFloat(entrada.secondMeatKg.replace(',','.')), 0) : 0;
    //const totalBoneAndSkinKg = entradas ? entradas.reduce((acc, entrada) => acc +  parseFloat(entrada.boneAndSkinKg.replace(',','.')), 0) : 0;
    //const totalBoneDiscardKg = entradas ? entradas.reduce((acc, entrada) => acc +  parseFloat(entrada.boneDiscardKg.replace(',','.')), 0) : 0;


    return (
        <>
        <ScrollView style={{flex: 1}}>
            
            <ModalReadOutcomesIncomes
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
            />
        </ScrollView>

        

        <View style={{ paddingHorizontal: 16, paddingTop: 16, flexDirection: 'row' }}>
            <Button
                containerStyle={{marginTop: 15, marginBottom: 15, flex: 1}}
                titleStyle={{}}
                buttonStyle={{borderRadius: 25, paddingVertical: 10, backgroundColor: COLORS.primary}}
                title="ADICIONAR SAÍDA/ENTRADA"
                onPress={()=>{
                    setModalVisible(true);
                }}
            />

        </View>
        </>
    );
}

export default TabEntradaSaida;
