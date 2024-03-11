import React, { useState, useEffect } from 'react';
import { Text, View, Modal } from 'react-native';
import { Button } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';

import FormReadIncomes from '@components/Forms/FormReadIncomes';

import COLORS from '@constants/colors';

export default function ModalReadValues(props) {
	const dispatch = useDispatch();

    const entradas = useSelector(state => state.appReducer.entradas);

    const modalVisible = props.modalVisible;
    const setModalVisible = props.setModalVisible;

    const validationSchema = yup.object().shape({
        primeMeatKg: yup.string().required('Quantidade em KG de primeira obrigatório'),
        secondMeatKg: yup.string().required('Quantidade em KG de segunda obrigatório'),
        boneAndSkinKg: yup.string().required('Quantidade em KG de ossos e pelancas obrigatório')
    });

    const formik = useFormik({
        initialValues: { 
            primeMeatKg: '', 
            secondMeatKg: '',
            boneAndSkinKg: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values, {setSubmitting}) => {


            if ( entradas.length > 0) {

                console.log('-> Registro encontrado, adicionando o item.');

                let _entradas = entradas; 
                _entradas.push(values);

                dispatch({
                    type: 'CONFIRM_ENTRADA',
                    payload: {
                        submitValues: _entradas,
                        setSubmitting: setSubmitting,
                        callback_success: () => {
                            setModalVisible(false);
                        }
                    }
                })

            } else {

                console.log('-> Nenhum registro encontrado, salvando o primeiro.');

                dispatch({
                    type: 'CONFIRM_ENTRADA',
                    payload: {
                        submitValues: [values],
                        setSubmitting: setSubmitting,
                        callback_success: () => {
                            setModalVisible(false);
                        }
                    }
                })

            }
        },
    }); 

    useEffect(() => {
        if ( modalVisible === false ) {
            formik.resetForm();
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
                    <FormReadIncomes 
                        formik={formik}
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
