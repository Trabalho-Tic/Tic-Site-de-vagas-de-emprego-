import React from "react";
import { UserPlus, Search, FileCheck, Rocket } from "lucide-react";

function CardLanding({ step, index }) {
    return (
        <div
              key={index}
              className="p-8 border border-gray-300 rounded-2xl text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-card border-border"
        >
            <div className="mb-6 relative">
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-green-400 to-green-300 flex items-center justify-center shadow-soft">
                    <step.icon className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-green-400 text-white flex items-center justify-center font-bold text-sm shadow-soft">
                    {index + 1}
                </div>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-foreground">
                {step.title}
            </h3>
            <p className="text-gray-500 leading-relaxed">
                {step.description}
            </p>
        </div>
    )
}

export default CardLanding