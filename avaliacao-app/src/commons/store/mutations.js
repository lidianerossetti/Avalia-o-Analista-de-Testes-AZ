import Vue from 'vue'
import {mutationTypes} from '../constants'

export default {

    [mutationTypes.SET_BEM_CONSUMO](state, novosBemConsumo) {
        Vue.set(state, 'listaBemConsumo', novosBemConsumo)
    }
}
