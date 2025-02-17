import React from 'react';

import Header from '@components/Header';
import Lista from './components/Lista';
import COLORS from '@constants/colors';

const CenaProducoesPadaria = () => {
  return (
	<>
	  <Header 
		backButton
		titulo={'Padaria - Produção'}
		styles={{ backgroundColor: COLORS.primary }} 
		titleStyle={{ color: '#f7f7f7' }} 
		iconColor={'#f7f7f7'}
	  />
	  <Lista />
	</>
  );
};

export default CenaProducoesPadaria;
