import React from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import hero from "../assets/hero-jobs.jpg"
import { HeartHandshake, Shield, Zap, Award, Users, Heart, UserPlus, Building2, Search, FileCheck, Rocket, Briefcase, Code, Palette, TrendingUp } from "lucide-react";
import CardLanding from "../components/CardLanding";

const steps = [
  {
    icon: UserPlus,
    title: "Crie seu perfil",
    description: "Cadastre-se gratuitamente e construa seu perfil profissional completo.",
  },
  {
    icon: Search,
    title: "Busque vagas",
    description: "Explore milhares de oportunidades filtradas por área, localização e salário.",
  },
  {
    icon: FileCheck,
    title: "Candidate-se",
    description: "Envie sua candidatura com um clique e acompanhe o status em tempo real.",
  },
  {
    icon: Rocket,
    title: "Decole na carreira",
    description: "Conecte-se com empresas incríveis e conquiste a vaga dos seus sonhos.",
  },
];

const categories = [
  {
    icon: Code,
    name: "Tecnologia",
  },
  {
    icon: Palette,
    name: "Design",
  },
  {
    icon: TrendingUp,
    name: "Marketing",
  },
  {
    icon: Users,
    name: "Recursos Humanos",
  },
  {
    icon: Heart,
    name: "Saúde",
  },
  {
    icon: Building2,
    name: "Administração",
  },
];

const features = [
  {
    icon: Shield,
    title: "100% Gratuito",
    description: "Cadastro e candidaturas completamente grátis para candidatos.",
  },
  {
    icon: Zap,
    title: "Candidatura Rápida",
    description: "Aplique para várias vagas com apenas um clique.",
  },
  {
    icon: Award,
    title: "Empresas Verificadas",
    description: "Todas as empresas são verificadas pela nossa equipe.",
  },
  {
    icon: HeartHandshake,
    title: "Suporte Dedicado",
    description: "Nossa equipe está aqui para ajudar em cada etapa.",
  },
];

function LandingPage() {
    return (
        <>
            <Header />
            <section className="flex px-20 pt-20 pb-30 items-center gap-20">
                <div className="flex flex-col gap-10">
                    <h1 className="text-6xl font-bold">Encontre sua proxima <span className="text-green-400">oportunidade</span></h1>
                    <p className="text-xl font-semibold text-gray-600">Conectamos talentos com as melhores empresas. Milhares de vagas atualizadas diariamente para impulsionar sua carreira.</p>
                    <div className="flex items-center gap-10">
                        <Link className="flex gap-3 px-10 py-4 text-white rounded-2xl text-sm font-bold bg-gradient-to-r from-green-400 to-green-300 transition-all duration-300 hover:-translate-y-1"><Search className="w-5" />Buscar Vagas</Link>
                        <Link className="flex gap-3 px-10 py-4 text-white rounded-2xl text-sm font-bold bg-gradient-to-r from-green-400 to-green-300 transition-all duration-300 hover:-translate-y-1"><Briefcase className="w-5"/>Para Empresas</Link>
                    </div>
                </div>
                <div>
                    <img className="w-270 rounded-2xl shadow-2xl" src={hero} alt="" />
                </div>
            </section>
            <section className="pb-30">
                <div className="text-center mb-16">
                    <h1 className="text-4xl lg:text-5xl mb-4 font-bold">Como funciona</h1>
                    <p className="text-xl text-gray-600 max-w-2xl font-semibold mx-auto">Apenas 4 passos simples para encontrar a vaga perfeita</p>
                </div>
                <div className="grid md:grid-cols-4 gap-5 px-20">
                    {
                        steps.map((step, index) => (
                            <CardLanding step={step} index={index} />
                        ))
                    }
                </div>
            </section>
            <section className="pb-30">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16 animate-fade-in">
                        <h2 className="text-4xl lg:text-5xl mb-4 font-bold">
                            Explore por categoria
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl font-semibold mx-auto">
                            Encontre oportunidades na sua área de atuação
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                        {categories.map((category, index) => (
                            <div
                            key={index}
                            className="p-6 hover:shadow-2xl transition-all rounded-2xl duration-300 cursor-pointer group border border-gray-300 hover:border-green-400"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <category.icon className={`w-7 h-7 text-green-400`} />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-lg mb-1 group-hover:text-green-400 transition-colors">
                                            {category.name}
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section className="pb-30">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16 animate-fade-in">
                        <h2 className="text-4xl lg:text-5xl mb-4 font-bold">
                            Por que escolher nossa plataforma?
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl font-semibold mx-auto">
                            A melhor experiência para candidatos e empresas
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div
                            key={index}
                            className="text-center group"
                            >
                                <div className="mb-6">
                                    <div className="w-20 h-20 mx-auto rounded-2xl bg-green-300 flex items-center justify-center group-hover:bg-green-400 group-hover:scale-110 transition-all duration-300 shadow-xl">
                                        <feature.icon className="w-10 h-10 text-primary transition-colors" />
                                    </div>
                                </div>
                                <h3 className="text-xl font-semibold mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default LandingPage