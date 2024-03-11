import React from 'react';
import { Input, Button, Text } from 'react-native-elements';
import COLORS from '@constants/colors';

export default function FormReadIncomes(props) {

  const formik = props.formik;

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



  return (
    <>
        <Input
            label="Recorte de Primeira"
            onChangeText={(text) => handleDecimalInputChange('primeMeatKg', text)}
            onBlur={formik.handleBlur('primeMeatKg')}
            value={formik.values.primeMeatKg}
            errorMessage={formik.touched.primeMeatKg && formik.errors.primeMeatKg}
            keyboardType="number-pad"
            autoCapitalize="none"
            placeholder='informe o valor em KG'
            placeholderTextColor={COLORS.quaternary}
        />
        <Input
            label="Recorte de Segunda"
            onChangeText={(text) => handleDecimalInputChange('secondMeatKg', text)}
            onBlur={formik.handleBlur('secondMeatKg')}
            value={formik.values.secondMeatKg}
            errorMessage={formik.touched.secondMeatKg && formik.errors.secondMeatKg}
            keyboardType="number-pad"
            autoCapitalize="none"
            placeholder='informe o valor em KG'
            placeholderTextColor={COLORS.quaternary}
        />
        <Input
            label="Osso e Pelanca"
            onChangeText={(text) => handleDecimalInputChange('boneAndSkinKg', text)}
            onBlur={formik.handleBlur('boneAndSkinKg')}
            value={formik.values.boneAndSkinKg}
            errorMessage={formik.touched.boneAndSkinKg && formik.errors.boneAndSkinKg}
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