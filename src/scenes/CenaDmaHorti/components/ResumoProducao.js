import React, { useState, useEffect } from 'react';
import {
	View
} from 'react-native';
import { useSelector } from 'react-redux';
import { Text } from 'react-native-elements';

const ResumoProducao = () => {

    const producoes = useSelector(state => state.appReducer.producoes);
	const [totalProducoesKg, setTotalProducoesKg] = useState(0);
	const [totalProducoesRS, setTotalProducoesRS] = useState(0);

    useEffect(() => {

        if ( producoes.length > 0 ) {
            let sum_producoes = 0;
            let sum_rs_producoes = 0;
            producoes.map((producao)=>{
                let kg = producao.kg;
                
                kg = kg.replace(',','.');

                sum_producoes += parseFloat(kg);

                if ( producao.good.opcusto === 'M' ) {
                    sum_rs_producoes += parseFloat(producao.good.customed) * parseFloat(kg);
                } else {
                    sum_rs_producoes += parseFloat(producao.good.custotab) * parseFloat(kg);
                }
            })

            setTotalProducoesRS(sum_rs_producoes);
            setTotalProducoesKg(parseFloat(sum_producoes));

        } else {

            setTotalProducoesRS(0);
            setTotalProducoesKg(0);

        }

    }, [producoes]);

	return (
		<View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
            <View>
                <Text>TOTAL PRODUÇÃO (KG): <Text style={{fontWeight: 'bold'}}>{totalProducoesKg.toString().replace('.',',')}Kg</Text></Text>
            </View>
            <View>
                <Text>TOTAL PRODUÇÃO (R$): <Text style={{fontWeight: 'bold'}}>R$ {totalProducoesRS.toFixed(2).toString().replace('.',',')}</Text></Text>
            </View>
        </View>

	);
}

export default ResumoProducao;
