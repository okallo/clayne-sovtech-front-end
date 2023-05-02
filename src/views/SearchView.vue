<template>
  <SearchComponent />
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import SearchComponent from '@/components/SearchComponent.vue' // @ is an alias to /src

@Options({
  components: {
    SearchComponent
  }
})
export default class SearchView extends Vue {}
</script>
