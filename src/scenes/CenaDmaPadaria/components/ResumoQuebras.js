import React, { useState, useEffect } from 'react';
import {
	View
} from 'react-native';
import { useSelector } from 'react-redux';
import { Text } from 'react-native-elements';

const ResumoQuebras = () => {

    const quebras = useSelector(state => state.appReducer.quebras_padaria);
	const [totalKg, setTotalKg] = useState(0);
	const [totalRS, setTotalRS] = useState(0);

    useEffect(() => {

        if ( quebras.length > 0 ) {
            let sum_quebras = 0;
            let sum_rs_quebras = 0;
            quebras.map((quebra)=>{
                let kg = quebra.kg;
                
                kg = kg.replace(',','.');

                sum_quebras += parseFloat(kg);
                sum_rs_quebras += parseFloat(quebra.cost) > 0 ? parseFloat(quebra.cost) * parseFloat(kg) : 0;
                
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
