<template>
    <div>
        <v-card class="pa-5">
            <v-card-title>Tarefa</v-card-title>
            <v-card-text>Insira sua nova tarefa</v-card-text>
            <v-form>
                <v-container>
                    <v-layout wrap>
                        <v-flex xs12>
                            <v-text-field
                                    v-model="value.descricao"
                                    label="Descrição"
                                    required
                            />
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-form>
            <v-card-actions>
                <v-col cols="6">
                    <v-btn elevation="3" block class="warning" @click="limpar">limpar</v-btn>
                </v-col>
                <v-col cols="6">
                    <v-btn v-if="!value.id" elevation="3" block class="success" @click="salvar(value)">adicionar</v-btn>
                    <v-btn v-else elevation="3" block class="success" @click="atualizar(value)">atualizar</v-btn>
                </v-col>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
    export default {
        name: 'Formulario',
        props: ['value'],
        methods: {
            atualizar(tarefa) {
              this.$emit('atualizarTarefa', tarefa)
            },
            limpar() {
                this.$emit('limparFormulario')
            },
            salvar(tarefa) {
                this.$emit('salvarTarefa', tarefa)
            }
        }
    }
</script>

<style scoped>

</style>
