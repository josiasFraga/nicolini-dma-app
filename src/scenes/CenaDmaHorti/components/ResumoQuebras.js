import React, { useState, useEffect } from 'react';
import {
	View
} from 'react-native';
import { useSelector } from 'react-redux';
import { Text } from 'react-native-elements';

const ResumoQuebras = () => {

    const quebras = useSelector(state => state.appReducer.quebras);
	const [totalKg, setTotalKg] = useState(0);
	const [totalRS, setTotalRS] = useState(0);

    useEffect(() => {

        if ( quebras.length > 0 ) {
            let sum_quebras = 0;
            let sum_rs_quebras = 0;
            quebras.map((saida)=>{
                let kg = saida.kg;
                
                kg = kg.replace(',','.');

                sum_quebras += parseFloat(kg);

                if ( saida.good.opcusto === 'M' ) {
                    sum_rs_quebras += parseFloat(saida.good.customed) * parseFloat(kg);
                } else {
                    sum_rs_quebras += parseFloat(saida.good.custotab) * parseFloat(kg);
                }
            })

            setTotalRS(sum_rs_quebras);
            setTotalKg(parseFloat(sum_quebras));

        } else {

            setTotalRS(0);
            setTotalKg(0);

        }

    }, [quebras]);

	return (
		<View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
            <View>
                <Text>TOTAL PRODUÇÃO (KG): <Text style={{fontWeight: 'bold'}}>{totalKg.toString().replace('.',',')}Kg</Text></Text>
            </View>
            <View>
                <Text>TOTAL PRODUÇÃO (R$): <Text style={{fontWeight: 'bold'}}>R$ {totalRS.toFixed(2).toString().replace('.',',')}</Text></Text>
            </View>
        </View>

	);
}

export default ResumoQuebras;
