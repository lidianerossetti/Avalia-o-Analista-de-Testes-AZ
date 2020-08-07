<template>
    <div style="display: block; height: 100%; overflow-y: hidden">
        <v-snackbar v-model="snackbar" right top :color="corSnackbar">
            {{mensagem}}
        </v-snackbar>
        <div class="barra-superior">
            Avaliação - Analista de testes
        </div>
        <div style="display: flex; height: calc(100% - 70px)">
            <div class="container">
                <h4 style="color: #555">Almoxarifado</h4>
                <h3 style="color: #555; margin-bottom: 10px">CADASTRO DE BEM MATERIAL</h3>
                <div class="formulario">
                    <v-form>
                        <h4 style="color: #555;">Dados gerais</h4>
                        <v-row>
                            <v-col cols="12" md="12">
                                <v-text-field
                                        v-model="item.descricao"
                                        class="required-field"
                                        label="Descrição resumida"
                                        placeholder="Informe a descrição resumida do bem material"
                                        hide-details
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" md="4">
                                <v-select
                                        :items="unidades"
                                        v-model="item.unidade"
                                        @change="calcularValorTotalPorItem"
                                        placeholder="Selecione"
                                        class="required-field"
                                        label="Unidade de aquisição"
                                        hide-details
                                ></v-select>
                            </v-col>
                            <v-col cols="12" md="4">
                                <v-text-field
                                        v-model="item.valor"
                                        @change="calcularValorTotalPorItem"
                                        label="Valor de referencia"
                                        hide-details
                                        class="required-field"
                                        prefix="R$"
                                        placeholder="0,00"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="4">
                                <v-text-field
                                        v-model="valorTotal"
                                        label="Valor total de referência"
                                        hide-details
                                        prefix="R$"
                                        placeholder="0,00"
                                        disabled
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <h4 style="color: #555; margin-top: 20px;">Informações do local do estoque</h4>
                        <v-row>
                            <v-col cols="12" md="4">
                                <v-select
                                        :items="corredores"
                                        placeholder="Selecione"
                                        label="Corredor"
                                        v-model="item.corredor"
                                        hide-details
                                ></v-select>
                            </v-col>
                            <v-col cols="12" md="4">
                                <v-select
                                        :items="prateleiras"
                                        placeholder="Selecione"
                                        label="Prateleira"
                                        v-model="item.prateleira"
                                        hide-details
                                ></v-select>
                            </v-col>
                            <v-col cols="12" md="4">
                                <v-select
                                        :items="andares"
                                        placeholder="Selecione"
                                        label="Andar"
                                        v-model="item.andar"
                                        hide-details
                                ></v-select>
                            </v-col>
                        </v-row>
                        <div style="display: flex; justify-content: flex-end; margin-top: 20px">
                            <v-btn depressed style="margin-right: 20px"
                                   @click="cancelar">Cancelar
                            </v-btn>
                            <v-btn depressed dark color="green" @click="salvarItem">Salvar</v-btn>
                        </div>
                    </v-form>
                </div>
                <h3 style="color: #555; margin-bottom: 10px; margin-top: 20px">BENS MATERIAIS ADICIONADOS</h3>
                <div class="formulario">
                    <v-data-table
                            :headers="headers"
                            :items="this.$store.state.listaBemConsumo"
                            :items-per-page="3"
                            depressed
                    >
                        <template v-slot:item.acoes="{ item }">
                            <v-icon size="18" style="margin-right: 10px" @click="editarBemConsumo(item)">edit</v-icon>
                            <v-icon @click="excluirBemConsumo(item)">close</v-icon>
                        </template>
                        <template v-slot:item.estoque="{ item }">
                            <span>{{item.corredor}}-{{item.prateleira}}-{{item.andar}}</span>
                        </template>
                        <template v-slot:item.vlrTotal="{ item }">
                            <span>{{calcularValorTotal(item)}}</span>
                        </template>
                    </v-data-table>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import _ from 'lodash'
    import {actionTypes} from '@/commons/constants'
    import EnumUnidadeAquisicao from "../commons/constants/EnumUnidadeAquisicao";

    export default {
        data: () => ({
            unidades: ['Embalagem individual', 'Caixa (6 unidades)', 'Caixa (12 unidades)', 'Caixa (50 unidades)', 'Caixa (100 unidades)'],
            corredores: ['C1', 'C2', 'C3', 'C4', 'C5'],
            andares: ['A1', 'A2', 'A3', 'A4', 'A5'],
            snackbar: false,
            prateleiras: ['P1', 'P2', 'P3', 'P4', 'P5'],
            valorTotal: 0,
            mensagem: '',
            corSnackbar: '',
            item: {
                id: null,
                descricao: '',
                unidade: '',
                valor: '',
                andar: '',
                corredor: '',
                prateleira: ''
            },
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
            ],
        }),
        mounted() {
            this.buscarBemConsumo()
        },
        computed: {
            bugSalvarItemCamposObrigatorios() {
                return this.item.descricao.length > 0 && this.item.unidade.length > 0
            }
        },
        methods: {
            async buscarBemConsumo() {
                await this.$store.dispatch(actionTypes.BUSCAR_BEM_CONSUMO)
            },
            async salvarItem() {
                if (this.bugSalvarItemCamposObrigatorios) {
                    if (this.item.id == null) {
                        await this.$store.dispatch(actionTypes.INSERIR_BEM_CONSUMO, this.item)
                    } else {
                        await this.$store.dispatch(actionTypes.ATUALIZAR_BEM_CONSUMO, this.item)
                    }
                    await this.buscarBemConsumo()
                    this.limparInputs()
                    this.exibirMensagemSucesso('Operação realizada com sucesso.')
                } else {
                    this.exibirMensagemErro('Informe os campos obrigatórios.')
                }
            },
            calcularValorTotal(item) {
                return item.valor * EnumUnidadeAquisicao[item.unidade]
            },
            calcularValorTotalPorItem() {
                this.valorTotal = this.calcularValorTotal(this.item)
            },
            cancelar(){
                this.exibirMensagemErro('Erro desconhecido')
                this.exibirMensagemErrorConsole('Erro ao buscar item no banco de dados.')
            },
            exibirMensagemErrorConsole(mensagem) {
                console.error(mensagem)
            },
            exibirMensagemSucesso(mensagem) {
                this.mensagem = mensagem
                this.corSnackbar = 'success'
                this.snackbar = true
            },
            exibirMensagemErro(mensagem) {
                this.mensagem = mensagem
                this.corSnackbar = 'error'
                this.snackbar = true
            },
            editarBemConsumo(item) {
                this.item = _.clone(item)
            },
            async excluirBemConsumo(item) {
                await this.$store.dispatch(actionTypes.REMOVER_BEM_CONSUMO, item.id)
                this.exibirMensagemSucesso('Bem excluído com sucesso.')
                this.buscarBemConsumo()
            },
            limparInputs() {
                this.item = {
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
