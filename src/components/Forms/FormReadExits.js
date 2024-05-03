import React, { useEffect } from 'react';
import { Input, Button, Text } from 'react-native-elements';
import COLORS from '@constants/colors';
import { View } from 'react-native';
import GlobalStyle from '@styles/global';

import PickerSearchableMercadorias from '@components/Forms/Fields/PickerSearchableMercadorias';

export default function FormReadExits(props) {

  const formik = props.formik;
  const selectedGood = props.selectedGood;
  const searchInteralCodeIntoGoods = props.searchInteralCodeIntoGoods;
  const setSelectedGood = props.setSelectedGood;

  const handleDecimalInputChange = (name, value) => {
    // Permite um sinal de menos no início da string e substitui pontos por vírgulas
    let formattedValue = value.replace(/\./g, ',');
  
    // Permite apenas um sinal de menos no início, números e uma vírgula, limitando a 3 casas decimais
    formattedValue = formattedValue
      .replace(/^-?/, '$&') // Permite o sinal de menos no início
      .replace(/[^\d,]-/g, '') // Remove sinais de menos que não estejam no início
      .replace(/[^0-9,-]/g, '') // Permite números, vírgula e sinal de menos
      .replace(/(,.*?),(.*?)/g, '$1'); // Remove vírgulas adicionais, mantendo apenas a primeira
    
    const parts = formattedValue.split(',');
  
    if (parts.length > 1) {
      // Limita a 3 casas decimais após a vírgula
      formattedValue = parts[0] + ',' + parts[1].slice(0, 3);
    }
  
    // Atualiza o valor no Formik
    formik.setFieldValue(name, formattedValue);
  };

  const handleBlurGoodCode = () => {


    const goodCodeValue = formik.values.goodCode;

    if (goodCodeValue) {
      const good_filter = searchInteralCodeIntoGoods(goodCodeValue);

      if ( !good_filter ) {
        console.log('-> Mercadoria não encontrada ' . goodCode);
        formik.setFieldValue('goodCode', '');
        setSelectedGood('');

      } else {
        setSelectedGood(good_filter);
      }
    }
  };

  useEffect(()=>{

    handleBlurGoodCode();

  },[formik.values.goodCode]);

  return (
    <>
        <Text style={{textAlign: 'left', width: '100%', color: "#999", paddingLeft: 10}}>{'Mercadoria: ' + selectedGood?.tx_descricao}</Text>
        
        <View style={GlobalStyle.spaceSmall} />
        <PickerSearchableMercadorias
        value={formik.values.goodCode}
        setValue={
          (callback) => {
              formik.setFieldValue('goodCode', callback(formik.values.goodCode));
          }
        }
        />
        <View style={GlobalStyle.spaceSmall} />
        <Input
            label="Quantidade em Kg"
            onChangeText={(text) => handleDecimalInputChange('kg', text)}
            onBlur={formik.handleBlur('kg')}
            value={formik.values.kg}
            errorMessage={formik.touched.kg && formik.errors.kg}
            keyboardType="decimal-pad"
            autoCapitalize="none"
            placeholder='informe o valor em KG'
            placeholderTextColor={COLORS.quaternary}
        />
        <Button
            containerStyle={{width: '100%'}}
            titleStyle={{}}
            buttonStyle={{borderRadius: 25, paddingVertical: 10, backgroundColor: COLORS.primary}}
            title="Confirmar"
            onPress={formik.handleSubmit}
            disabled={formik.isSubmitting}
            loading={formik.isSubmitting}
        />
    </>
  );
}