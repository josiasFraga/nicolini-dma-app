import React from 'react';
import { View } from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';
import COLORS from '@constants/colors';

export default function FormLogin(props) {
  const formik = props.formik;
  const buttonText = props.buttonText ? props.buttonText : 'Entrar';

  return (
    <>
    <View>
        <Input
            label="Login"
            leftIcon={<Icon name="user" type={"antdesign"} size={24} color={COLORS.quaternary} />}
            onChangeText={formik.handleChange('user')}
            onBlur={formik.handleBlur('user')}
            value={formik.values.user}
            errorMessage={formik.touched.user && formik.errors.user}
            //keyboardType="email-address"
            autoCapitalize="none"
            placeholder='Digite seu login'
            placeholderTextColor={COLORS.quaternary}
        />
        <Input
            label="Senha"
            leftIcon={<Icon name="lock" size={24} color={COLORS.quaternary} />}
            onChangeText={formik.handleChange('password')}
            onBlur={formik.handleBlur('password')}
            value={formik.values.password}
            errorMessage={formik.touched.password && formik.errors.password}
            secureTextEntry
            autoCapitalize="none"
            placeholder='Digite sua senha cadastrada'
            placeholderTextColor={COLORS.quaternary}
        />
        <Button
            titleStyle={{}}
            buttonStyle={{borderRadius: 25, paddingVertical: 10, backgroundColor: COLORS.primary}}
            title={buttonText}
            onPress={formik.handleSubmit}
            disabled={formik.isSubmitting}
            loading={formik.isSubmitting}
        />
    </View>
    </>
  );
}