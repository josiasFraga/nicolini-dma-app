import React from 'react';
import { View, Text } from 'react-native';

import BackButton from '@components/Buttons/BackButton';
import GlobalStyle from '@styles/global';
import CONFIG from '@constants/configs';

const Header = ({ backButton, iconColor, styles, titleStyle, titulo, leftElement }) => {
  return (
    <View
      style={[
        GlobalStyle.header,
        GlobalStyle.paddingStatusBar,
        {
          height: CONFIG.ORIGINAL_HEADER_HEIGHT,
        },
        styles,
      ]}>
      <View style={GlobalStyle.row}>
        <View style={{flex: 1}}>
          {backButton && <BackButton backScene='pop' iconColor={iconColor} />}
          {leftElement && leftElement()}
        </View>
        <View style={{flex: 6}}>
          <Text style={[GlobalStyle.pageTitle, titleStyle]}>{titulo}</Text>
        </View>
        <View style={{flex: 1}}>
          {/* Espaço reservado para possível conteúdo adicional */}
        </View>
      </View>
    </View>
  );
};

export default Header;
