import axios from 'axios'
import {actionTypes, mutationTypes} from '@/commons/constants'

export default {

    async [actionTypes.ATUALIZAR_BEM_CONSUMO](context, bemConsumo) {
        return await axios.put(`todo/${bemConsumo.id}`, bemConsumo)
    },

    async [actionTypes.BUSCAR_BEM_CONSUMO]({commit}) {
        const {data} = await axios.get('todo/')
        commit(mutationTypes.SET_BEM_CONSUMO, data)
    },

    async [actionTypes.INSERIR_BEM_CONSUMO](context, item) {
         return await axios.post('todo/', item)
    },

    async [actionTypes.REMOVER_BEM_CONSUMO](context, bemConsumoId) {
        return await axios.delete(`todo/${bemConsumoId}`)
    }

}
