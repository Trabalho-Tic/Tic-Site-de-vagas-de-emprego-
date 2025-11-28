import React, { useState, useEffect } from "react";
import useApi from "../../api/Api";
import Checkbox from "../../components/Checkbox";
import { NavLink } from "react-router-dom"

function Vinculo() {
    const [tipoDeficiencia, setTipoDeficiencia] = useState("")
    const [tipoDeficiencias, setTipoDeficiencias] = useState([])
    const [tipoDeficienciasSelecionada, setTipoDeficienciaSelecionada] = useState("")

    const [subTipoDeficiencia, setSubTipoDeficiencia] = useState("")
    const [subTipoDeficiencias, setSubTipoDeficiencias] = useState([])
    const [subTipoDeficienciaSelecionada, setSubTipoDeficienciaSelecionada] = useState("")

    const [barreira, setBarreira] = useState("")
    const [barreiras, setBarreiras] = useState([])
    const [barreiraSelecionada, setBarreiraSelecionada] = useState("")

    const [acessibilidade, setAcessibilidade] = useState("")
    const [acessibilidades, setAcessibilidades] = useState([])
    const [acessibilidadeSelecionada, setAcessibilidadeSelecionada] = useState("")

    const [update, setUpdate] = useState(0)
    const [aba, setAba] = useState("tipo")

    useEffect(() => {
        async function fetchAll() {
            try {
                const tipodeficiencia = await useApi({
                    endpoint: "/tipoDeficiencia"
                })

                setTipoDeficiencias(tipodeficiencia)
                
                const subTipoDeficiencias = await useApi({
                    endpoint: "/subTipoDeficiencia"
                })

                setSubTipoDeficiencias(subTipoDeficiencias)
                
                const barreiras = await useApi({
                    endpoint: "/barreira"
                })

                setBarreiras(barreiras)
                
                const acessibilidades = await useApi({
                    endpoint: "/acessibilidade"
                })

                setAcessibilidades(acessibilidades)

            } catch (error) {
                console.error(error)
            }
        }

        fetchAll()
    }, [update])

    async function handleTipoDeficiencia(e) {
        e.preventDefault()

        await useApi({
            endpoint: "/TipoDeficiencia/create",
            method: "POST",
            body: {nome: tipoDeficiencia}
        })

        setTipoDeficiencia("")    
        
        setUpdate(prev => prev + 1)
    }

    async function handleSubtipoDeficiencia(e) {
        e.preventDefault()

        await useApi({
            endpoint: "/SubTipoDeficiencia/create",
            method: "POST",
            body: {nome: subTipoDeficiencia}
        })

        setSubTipoDeficiencia("")    
        
        setUpdate(prev => prev + 1)
    }

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
    
    async function handleAcessibilidade(e) {
        e.preventDefault()

        await useApi({
            endpoint: "/acessibilidade/create",
            method: "POST",
            body: {descricao: acessibilidade}
        })

        setAcessibilidade("")    
        
        setUpdate(prev => prev + 1)
    }

    async function linkTipoComSubtipo(e) {
        e.preventDefault()

        await useApi({
            endpoint: ""
        })
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
                <nav className="flex justify-around">
                    <NavLink
                        onClick={() => setAba("tipo")}
                        className={() =>
                            `flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 ${
                                aba === "tipo" ? "bg-indigo-50 text-indigo-600 font-semibold" : ""
                            }`
                        }
                    >
                        Tipo Deficiencia
                    </NavLink>
                    <NavLink
                        onClick={() => setAba("subtipo")}
                        className={() =>
                            `flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 ${
                                aba === "subtipo" ? "bg-indigo-50 text-indigo-600 font-semibold" : ""
                            }`
                        }
                    >
                        Sub Tipo Deficiencia
                    </NavLink>
                    <NavLink
                        onClick={() => setAba("barreira")}
                        className={() =>
                            `flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 ${
                                aba === "barreira" ? "bg-indigo-50 text-indigo-600 font-semibold" : ""
                            }`
                        }
                    >
                        Barreira
                    </NavLink>
                    <NavLink
                        onClick={() => setAba("acessibilidade")}
                        className={() =>
                            `flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 ${
                                aba === "acessibilidade" ? "bg-indigo-50 text-indigo-600 font-semibold" : ""
                            }`
                        }
                    >
                        Acessibilidade
                    </NavLink>
                </nav>
            </div>

            {aba === "tipo" && (
                <>
                    <div className="bg-white p-6 rounded-lg shadow-sm mb-8 border border-gray-200">
                        <h2 className="text-xl font-semibold mb-3">Tipo Deficiencia</h2>
                        <div className="flex flex-col gap-2">
                            <p>Adicione um Tipo de Deficiência:</p>
                            <div className="flex gap-5">
                                <input type="text" value={tipoDeficiencia} onChange={(e) => setTipoDeficiencia(e.target.value)} className="w-full bg-gray-100 border-none rounded-md pl-10 pr-4 py-2 focus:ring-2 focus:ring-indigo-500" />
                                <button onClick={(event) => handleTipoDeficiencia(event)} className="bg-indigo-600 text-white px-8 py-4 rounded-md flex items-center gap-2 transition-all duration-300 hover:bg-indigo-500">Criar</button>
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
                                <input type="text" value={subTipoDeficiencia} onChange={(e) => setSubTipoDeficiencia(e.target.value)} className="w-full bg-gray-100 border-none rounded-md pl-10 pr-4 py-2 focus:ring-2 focus:ring-indigo-500" />
                                <button onClick={(event) => handleSubtipoDeficiencia(event)} className="bg-indigo-600 text-white px-8 py-4 rounded-md flex items-center gap-2 transition-all duration-300 hover:bg-indigo-500">Criar</button>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-4 gap-5 bg-white p-6 rounded-lg shadow-sm mb-8 border border-gray-200">
                        {
                            subTipoDeficiencias?.map((subDeficiencia) => (
                                <div className="flex gap-2 items-center">
                                    <Checkbox 
                                        label={subDeficiencia.nome}
                                        onChange={() => setSubTipoDeficienciaSelecionada(subDeficiencia.nome)}
                                    />
                                </div>
                            ))
                        }
                    </div>

                    <button className="bg-indigo-600 w-full text-white px-8 py-4 rounded-md flex items-center gap-2 transition-all duration-300 hover:bg-indigo-500">Vincular</button>
                </>
            )}
            
            {aba === "subtipo" && (
                <>

                    <div className="bg-white p-6 rounded-lg shadow-sm mb-8 border border-gray-200">
                        <h2 className="text-xl font-semibold mb-3">Sub Tipo Deficiencia</h2>
                        <div className="flex flex-col gap-2">
                            <p>Adicione um Sub Tipo de Deficiência:</p>
                            <div className="flex gap-5">
                                <input type="text" value={subTipoDeficiencia} onChange={(e) => setSubTipoDeficiencia(e.target.value)} className="w-full bg-gray-100 border-none rounded-md pl-10 pr-4 py-2 focus:ring-2 focus:ring-indigo-500" />
                                <button onClick={(event) => handleSubtipoDeficiencia(event)} className="bg-indigo-600 text-white px-8 py-4 rounded-md flex items-center gap-2 transition-all duration-300 hover:bg-indigo-500">Criar</button>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-4 gap-5 bg-white p-6 rounded-lg shadow-sm mb-8 border border-gray-200">
                        {
                            subTipoDeficiencias?.map((subDeficiencia) => (
                                <div className="flex gap-2 items-center">
                                    <Checkbox 
                                        label={subDeficiencia.nome}
                                        checked={subTipoDeficienciaSelecionada === subDeficiencia.nome}
                                        onChange={() => setSubTipoDeficienciaSelecionada(subDeficiencia.nome)}
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
                                <button onClick={(event) => handleBarreira(event)} className="bg-indigo-600 text-white px-8 py-4 rounded-md flex items-center gap-2 transition-all duration-300 hover:bg-indigo-500">Criar</button>
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

                    <button className="bg-indigo-600 w-full text-white px-8 py-4 rounded-md flex items-center gap-2 transition-all duration-300 hover:bg-indigo-500">Vincular</button>
                </>
            )}

            {aba === "barreira" && (
                <>

                    <div className="bg-white p-6 rounded-lg shadow-sm mb-8 border border-gray-200">
                        <h2 className="text-xl font-semibold mb-3">Barreira</h2>
                        <div className="flex flex-col gap-2">
                            <p>Adicione uma Barreira:</p>
                            <div className="flex gap-5">
                                <input type="text" value={barreira} onChange={(e) => setBarreira(e.target.value)} className="w-full bg-gray-100 border-none rounded-md pl-10 pr-4 py-2 focus:ring-2 focus:ring-indigo-500" />
                                <button onClick={(event) => handleBarreira(event)} className="bg-indigo-600 text-white px-8 py-4 rounded-md flex items-center gap-2 transition-all duration-300 hover:bg-indigo-500">Criar</button>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-4 gap-5 bg-white p-6 rounded-lg shadow-sm mb-8 border border-gray-200">
                        {
                            barreiras?.map((barreira) => (
                                <div className="flex gap-2 items-center">
                                    <Checkbox 
                                        label={barreira.descricao}
                                        checked={barreiraSelecionada === barreira.descricao}
                                        onChange={() => setBarreiraSelecionada(barreira.descricao)}
                                    />
                                </div>
                            ))
                        }
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm mb-8 border border-gray-200">
                        <h2 className="text-xl font-semibold mb-3">Acesibilidade</h2>
                        <div className="flex flex-col gap-2">
                            <p>Adicione uma  Acessibilidade:</p>
                            <div className="flex gap-5">
                                <input type="text" value={acessibilidade} onChange={(e) => setAcessibilidade(e.target.value)} className="w-full bg-gray-100 border-none rounded-md pl-10 pr-4 py-2 focus:ring-2 focus:ring-indigo-500" />
                                <button onClick={(event) => handleAcessibilidade(event)} className="bg-indigo-600 text-white px-8 py-4 rounded-md flex items-center gap-2 transition-all duration-300 hover:bg-indigo-500">Criar</button>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-4 gap-5 bg-white p-6 rounded-lg shadow-sm mb-8 border border-gray-200">
                        {
                            acessibilidades?.map((acessibilidade) => (
                                <div className="flex gap-2 items-center">
                                    <Checkbox 
                                        label={acessibilidade.descricao}
                                        onChange={() => setAcessibilidadeSelecionada(acessibilidade.descricao)}
                                    />
                                </div>
                            ))
                        }
                    </div>

                    <button className="bg-indigo-600 w-full text-white px-8 py-4 rounded-md flex items-center gap-2 transition-all duration-300 hover:bg-indigo-500">Vincular</button>
                </>
            )}
            
            {aba === "acessibilidade" && (
                <>
                    <div className="bg-white p-6 rounded-lg shadow-sm mb-8 border border-gray-200">
                        <h2 className="text-xl font-semibold mb-3">Acesibilidade</h2>
                        <div className="flex flex-col gap-2">
                            <p>Adicione uma  Acessibilidade:</p>
                            <div className="flex gap-5">
                                <input type="text" value={acessibilidade} onChange={(e) => setAcessibilidade(e.target.value)} className="w-full bg-gray-100 border-none rounded-md pl-10 pr-4 py-2 focus:ring-2 focus:ring-indigo-500" />
                                <button onClick={(event) => handleAcessibilidade(event)} className="bg-indigo-600 text-white px-8 py-4 rounded-md flex items-center gap-2 transition-all duration-300 hover:bg-indigo-500">Criar</button>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-4 gap-5 bg-white p-6 rounded-lg shadow-sm mb-8 border border-gray-200">
                        {
                            acessibilidades?.map((acessibilidade) => (
                                <div className="flex gap-2 items-center">
                                    <Checkbox 
                                        label={acessibilidade.descricao}
                                        onChange={() => setAcessibilidadeSelecionada(acessibilidade.descricao)}
                                    />
                                </div>
                            ))
                        }
                    </div>
                </>
            )}
        </>
    )
}

export default Vinculo