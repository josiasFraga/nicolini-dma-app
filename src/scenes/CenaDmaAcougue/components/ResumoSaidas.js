import React, { useState, useEffect } from 'react';
import {
	View
} from 'react-native';
import { useSelector } from 'react-redux';
import { Text } from 'react-native-elements';

const ResumoSaidas = () => {

    const saidas = useSelector(state => state.appReducer.saidas);
	const [totalSaidasKg, setTotalSaidasKg] = useState(0);
	const [totalSaidasRS, setTotalSaidasRS] = useState(0);

    useEffect(() => {

        if ( saidas.length > 0 ) {
            let sum_saidas = 0;
            let sum_rs_saidas = 0;
            saidas.map((saida)=>{
                let kg = saida.kg;
                
                kg = kg.replace(',','.');

                sum_saidas += parseFloat(kg);

                if ( saida.good.opcusto === 'M' ) {
                    sum_rs_saidas += parseFloat(saida.good.customed) * parseFloat(kg);
                } else {
                    sum_rs_saidas += parseFloat(saida.good.custotab) * parseFloat(kg);
                }
            })

            setTotalSaidasRS(sum_rs_saidas);
            setTotalSaidasKg(parseFloat(sum_saidas));

        } else {

            setTotalSaidasRS(0);
            setTotalSaidasKg(0);

        }

    }, [saidas]);

	return (
		<View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
            <View>
                <Text>TOTAL SAÍDAS (KG): <Text style={{fontWeight: 'bold'}}>{totalSaidasKg.toString().replace('.',',')}Kg</Text></Text>
            </View>
            <View>
                <Text>TOTAL SAÍDAS (R$): <Text style={{fontWeight: 'bold'}}>R$ {totalSaidasRS.toFixed(2).toString().replace('.',',')}</Text></Text>
            </View>
        </View>

	);
}

export default ResumoSaidas;
