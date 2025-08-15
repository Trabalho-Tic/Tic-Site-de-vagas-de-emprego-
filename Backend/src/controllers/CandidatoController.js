// const Candidato = require('../models/Candidato');
// class CandidatoController {

//     async index(request, response) {
//         try {
//             const candidatos = await Candidato.findAll();
//             return response.json(candidatos);
//         } catch (error) {
//             return response.status(500).json({ error: "Erro ao buscar Candidatos" })
//         }
//     }

//     async show(request, response) {
//         const { id } = request.params
//         try {
//             const candidato = await Candidato.findByPk(id)
//             if (!candidato) {
//                 return response.status(404).json({ error: "Candidato não encontrado" })
//             }
//             return response.json(candidato)
//         } catch (error) {
//             return response.status(500).json({ error: "Erro ao buscar por Candidato"})
//         }
//     }

//     async create(request, response) {
//         try {
//             const candidato = await Candidato.create(request.body)
//             return response.json(candidato)
//         } catch (error) {
//             return response.status(500).json({ error: "Erro ao criar Candidato"})
//         }
//     }
    
//     async update(request, response) {
//         const { id } = request.params
//         try {
//             const candidato = await Candidato.findByPk(id)
//             if (!candidato) {
//                 return response.status(404).json({ error: "Candidato não encontrado"})
//             }
//             await candidato.update(request.body)
//             return response.json(candidato)
//         } catch (error) {
//             return response.status(500).json({ error: "Erro ao atualizar Candidato"})
//         }
//     }
    
//     async delete(request, response) {
//         const { id } = request.params
//         try {
//             const candidato = await Candidato.findByPk(id);
//             if (!candidato) {
//                 return response.status(404).json({ error: 'Candidato não encontrado.' });
//             }
//             await candidato.destroy();
//             return response.status(204).send();
//         } catch (error) {
//             return res.status(500).json({ error: 'Erro ao deletar Candidato.' });
//         }
//     }
// }

// module.exports = new CandidatoController()
 