<template>
  <div>
    <JokesComponent />
  </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import JokesComponent from '@/components/JokesComponent.vue' // @ is an alias to /src

@Options({
  components: {
    JokesComponent
  }
})
export default class JokesView extends Vue {}
</script>
