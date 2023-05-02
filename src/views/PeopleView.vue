<template>
  <div class="about">
    <h1>This is a people page</h1>
    <PeopleComponent />
  </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import PeopleComponent from '@/components/PeopleComponent.vue' // @ is an alias to /src

@Options({
  components: {
    PeopleComponent
  }
})
export default class PeopleView extends Vue {}
</script>
