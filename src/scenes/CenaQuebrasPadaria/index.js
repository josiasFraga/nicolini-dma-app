import React from 'react';

import Header from '@components/Header';
import Lista from './components/Lista';
import COLORS from '@constants/colors';

const CenaQuebrasPadaria = () => {
  return (
	<>
	  <Header 
		backButton
		titulo={'Padaria - Quebras'}
		styles={{ backgroundColor: COLORS.primary }} 
		titleStyle={{ color: '#f7f7f7' }} 
		iconColor={'#f7f7f7'}
	  />
	  <Lista />
	</>
  );
};

export default CenaQuebrasPadaria;