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

	const [totalOrcadoPrime, setTotalOrcadoPrime] = useState(0);
	const [totalOrcadoSecond, setTotalOrcadoSecond] = useState(0);
	const [totalOrcadoBonesAndSkin, setTotalOrcadoBonesAndSkin] = useState(0);

    const goodPrimeValue = props.goodPrimeValue;
    const goodSecondValue = props.goodSecondValue;
    const goodBoneAndSkinValue = props.goodBoneAndSkinValue;

    const goodPrimeCode = props.goodPrimeCode;
    const goodSecondCode = props.goodSecondCode;
    const goodBoneAndSkinCode = props.goodBoneAndSkinCode;

    const totalPrimeMeatKg = props.totalPrimeMeatKg;
    const totalSecondMeatKg = props.totalSecondMeatKg;
    const totalBoneAndSkinKg = props.totalBoneAndSkinKg;

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

        }

    }, [saidas]);

    useEffect(() => {

        if ( saidas.length > 0 && expectedYields.length > 0 ) {

            let kg_orcado_prime = 0;
            let kg_orcado_second = 0;
            let kg_orcado_bones_and_skin = 0;

            saidas.map((saida)=>{
                const expected_yield = expectedYields.filter((ey)=>{
                    return parseFloat(saida.good.cd_codigoint) === parseFloat(ey.good_code);
                });

                if ( expected_yield.length > 0 ) {

                    const kg_orcado = parseFloat(saida.kg);

                    kg_orcado_prime += kg_orcado * (parseFloat(expected_yield[0].prime) / 100);
                    kg_orcado_second += kg_orcado * (parseFloat(expected_yield[0].second) / 100);
                    kg_orcado_bones_and_skin += kg_orcado * (parseFloat(expected_yield[0].bones_skin) / 100);

                }
            });

            setTotalOrcadoPrime(kg_orcado_prime);
            setTotalOrcadoSecond(kg_orcado_second);
            setTotalOrcadoBonesAndSkin(kg_orcado_bones_and_skin);

        }

    }, [saidas, expectedYields]);

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

            <View style={{ paddingHorizontal: 16, paddingTop: 16, backgroundColor: '#FFF', paddingBottom: 16 }}>

                <View style={{flexDirection: 'row'}}>
                    <View style={{width: '20%'}}></View>
                    <View style={{width: '20%'}}></View>
                    <View style={{width: '20%'}}><Text style={{fontSize: 11, fontWeight: 'bold'}}>{goodPrimeCode}</Text></View>
                    <View style={{width: '20%'}}><Text style={{fontSize: 11, fontWeight: 'bold'}}>{goodSecondCode}</Text></View>
                    <View style={{width: '20%'}}><Text style={{fontSize: 11, fontWeight: 'bold'}}>{goodBoneAndSkinCode}</Text></View>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <View style={{width: '20%'}}>
                        <Text style={{fontSize: 11}}>Projetado</Text>
                    </View>
                    <View style={{width: '20%'}}><Text style={{fontSize: 11}}>{totalSaidasKg.toFixed(2).toString().replace('.',',')} kg</Text></View>
                    <View style={{width: '20%'}}><Text style={{fontSize: 11}}>{totalOrcadoPrime.toFixed(2).toString().replace('.',',')} kg</Text></View>
                    <View style={{width: '20%'}}><Text style={{fontSize: 11}}>{totalOrcadoSecond.toFixed(2).toString().replace('.',',')} kg</Text></View>
                    <View style={{width: '20%'}}><Text style={{fontSize: 11}}>{totalOrcadoBonesAndSkin.toFixed(2).toString().replace('.',',')} kg</Text></View>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <View style={{width: '20%'}}>
                        <Text style={{fontSize: 11}}>Realizado</Text>
                    </View>
                    <View style={{width: '20%'}}><Text style={{fontSize: 11}}>{totalEntradasKg.toFixed(2).toString().replace('.',',')} kg</Text></View>
                    <View style={{width: '20%'}}><Text style={{fontSize: 11}}>{totalPrimeMeatKg.toFixed(2).toString().replace('.',',')} kg</Text></View>
                    <View style={{width: '20%'}}><Text style={{fontSize: 11}}>{totalSecondMeatKg.toFixed(2).toString().replace('.',',')} kg</Text></View>
                    <View style={{width: '20%'}}><Text style={{fontSize: 11}}>{totalBoneAndSkinKg.toFixed(2).toString().replace('.',',')} kg</Text></View>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <View style={{width: '20%'}}>
                        <Text style={{fontSize: 11}}>
                            Diferença
                        </Text>
                    </View>   
                    <View style={{width: '20%'}}><Text style={{fontSize: 11}}>{(totalSaidasKg-totalEntradasKg).toFixed(2).toString().replace('.',',')} kg</Text></View>
                    <View style={{width: '20%'}}><Text style={{fontSize: 11}}>{(totalOrcadoPrime-totalPrimeMeatKg).toFixed(2).toString().replace('.',',')} kg</Text></View>
                    <View style={{width: '20%'}}><Text style={{fontSize: 11}}>{(totalOrcadoSecond-totalSecondMeatKg).toFixed(2).toString().replace('.',',')} kg</Text></View>
                    <View style={{width: '20%'}}><Text style={{fontSize: 11}}>{(totalOrcadoBonesAndSkin-totalBoneAndSkinKg).toFixed(2).toString().replace('.',',')} kg</Text></View>
       
                </View>
            </View>
        </>

	);
}

export default ResumoEntradas;
