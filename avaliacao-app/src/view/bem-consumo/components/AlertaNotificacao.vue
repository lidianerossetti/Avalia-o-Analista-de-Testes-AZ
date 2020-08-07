<template>
  <v-snackbar :color="tipoAlerta" right top v-model="mostrarAlerta">
    {{ mensagem }}
  </v-snackbar>
</template>

<script>
export default {
  name: 'AlertaNotificacao',
  props: {
    alerta: {
      default: false
    },
    mensagem: {
      default: 'Operação realizada com sucesso.'
    },
    tipoAlerta: {
      type: String,
      default: 'success'
    }
  },
  data: () => ({
    mostrarAlerta: false
  }),
  watch: {
    'alerta'() {
      this.mostrarAlerta = this.alerta
    }
  }
}
</script>
