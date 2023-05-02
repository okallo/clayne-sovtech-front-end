<template>
  <div class="about">
    <CategoriesComponent />
  </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import CategoriesComponent from '@/components/CategoriesComponent.vue'

@Options({
  components: {
    CategoriesComponent
  }
})
export default class HomeView extends Vue {}
</script>
