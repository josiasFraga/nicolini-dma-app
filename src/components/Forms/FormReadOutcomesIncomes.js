import React, { memo } from 'react';
import { View, Text } from 'react-native';
import { Button, Input } from 'react-native-elements';

import PickerSearchableMercadoriasPadaria from '@components/Forms/Fields/PickerSearchableMercadoriasPadaria';
import COLORS from '@constants/colors';

/* ------------- máscara simples para “000.000,000” ------------- */
const formatDecimal = (raw) => {
  const numbers = raw.replace(/[^\d]/g, '');        // somente números
  const padded = numbers.padStart(4, '0').slice(-9); // no máx. 9 dígitos (6 + 3)
  const parteInteira = padded.slice(0, -3).replace(/^0+(?=\d)/, '');
  return `${parteInteira},${padded.slice(-3)}`;
};

/* -------- linha reutilizável (Saída / Entrada) -------- */
const LineItem = memo(({ idx, label, formik }) => {
  const fieldKg = `${idx}.kg`;
  const fieldGood = `${idx}.goodCode`;

  return (
    <View
      style={{
        backgroundColor: '#f7f7f7',
        padding: 15,
        marginTop: idx ? 15 : 0,
        width: '100%',
      }}
    >
      <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#444' }}>
        {label}
      </Text>

      {/* Picker de mercadorias */}
      <PickerSearchableMercadoriasPadaria
        value={formik.values[idx].goodCode}
        setValue={(fn) =>
          formik.setFieldValue(fieldGood, fn(formik.values[idx].goodCode))
        }
      />

      {/* Quantidade em Kg */}
      <Input
        label="Quantidade em Kg"
        value={formik.values[idx].kg}
        onChangeText={(txt) => formik.setFieldValue(fieldKg, formatDecimal(txt))}
        onBlur={() => formik.setFieldTouched(fieldKg)}
        errorMessage={formik.touched[idx]?.kg && formik.errors[idx]?.kg}
        keyboardType="decimal-pad"
        placeholder="Informe o valor em Kg"
        placeholderTextColor={COLORS.quaternary}
      />
    </View>
  );
});

/* ---------------- componente principal ---------------- */
export default function FormReadOutcomesIncomes({ formik }) {
  return (
    <>
      <LineItem idx={0} label="Saída" formik={formik} />
      <LineItem idx={1} label="Entrada" formik={formik} />
      <View style={{width: '100%'}}>
        <Button
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
