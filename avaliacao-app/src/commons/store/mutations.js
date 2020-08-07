import Vue from 'vue'
import {mutationTypes} from '../constants'

export default {

    [mutationTypes.SET_BENS_CONSUMO](state, bensConsumo) {
        Vue.set(state, 'bensConsumo', bensConsumo)
    }
}
