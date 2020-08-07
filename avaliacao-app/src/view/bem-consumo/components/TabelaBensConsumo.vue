<template>
  <div class="formulario">
    <v-data-table
        :headers="headers"
        :items="bensConsumo"
        :items-per-page="3"
        depressed>

      <template v-slot:item.acoes="{ item }">
        <v-icon @click="editarBemConsumo(item)" size="18" style="margin-right: 10px">edit</v-icon>
        <v-icon @click="removerBemConsumo(item)">close</v-icon>
      </template>

      <template v-slot:item.estoque="{ item }">
        <span>{{ item.corredor }}-{{ item.prateleira }}-{{ item.andar }}</span>
      </template>

      <template v-slot:item.vlrTotal="{ item }">
        <span>{{ calcularValorTotal(item) }}</span>
      </template>

    </v-data-table>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import EnumUnidadeAquisicao from '../../../commons/constants/EnumUnidadeAquisicao'

export default {
  name: 'TabelaBensConsumo',
  data: () => ({
    valorTotal: 0,
    headers: [
      {
        text: 'Descrição resumida',
        align: 'start',
        sortable: false,
        value: 'descricao',
      },
      {
        text: 'Un. Aquisição',
        align: 'start',
        sortable: false,
        value: 'unidade',
      },
      {
        text: 'Vlr. Referencia',
        align: 'start',
        sortable: false,
        value: 'valor',
      },
      {
        text: 'Vlr. Total Referencia',
        align: 'start',
        sortable: false,
        value: 'vlrTotal',
      },
      {
        text: 'Estoque',
        align: 'start',
        sortable: false,
        value: 'estoque',
      },
      {
        text: 'Ações',
        align: 'center',
        sortable: false,
        value: 'acoes'
      },

    ],
    desserts: [
      {
        descricao: 'Caneta esferografica',
        unAquisicao: 'Caixa (6 unidades)',
        vlrReferencia: '20.00',
        vlrTotalRef: '120.00',
        estoque: 'C1-P2-A3'
      },
      {
        descricao: 'Caneta esferografica',
        unAquisicao: 'Caixa (6 unidades)',
        vlrReferencia: '20.00',
        vlrTotalRef: '120.00',
        estoque: 'C1-P2-A3'
      },
      {
        descricao: 'Caneta esferografica',
        unAquisicao: 'Caixa (6 unidades)',
        vlrReferencia: '20.00',
        vlrTotalRef: '120.00',
        estoque: 'C1-P2-A3'
      },
      {
        descricao: 'Caneta esferografica',
        unAquisicao: 'Caixa (6 unidades)',
        vlrReferencia: '20.00',
        vlrTotalRef: '120.00',
        estoque: 'C1-P2-A3'
      }
    ]
  }),
  computed: {
    ...mapState(['bensConsumo'])
  },
  methods: {
    calcularValorTotal(item) {
      return item.valor * EnumUnidadeAquisicao[item.unidade]
    },
    editarBemConsumo(item) {
      this.$emit('editar-bem-consumo', item)
    },
    removerBemConsumo(item) {
      this.$emit('remover-bem-consumo', item)
    }
  }
}
</script>
