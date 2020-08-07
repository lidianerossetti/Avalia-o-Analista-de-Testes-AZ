<template>
  <div style="display: block; height: 100%; overflow-y: hidden">
    <alerta-notificacao
        :mensagem="alerta.mensagem"
        :tipo-alerta="alerta.tipoAlerta"
        :alerta="alerta.mostrarAlerta"
    />

    <div class="barra-superior">
      Avaliação - Analista de testes
    </div>

    <div style="display: flex; height: calc(100% - 70px)">
      <div class="container">
        <formulario-bem-consumo
            :bem-consumo="bemConsumo"
            @cancelar="cancelar"
            @salvar-bem-consumo="salvarBemConsumo"
        />
        <tabela-bens-consumo
            @editar-bem-consumo="editarBemConsumo"
            @remover-bem-consumo="removerBemConsumo"
        />
      </div>
    </div>
  </div>

</template>

<script>
import _ from 'lodash'
import {actionTypes} from '@/commons/constants'
import AlertaNotificacao from './components/AlertaNotificacao'
import FormularioBemConsumo from './components/FormularioBemConsumo'
import TabelaBensConsumo from './components/TabelaBensConsumo'

export default {
  components: {TabelaBensConsumo, FormularioBemConsumo, AlertaNotificacao},
  data: () => ({
    alerta: {
      mensagem: '',
      mostrarAlerta: false,
      tipoAlerta: ''
    },
    bemConsumo: {
      id: null,
      descricao: '',
      unidade: '',
      valor: '',
      andar: '',
      corredor: '',
      prateleira: ''
    }
  }),
  mounted() {
    this.buscarBemConsumo()
  },
  computed: {
    validarCamposObrigatorios() {
      return this.bemConsumo.descricao.length > 0 && this.bemConsumo.unidade.length > 0
    }
  },
  methods: {
    async atualizarBemConsumo() {
      await this.$store.dispatch(actionTypes.ATUALIZAR_BEM_CONSUMO, this.bemConsumo)
    },
    async buscarBemConsumo() {
      await this.$store.dispatch(actionTypes.BUSCAR_BENS_CONSUMO)
    },
    async inserirBemConsumo() {
      await this.$store.dispatch(actionTypes.INSERIR_BEM_CONSUMO, this.bemConsumo)
    },
    async salvarBemConsumo() {
      if (this.validarCamposObrigatorios) {
        if (this.bemConsumo.id == null) {
          await this.inserirBemConsumo.call(this);
        } else {
          await this.atualizarBemConsumo.call(this);
        }
        await this.buscarBemConsumo()
        this.limparInputs()
        this.exibirMensagemSucesso('Operação realizada com sucesso.')
      } else {
        this.exibirAlertaErro('Informe os campos obrigatórios.')
      }
    },
    cancelar() {
      this.exibirAlertaErro('Erro desconhecido')
      this.exibirMensagemErrorConsole('Erro ao buscar item no banco de dados.')
    },
    editarBemConsumo(item) {
      this.bemConsumo = _.clone(item)
    },
    exibirAlertaErro(mensagem) {
      this.alerta.mensagem = mensagem
      this.alerta.tipoAlerta = 'error'
      this.alerta.mostrarAlerta = true
    },
    exibirMensagemSucesso(mensagem) {
      this.alerta.mensagem = mensagem
      this.alerta.tipoAlerta = 'success'
      this.alerta.mostrarAlerta = true
    },
    exibirMensagemErrorConsole(mensagem) {
      console.error(mensagem)
    },
    async removerBemConsumo(item) {
      await this.$store.dispatch(actionTypes.REMOVER_BEM_CONSUMO, item.id)
      this.exibirMensagemSucesso('Bem excluído com sucesso.')
      this.buscarBemConsumo()
    },
    limparInputs() {
      this.bemConsumo = {
        id: null,
        descricao: '',
        unidade: '',
        valor: '',
        andar: '',
        corredor: '',
        prateleira: ''
      }
    }
  }
}
</script>

<style lang="stylus">
html
  overflow auto !important

.barra-superior
  background-color #607D8B
  padding 20px
  font-size 20px
  color white
  display flex
  font-weight bold
  height 70px

.historias-usuario
  background-color white
  border-left 1px solid #ddd
  width 500px
  height 100%
  display block
  overflow-y auto

  .cabecalho
    font-weight bold
    font-size 16px
    color #555
    border-bottom 1px solid #dddddd
    padding 10px

  .historia
    padding 10px
    border-bottom 1px solid #dddddd
    font-size 12px
    color #999

    b
      color #555

    .nome
      font-weight bold
      color #555
      font-size 12px
      padding-bottom 5px

.container
  background-color #eee
  margin 0 !important
  height 100%
  max-width calc(100% - 500px) !important
  padding 20px !important

  .formulario
    background-color white
    width 100%
    min-height 100px
    padding 20px
</style>
