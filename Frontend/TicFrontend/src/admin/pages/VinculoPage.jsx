import React, { useState, useEffect } from "react";
import useApi from "../../api/Api";
import Checkbox from "../../components/Checkbox";

function Vinculo() {
    const [tipoDeficiencias, setTipoDeficiencias] = useState([])
    const [tipoDeficienciasSelecionada, setTipoDeficienciaSelecionada] = useState(null)
    const [subTipoDeficiencias, setSubTipoDeficiencias] = useState([])
    const [barreira, setBarreira] = useState("")
    const [barreiras, setBarreiras] = useState([])
    const [acessibilidades, setAcessibilidades] = useState([])

    const [update, setUpdate] = useState(0)

    useEffect(() => {
        async function fetchAll() {
            try {
                const tipodeficiencia = await useApi({
                    endpoint: "/tipoDeficiencia"
                })
    
                if (!tipodeficiencia) {
                    console.log("Nenhum tipo deficiencia extraido")
                }

                setTipoDeficiencias(tipodeficiencia)
                
                const subTipoDeficiencias = await useApi({
                    endpoint: "/subTipoDeficiencia"
                })
    
                if (!subTipoDeficiencias) {
                    console.log("Nenhum tipo deficiencia extraido")
                }

                setSubTipoDeficiencias(subTipoDeficiencias)
                
                const barreiras = await useApi({
                    endpoint: "/barreira"
                })
    
                if (!barreiras) {
                    console.log("Nenhum tipo deficiencia extraido")
                }

                console.log(barreiras)

                setBarreiras(barreiras)

            } catch (error) {
                console.error(error)
            }
        }

        fetchAll()
    }, [update])

    async function handleBarreira(e) {
        e.preventDefault()

        await useApi({
            endpoint: "/barreira/create",
            method: "POST",
            body: {descricao: barreira}
        })

        setBarreira("")    
        
        setUpdate(prev => prev + 1)
    }

    return (
        <>
            <div className="flex flex-col mb-8">
                <h2 className="text-2xl font-bold">Gerenciamento de Vinculos</h2>
                <p className="text-gray-600 text-sm">
                    Crie e Vincule Tipo deficiencias com seus subtipos...
                </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm mb-8 border border-gray-200">
                <h2 className="text-xl font-semibold mb-3">Tipo Deficiencia</h2>
                <div className="flex flex-col gap-2">
                    <p>Adicione um Tipo de Deficiência:</p>
                    <div className="flex gap-5">
                        <input type="text" className="w-full bg-gray-100 border-none rounded-md pl-10 pr-4 py-2 focus:ring-2 focus:ring-indigo-500" />
                        <button className="bg-indigo-600 text-white px-8 py-4 rounded-md flex items-center gap-2 hover:bg-indigo-500">Criar</button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-4 gap-5 bg-white p-6 rounded-lg shadow-sm mb-8 border border-gray-200">
                {
                    tipoDeficiencias?.map((deficiencia) => (
                        <div className="flex gap-2 items-center">
                            <Checkbox 
                                label={deficiencia.nome}
                                checked={tipoDeficienciasSelecionada === deficiencia.nome}
                                onChange={() => setTipoDeficienciaSelecionada(deficiencia.nome)}
                            />
                        </div>
                    ))
                }
            </div>


            <div className="bg-white p-6 rounded-lg shadow-sm mb-8 border border-gray-200">
                <h2 className="text-xl font-semibold mb-3">Sub Tipo Deficiencia</h2>
                <div className="flex flex-col gap-2">
                    <p>Adicione um Sub Tipo de Deficiência:</p>
                    <div className="flex gap-5">
                        <input type="text" className="w-full bg-gray-100 border-none rounded-md pl-10 pr-4 py-2 focus:ring-2 focus:ring-indigo-500" />
                        <button className="bg-indigo-600 text-white px-8 py-4 rounded-md flex items-center gap-2 hover:bg-indigo-500">Criar</button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-4 gap-5 bg-white p-6 rounded-lg shadow-sm mb-8 border border-gray-200">
                {
                    subTipoDeficiencias?.map((subDeficiencia) => (
                        <div className="flex gap-2 items-center">
                            <Checkbox 
                                label={subDeficiencia.nome}
                                onChange={() => setTipoDeficienciaSelecionada(subDeficiencia.nome)}
                            />
                        </div>
                    ))
                }
            </div>
            
            
            <div className="bg-white p-6 rounded-lg shadow-sm mb-8 border border-gray-200">
                <h2 className="text-xl font-semibold mb-3">Barreira</h2>
                <div className="flex flex-col gap-2">
                    <p>Adicione uma  Barreira:</p>
                    <div className="flex gap-5">
                        <input type="text" value={barreira} onChange={(e) => setBarreira(e.target.value)} className="w-full bg-gray-100 border-none rounded-md pl-10 pr-4 py-2 focus:ring-2 focus:ring-indigo-500" />
                        <button onClick={() => handleBarreira(event)} className="bg-indigo-600 text-white px-8 py-4 rounded-md flex items-center gap-2 hover:bg-indigo-500">Criar</button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-4 gap-5 bg-white p-6 rounded-lg shadow-sm mb-8 border border-gray-200">
                {
                    barreiras?.map((barreira) => (
                        <div className="flex gap-2 items-center">
                            <Checkbox 
                                label={barreira.descricao}
                                onChange={() => setTipoDeficienciaSelecionada(barreira.nome)}
                            />
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default Vinculo