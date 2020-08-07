<template>
  <div>

    <h4 style="color: #555">Almoxarifado</h4>
    <h3 style="color: #555; margin-bottom: 10px">CADASTRO DE BEM MATERIAL</h3>

    <div class="formulario">
      <v-form>
        <h4 style="color: #555;">Dados gerais</h4>

        <v-row>
          <v-col cols="12" md="12">
            <v-text-field
                class="required-field"
                hide-details
                label="Descrição resumida"
                placeholder="Informe a descrição resumida do bem material"
                v-model="bemConsumo.descricao"/>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="4">
            <v-select
                :items="unidades"
                @change="calcularValorTotalPorBemConsumo"
                class="required-field"
                hide-details
                label="Unidade de aquisição"
                placeholder="Selecione"
                v-model="bemConsumo.unidade"/>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
                @change="calcularValorTotalPorBemConsumo"
                class="required-field"
                hide-details
                label="Valor de referencia"
                placeholder="0,00"
                prefix="R$"
                v-model="bemConsumo.valor"/>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
                disabled
                hide-details
                label="Valor total de referência"
                placeholder="0,00"
                prefix="R$"
                v-model="valorTotal"/>
          </v-col>
        </v-row>

        <h4 style="color: #555; margin-top: 20px;">Informações do local do estoque</h4>

        <v-row>
          <v-col cols="12" md="4">
            <v-select
                :items="corredores"
                hide-details
                label="Corredor"
                placeholder="Selecione"
                v-model="bemConsumo.corredor"/>
          </v-col>

          <v-col cols="12" md="4">
            <v-select
                :items="prateleiras"
                hide-details
                label="Prateleira"
                placeholder="Selecione"
                v-model="bemConsumo.prateleira"/>
          </v-col>

          <v-col cols="12" md="4">
            <v-select
                :items="andares"
                hide-details
                label="Andar"
                placeholder="Selecione"
                v-model="bemConsumo.andar"/>
          </v-col>
        </v-row>

        <div style="display: flex; justify-content: flex-end; margin-top: 20px">
          <v-btn @click="cancelar" depressed style="margin-right: 20px">
            Cancelar
          </v-btn>
          <v-btn @click="salvarBemConsumo" color="green" dark depressed>
            Salvar
          </v-btn>
        </div>

      </v-form>
    </div>
  </div>
</template>

<script>
import EnumUnidadeAquisicao from '@/commons/constants/EnumUnidadeAquisicao'

export default {
  name: 'FormularioBemConsumo',
  props: ['bemConsumo'],
  data: () => ({
    andares: ['A1', 'A2', 'A3', 'A4', 'A5'],
    corredores: ['C1', 'C2', 'C3', 'C4', 'C5'],
    prateleiras: ['P1', 'P2', 'P3', 'P4', 'P5'],
    unidades: ['Embalagem individual', 'Caixa (6 unidades)', 'Caixa (12 unidades)', 'Caixa (50 unidades)', 'Caixa (100 unidades)'],
    valorTotal: 0
  }),
  methods: {
    cancelar() {
      this.$emit('cancelar')
    },
    calcularValorTotalPorBemConsumo() {
       this.valorTotal = this.bemConsumo.valor * EnumUnidadeAquisicao[this.bemConsumo.unidade]
    },
    salvarBemConsumo() {
      this.$emit('salvar-bem-consumo', this.bemConsumo)
    }
  }
}
</script>
