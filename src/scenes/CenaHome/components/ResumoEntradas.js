import React, { useState, useEffect } from 'react';
import {
	View
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Text } from 'react-native-elements';

const ResumoEntradas = (props) => {
	const dispatch = useDispatch();

    const entradas = useSelector(state => state.appReducer.entradas);
	const [totalEntradasKg, setTotalEntradasKg] = useState(0);
	const [totalEntradasRS, setTotalEntradasRS] = useState(0);

    const saidas = useSelector(state => state.appReducer.saidas);    
	const [totalSaidasKg, setTotalSaidasKg] = useState(0);
	const [totalSaidasRS, setTotalSaidasRS] = useState(0);


    const goodPrimeValue = props.goodPrimeValue;
    const goodSecondValue = props.goodSecondValue;
    const goodBoneAndSkinValue = props.goodBoneAndSkinValue;

    const expectedYields = props.expectedYields;
    
    useEffect(() => {

        if ( entradas && entradas.length > 0 ) {
            let total_kg = 0;
            let sum_rs_entradas = 0;
            entradas.map((entrada)=>{
                let boneAndSkinKg = entrada.boneAndSkinKg;
                let primeMeatKg = entrada.primeMeatKg;
                let secondMeatKg = entrada.secondMeatKg;
                
                boneAndSkinKg = boneAndSkinKg.replace(',','.');
                primeMeatKg = primeMeatKg.replace(',','.');
                secondMeatKg = secondMeatKg.replace(',','.');

                total_kg += parseFloat(boneAndSkinKg) + parseFloat(primeMeatKg) + parseFloat(secondMeatKg);
                sum_rs_entradas += (parseFloat(primeMeatKg) * goodPrimeValue) + (parseFloat(secondMeatKg) * goodSecondValue) + (parseFloat(boneAndSkinKg) * goodBoneAndSkinValue);
            })

            setTotalEntradasRS(sum_rs_entradas);
            setTotalEntradasKg(total_kg);

        } else {

            setTotalEntradasRS(0);
            setTotalEntradasKg(0);

        }

    }, [entradas, goodPrimeValue, goodSecondValue, goodBoneAndSkinValue]);

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
        <>
            <View style={{ paddingHorizontal: 16, paddingTop: 16, flexDirection: 'row', paddingBottom: 16 }}>
                <View style={{flex: 1}}>
                    <View>
                        <Text style={{fontSize: 11}}>ENT. (KG): <Text style={{fontWeight: 'bold'}}>{totalEntradasKg.toString().replace('.',',')}Kg</Text></Text>
                    </View>
                    <View>
                        <Text style={{fontSize: 11}}>ENT. (R$): <Text style={{fontWeight: 'bold'}}>R$ {totalEntradasRS.toFixed(2).toString().replace('.',',')}</Text></Text>
                    </View>
                </View>

                <View style={{flex: 1, borderLeftWidth: 1, borderRightWidth: 1, paddingLeft: 16 }}>
                    <View>
                        <Text style={{fontSize: 11}}>SAÍD. (KG): <Text style={{fontWeight: 'bold'}}>{totalSaidasKg.toString().replace('.',',')}Kg</Text></Text>
                    </View>
                    <View>
                        <Text style={{fontSize: 11}}>SAÍd. (R$): <Text style={{fontWeight: 'bold'}}>R$ {totalSaidasRS.toFixed(2).toString().replace('.',',')}</Text></Text>
                    </View>
                </View>

                <View style={{flex: 1, paddingLeft: 16}}>
                    <View>
                        <Text style={{fontSize: 11}}>DIF. (KG): <Text style={{fontWeight: 'bold'}}>{(totalSaidasKg-totalEntradasKg).toFixed(2).toString().replace('.',',')}Kg</Text></Text>
                    </View>
                    <View>
                        <Text style={{fontSize: 11}}>DIF. (R$): <Text style={{fontWeight: 'bold'}}>R$ {(totalSaidasRS-totalEntradasRS).toFixed(2).toString().replace('.',',')}</Text></Text>
                    </View>
                </View>
            </View>
        </>

	);
}

export default ResumoEntradas;
