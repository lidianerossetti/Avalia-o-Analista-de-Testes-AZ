import axios from 'axios'
import {actionTypes, mutationTypes} from '@/commons/constants'

export default {

    async [actionTypes.ATUALIZAR_BEM_CONSUMO](context, bemConsumo) {
        return await axios.put(`bem-consumo/${bemConsumo.id}`, bemConsumo)
    },

    async [actionTypes.BUSCAR_BENS_CONSUMO]({commit}) {
        const {data} = await axios.get('bem-consumo/')
        commit(mutationTypes.SET_BENS_CONSUMO, data)
    },

    async [actionTypes.INSERIR_BEM_CONSUMO](context, bemConsumo) {
        return await axios.post('bem-consumo/', bemConsumo)
    },

    async [actionTypes.REMOVER_BEM_CONSUMO](context, bemConsumoId) {
        return await axios.delete(`bem-consumo/${bemConsumoId}`)
    }

}
