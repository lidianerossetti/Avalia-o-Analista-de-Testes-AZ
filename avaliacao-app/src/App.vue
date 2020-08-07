<template>
  <v-app>
    <bem-consumo/>
    <historias-usuarios/>
  </v-app>
</template>

<script>
import BemConsumo from './view/bem-consumo/BemConsumo'
import HistoriasUsuarios from './view/bem-consumo/components/HistoriasUsuarios'

export default {
  name: 'App',
  components: {BemConsumo, HistoriasUsuarios}
}
</script>

<style lang="stylus">
.required-field label:after
  content " *"
  color red

.link
  cursor pointer

</style>
