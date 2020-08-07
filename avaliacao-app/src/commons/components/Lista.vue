<template>
    <div>
        <v-card class="pa-1">
            <v-card-title>Lista de Tarefas</v-card-title>
            <v-list three-line tile>
                <template v-for="tarefa in value">

                    <v-list-item :key="tarefa.id">

                        <v-list-item-content>
                            <div>
                                <span>{{tarefa.descricao}}</span>
                            </div>
                        </v-list-item-content>

                        <v-list-item-action>
                            <v-btn icon>
                                <v-icon color="grey lighten-1" @click="editar(tarefa)">create</v-icon>
                            </v-btn>
                            <v-btn icon>
                                <v-icon color="grey lighten-1" @click="remover(tarefa)">delete</v-icon>
                            </v-btn>
                        </v-list-item-action>

                    </v-list-item>
                </template>
            </v-list>
        </v-card>
    </div>
</template>

<script>
    export default {
        name: 'Lista',
        props: ['value'],
        methods: {
            editar(tarefa) {
                this.$emit('editarTarefa', tarefa)
            },
            remover(tarefa) {
                this.$emit('removerTarefa', tarefa)
            }
        }
    }
</script>

<style scoped>

</style>
