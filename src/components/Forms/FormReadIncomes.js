import React from 'react';
import { Input, Button } from 'react-native-elements';
import { View } from 'react-native';
import COLORS from '@constants/colors';
import GlobalStyle from '@styles/global';

export default function FormReadIncomes(props) {

  const formik = props.formik;

  const handleDecimalInputChange = (name, value) => {
    // Remove todos os caracteres que não sejam números
    let numericValue = value.replace(/[^\d]/g, '');
    
    // Remove zeros à esquerda
    numericValue = numericValue.replace(/^0+/, '');

    // Adiciona zeros à esquerda se necessário para garantir pelo menos quatro dígitos
    while (numericValue.length < 4) {
      numericValue = '0' + numericValue;
    }

    // Limita a 9 caracteres no total (6 antes da vírgula e 3 após a vírgula)
    if (numericValue.length > 9) {
      numericValue = numericValue.slice(-9);
    }

    // Formata a string com a vírgula antes dos três últimos dígitos
    let formattedValue = numericValue.slice(0, -3) + ',' + numericValue.slice(-3);
    
    // Remove zeros à esquerda, exceto se for o último zero antes da vírgula
    formattedValue = formattedValue.replace(/^0+(?=\d)/, '');

    // Atualiza o valor no Formik
    formik.setFieldValue(name, formattedValue);
  };

  const toggleSign = () => {
    const fieldsToToggle = ['primeMeatKg', 'secondMeatKg', 'boneAndSkinKg', 'boneDiscardKg']; // Add all the field names you want to toggle
    fieldsToToggle.forEach((field) => {
      const value = formik.values[field];
      if (value && value !== '0') {
        if (value.startsWith('-')) {
          formik.setFieldValue(field, value.slice(1));
        } else {
          formik.setFieldValue(field, '-' + value);
        }
      }
    });
  };

  return (
    <>
        <Input
            label="Recorte de Primeira"
            onChangeText={(text) => handleDecimalInputChange('primeMeatKg', text)}
            onBlur={formik.handleBlur('primeMeatKg')}
            value={formik.values.primeMeatKg}
            errorMessage={formik.touched.primeMeatKg && formik.errors.primeMeatKg}
            keyboardType="decimal-pad"
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
            keyboardType="decimal-pad"
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
            keyboardType="decimal-pad"
            autoCapitalize="none"
            placeholder='informe o valor em KG'
            placeholderTextColor={COLORS.quaternary}
        />
        <Input
            label="Osso a Descarte"
            onChangeText={(text) => handleDecimalInputChange('boneDiscardKg', text)}
            onBlur={formik.handleBlur('boneDiscardKg')}
            value={formik.values.boneDiscardKg}
            errorMessage={formik.touched.boneDiscardKg && formik.errors.boneDiscardKg}
            keyboardType="decimal-pad"
            autoCapitalize="none"
            placeholder='informe o valor em KG'
            placeholderTextColor={COLORS.quaternary}
        />
        <View style={GlobalStyle.row}>
          <Button
              containerStyle={{marginRight: 15, width: 35}}
              titleStyle={{}}
              buttonStyle={{borderRadius: 10, paddingVertical: 10, backgroundColor: 'red'}}
              title="-"
              onPress={toggleSign}
              disabled={formik.isSubmitting}
              loading={formik.isSubmitting}
          />
          <Button
              containerStyle={{flex: 1}}
              titleStyle={{}}
              buttonStyle={{borderRadius: 10, paddingVertical: 10, backgroundColor: 'green', marginBottom: 15}}
              title="Confirmar"
              onPress={formik.handleSubmit}
              disabled={formik.isSubmitting}
              loading={formik.isSubmitting}
          />
        </View>
    </>
  );
}