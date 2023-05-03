<template>
  <div class="row joke-card">
    <div class="col-md-12 card joke-card">
      <label for="search" style="margin: 2em;">Search:</label>
      <input
        type="text"
        id="search"
        class="form-control"
        v-model="searchQuery"
        @input="debouncedSearch"
      />
    </div>
    <br />
    <div class="col-md-6">
      <div class="">
        <h2>Chuck Norris Results</h2>
        <ul>
          <li
            v-for="(joke, index) in chuckResults"
            :key="index"
            style="list-style-type: disclosure-closed"
          >
            <div class="card joke-card">
              {{ joke.value }}
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="col-md-6">

    <div class="">
      <h2>Star Wars Results</h2>
      <table class="table table-hover table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Height</th>
            <th>Mass</th>
            <th>Gender</th>
            <th>Birth_year</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(person, index) in starWarsResults" :key="index">
            <td>
              {{ person.name }}
            </td>
            <td>
              {{ person.height }}
            </td>
            <td>
              {{ person.mass }}
            </td>
            <td>
              {{ person.gender }}
            </td>
            <td>
              {{ person.birth_Year }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import axios from 'axios'
import debounce from 'lodash/debounce'

interface ChuckNorrisResult {
  id: string;
  value: string;
}

interface StarWarsResult {
  name: string;
  // eslint-disable-next-line camelcase
  birth_Year: string;
  height: string;
  mass: string;
  gender: string;
}

export default defineComponent({
  name: 'SearchPage',

  setup () {
    const searchQuery = ref('')
    const chuckResults = ref<ChuckNorrisResult[]>([])
    const starWarsResults = ref<StarWarsResult[]>([])

    const searchChuck = async () => {
      const response = await axios.get(
        'https://clayne-sovtech-api.herokuapp.com/search/' + searchQuery.value,
        {
          params: {
            // query: searchQuery.value
            // page: chuckPage.value
          }
        }
      )
      chuckResults.value = response.data.Jokes.result
      starWarsResults.value = response.data.People.results
    }

    const debouncedSearch = debounce(() => {
      chuckResults.value = []
      starWarsResults.value = []
      searchChuck()
    }, 500)

    return {
      searchQuery,
      chuckResults,
      starWarsResults,
      debouncedSearch
    }
  }
})
</script>
