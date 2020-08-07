<template>
  <v-snackbar :color="tipoAlerta" right top v-model="mostrarAlerta">
    {{ mensagem }}
  </v-snackbar>
</template>

<script>
export default {
  name: 'AlertaNotificacao',
  props: {
    mensagem: {
      default: 'Operação realizada com sucesso.'
    },
    mostrarAlerta: {
      default: false
    },
    tipoAlerta: {
      type: String,
      default: 'success'
    }
  }
}
</script>
