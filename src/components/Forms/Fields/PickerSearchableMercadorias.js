import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

DropDownPicker.addTranslation("EN", {
    PLACEHOLDER: "Selecionar uma mercadoria",
    SEARCH_PLACEHOLDER: "Procurar mercadoria...",
    SELECTED_ITEMS_COUNT_TEXT: "{count} mercadorias selecionadas",
    NOTHING_TO_SHOW: "Nada a mostrar"
});
DropDownPicker.setLanguage("EN");

const PickerSearchableMercadoria = (props) => {
    const [open, setOpen] = useState(false);
    const [goods, setGoods] = useState([]);
    const dispatch = useDispatch();
    const getGoods = async () => {
        let goodsData = await AsyncStorage.getItem('goods');
        goodsData = JSON.parse(goodsData);
        let goodsReturn = [];
        if (goodsData !== null) {
            goodsReturn = goodsData.map((item, index) => {
                return {
                    id: item + '' + index, label: item.cd_codigoint + ' - ' + item.tx_descricao, value: item.cd_codigoint
                };
            });
        }
        setGoods(goodsReturn);
    }

    useEffect(() => {
        getGoods();
    }, [])

    console.log(goods);

    return (
        <View>
            <DropDownPicker
                open={open}
                value={props.value}
                setValue={props.setValue}
                items={goods}
                setOpen={setOpen}
                //loading={isRequesting}
                searchable={true}
                searchablePlaceholder="Procurar Mercadoria..."
                maxHeight={50}
                listMode="MODAL"
                ListEmptyComponent={({ listMessageContainerStyle, listMessageTextStyle, ActivityIndicatorComponent, loading, message }) => (
                    <View style={listMessageContainerStyle}>
                        {loading ? (
                            <ActivityIndicatorComponent />
                        ) : (
                            <>
                                <Text style={listMessageTextStyle}>mercadoria não encontrada</Text>
                            </>
                        )}
                    </View>
                )}
                textStyle={styles.textStyle} // Add this line
            />
        </View>
    );
};

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 18, // Change this value to increase the font size
    },
});

export default PickerSearchableMercadoria;
