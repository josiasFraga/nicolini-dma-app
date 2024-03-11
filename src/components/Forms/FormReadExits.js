import React from 'react';
import { Input, Button, Text } from 'react-native-elements';
import COLORS from '@constants/colors';

export default function FormReadExits(props) {

  const formik = props.formik;
  const selectedGood = props.selectedGood;
  const searchInteralCodeIntoGoods = props.searchInteralCodeIntoGoods;
  const setSelectedGood = props.setSelectedGood;

  const handleDecimalInputChange = (name, value) => {
    // Primeiro, substitui pontos por vírgulas para padronizar o separador decimal
    let formattedValue = value.replace(/\./g, ',');

    // Permite apenas números e vírgula, e limita a 3 casas decimais após a vírgula
    formattedValue = formattedValue.replace(/[^0-9,]/g, '').replace(/(,.*?),(.*?)/g, '$1');
    const parts = formattedValue.split(',');

    if (parts.length > 1) {
      formattedValue = parts[0] + ',' + parts[1].slice(0, 3);
    }

    formik.setFieldValue(name, formattedValue);
  };

  const handleBlurGoodCode = (e) => {

    formik.handleBlur('goodCode')(e);

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

  return (
    <>
        <Text style={{textAlign: 'left', width: '100%', color: "#999", paddingLeft: 10}}>{'Mercadoria: ' + selectedGood?.tx_descricao}</Text>
        <Input
            label="Código da Marcadoria"
            onChangeText={formik.handleChange('goodCode')}
            onBlur={handleBlurGoodCode}
            value={formik.values.goodCode}
            errorMessage={formik.touched.goodCode && formik.errors.goodCode}
            keyboardType="number-pad"
            autoCapitalize="none"
            placeholder='Digite o código da mercadoria'
            placeholderTextColor={COLORS.quaternary}
        />
        <Input
            label="Quantidade em Kg"
            onChangeText={(text) => handleDecimalInputChange('kg', text)}
            onBlur={formik.handleBlur('kg')}
            value={formik.values.kg}
            errorMessage={formik.touched.kg && formik.errors.kg}
            keyboardType="number-pad"
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
            disabled={formik.isSubmiting}
            loading={formik.isSubmiting}
        />
    </>
  );
}