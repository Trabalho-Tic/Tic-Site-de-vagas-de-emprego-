import React from "react";
import Header from "../components/Header";
import capa from "../assets/image.png"
import Footer from "../components/Footer";

function About() {

    return (
        <>
            <Header />

            <section className="w-full py-20">
                <img className="w-full" src={capa} alt="" />

                <div className="flex flex-col gap-5 justify-center items-center pt-20 px-100">
                    <h1 className="text-5xl font-semibold">Sobre Nós</h1>
                    <p className="text-xl font-medium text-center">Bem-vindo ao JobForAll, uma comunidade vibrante dedicada a ajudar profissionais juniores da área criativa a encontrarem seus empregos dos sonhos. Conecte-se com empregadores, destaque seus talentos e dê o próximo passo em sua jornada profissional conosco. Junte-se hoje à nossa rede de pessoas talentosas e empresas inovadoras.</p>
                </div>
                
                <div className="flex flex-col gap-5 justify-center items-center pt-20 px-100">
                    <h1 className="text-3xl font-semibold">Visão</h1>
                    <p className="text-xl font-medium text-center">Nossa visão é criar oportunidades econômicas globais sem precedentes para profissionais criativos juniores, incluindo Pessoas com Deficiência (PCD), promovendo autonomia e equidade no acesso ao mercado de trabalho.</p>
                    <p className="text-xl font-medium text-center">O JobForAll incorpora acessibilidade como premissa da plataforma — com suporte a leitores de tela, feedback de foco visual estruturado — promovendo autonomia, desenvolvimento de carreira e participação plena no mercado de trabalho e na força de trabalho global.</p>
                </div>
                
                <div className="flex flex-col gap-5 justify-center items-center pt-20 px-100">
                    <h1 className="text-3xl font-semibold">Missão</h1>
                    <p className="text-xl font-medium text-center">Nossa missão é simples: conectar profissionais criativos juniores, incluindo Pessoas com Deficiência (PCD), a oportunidades que inspirem crescimento, com desenvolvimento de carreira inclusivo, autônomo e sem barreiras.</p>
                </div>
                
                <div className="flex flex-col gap-5 justify-center items-center pt-20 px-100">
                    <h1 className="text-3xl font-semibold">Quem está conosco?</h1>
                    <p className="text-xl font-medium text-center">O JobForAll nasceu como uma ideia em 2025, motivado pela necessidade de ampliar a empregabilidade de profissionais criativos juniores, tendo a acessibilidade digital para Pessoas com Deficiência (PCD) como pilar central.</p>
                    <p className="text-xl font-medium text-center">O projeto é conduzido em parceria com a Ordem dos Advogados do Brasil (OAB) – subseção de Franca, que está à frente da iniciativa, e com o nosso centro universitário UNIFACEF, integrando apoio acadêmico da faculdade e compromisso institucional com inclusão social, ética profissional e ausência de barreiras nos processos seletivos.</p>
                    <p className="text-xl font-medium text-center">Sob sua governança institucional e acadêmica, o JobForAll amplia seu impacto ao oferecer vagas acessíveis, recursos estruturados de carreira e redes de conexão profissional, com fluxos compatíveis, promovendo a participação plena de pessoas PCD no workforce criativo e na economia global.</p>
                </div>
                
            </section>

            <Footer />
        </>
    )

}

export default About