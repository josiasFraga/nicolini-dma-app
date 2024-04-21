import React, { useState, useEffect } from 'react';
import { Text, View, Modal } from 'react-native';
import { Button } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';

import FormReadExits from '@components/Forms/FormReadExits';

import COLORS from '@constants/colors';

export default function ModalReadExits(props) {
	const dispatch = useDispatch();

    const [selectedGood, setSelectedGood] = useState('');

    const saidas = useSelector(state => state.appReducer.saidas);

    const goods = props.goods;
    const modalVisible = props.modalVisible;
    const setModalVisible = props.setModalVisible;
    const goodCode = props.goodCode;

    const validationSchema = yup.object().shape({
        kg: yup.string().required('Quantidade em KG obrigatório'),
        goodCode: yup.string().required('Código da mercadoria obrigatório'),
    });

    const formik = useFormik({
        initialValues: { 
            kg: '', 
            goodCode: goodCode
        },
        validationSchema: validationSchema,
        onSubmit: (values, {setSubmitting}) => {
            values.good = selectedGood;

            dispatch({
                type: 'CONFIRM_SAIDAS',
                payload: {
                    submitValues: values,
                    setSubmitting: setSubmitting,
                    callback_success: () => {
                        setModalVisible(false);
                    }
                }
            })

            /*if ( saidas.length > 0) {
            
                let _saidas = saidas.filter((data)=>{
                    return parseFloat(data.goodCode) === parseFloat(values.goodCode);
                });

                /*if ( _saidas.length == 0 ) {
                    console.log('-> Registro não encontrado na listagem, adicionando...');

                    // Adiciona o item a lista de itens lidos
                    let _saidas = saidas;
                    _saidas.push(values);

                    dispatch({
                        type: 'CONFIRM_SAIDAS',
                        payload: {
                            submitValues: _saidas,
                            setSubmitting: setSubmitting,
                            callback_success: () => {
                                setModalVisible(false);
                            }
                        }
                    })


                } else {
                    console.log('-> Registro encontrado na listagem, atualizando valores...');

                    // Soma os valores de recorte de primeira
                    const kg = _saidas[0].kg;
                    let sumKg = parseFloat(kg.replace(',', '.')) + parseFloat(values.kg.replace(',', '.'));
                    sumKg = sumKg.toString().replace('.',',');
                    _saidas[0].kg = sumKg;

                    const new_saidas = saidas.map((data)=>{
                        return parseFloat(data.goodCode) === parseFloat(values.goodCode) ? _saidas[0] : data;
                    });

                    dispatch({
                        type: 'CONFIRM_SAIDAS',
                        payload: {
                            submitValues: new_saidas,
                            setSubmitting: setSubmitting,
                            callback_success: () => {
                                setModalVisible(false);
                            }
                        }
                    })
                }*/

            /*} else {

                console.log('-> Nenhum registro encontrado, salvando o primeiro.');

                dispatch({
                    type: 'CONFIRM_SAIDAS',
                    payload: {
                        submitValues: [values],
                        setSubmitting: setSubmitting,
                        callback_success: () => {
                            setModalVisible(false);
                        }
                    }
                })

            }*/
        },
    });

    const searchInteralCodeIntoGoods = (inderanalCode) => {

        const good_filter = goods.filter((_good)=>{
            return parseFloat(_good.cd_codigoint) === parseFloat(inderanalCode);
        });

        if ( good_filter.length == 0 ) {
            return false;
        } else {
            return good_filter[0];
        }

    }

    useEffect(() => {
        formik.setFieldValue('goodCode', goodCode);

        if ( goodCode !== "" ) {

            const good_filter = searchInteralCodeIntoGoods(goodCode);

            if ( !good_filter ) {
                console.log('-> Mercadoria não encontrada ' . goodCode);
                formik.setFieldValue('goodCode', '');
                setSelectedGood('');

            } else {
                setSelectedGood(good_filter);
            }


        } else {
            formik.setFieldValue('goodCode', '');
            setSelectedGood('');

        }
    }, [goodCode, goods]);

    useEffect(() => {
        if ( modalVisible === false ) {
            formik.resetForm();
            setSelectedGood('');
        }

    }, [modalVisible]);

  
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
                formik.resetForm();
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <FormReadExits 
                        formik={formik}
                        selectedGood={selectedGood}
                        searchInteralCodeIntoGoods={searchInteralCodeIntoGoods}
                        setSelectedGood={setSelectedGood}
                    />
                    <Button
                        titleStyle={{color: COLORS.primary}}
                        type='clear'
                        buttonStyle={{borderRadius: 25, paddingVertical: 10, marginTop: 25}}
                        title="Cancelar"
                        onPress={() => setModalVisible(!modalVisible)}
                    />
                </View>
            </View>
        </Modal>
    );
}

const opacity = 'rgba(0, 0, 0, .6)';
const styles = {
  container: {
    flex: 1
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    width: '100%',
    backgroundColor: opacity
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%'
  },
};
