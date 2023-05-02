<template>
  <div class="row">
    <div class="col-md-12">
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
      <div class="box b">
        <h2>Chuck Norris Results</h2>
        <ul>
          <li
            v-for="(joke, index) in chuckResults"
            :key="index"
            style="list-style-type: disclosure-closed"
          >
            <div class="card shadow joke-card">
              {{ joke.value }}
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="col-md-6">

    <div class="card shadow joke-card">
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
              {{ person.birth_year }}
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
  birth_year: string;
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
    const chuckPage = ref(1)
    const starWarsPage = ref(1)
    const chuckPageCount = ref(1)
    const starWarsPageCount = ref(1)

    const searchChuck = async () => {
      const response = await axios.get(
        'https://api.chucknorris.io/jokes/search',
        {
          params: {
            query: searchQuery.value,
            page: chuckPage.value
          }
        }
      )

      chuckResults.value = response.data.result
      chuckPageCount.value = Math.ceil(
        response.data.total / response.data.limit
      )
    }

    const searchStarWars = async () => {
      const response = await axios.get('https://swapi.dev/api/people/', {
        params: {
          search: searchQuery.value,
          page: starWarsPage.value
        }
      })

      starWarsResults.value = response.data.results
      starWarsPageCount.value = Math.ceil(
        response.data.count / response.data.per_page
      )
    }

    const debouncedSearch = debounce(() => {
      chuckResults.value = []
      starWarsResults.value = []
      chuckPage.value = 1
      starWarsPage.value = 1
      searchChuck()
      searchStarWars()
    }, 500)

    const handleChuckPageChanged = (newPage: number) => {
      chuckPage.value = newPage
      searchChuck()
    }

    const handleStarWarsPageChanged = (newPage: number) => {
      starWarsPage.value = newPage
      searchStarWars()
    }

    return {
      searchQuery,
      chuckResults,
      starWarsResults,
      chuckPage,
      starWarsPage,
      chuckPageCount,
      starWarsPageCount,
      debouncedSearch,
      handleChuckPageChanged,
      handleStarWarsPageChanged
    }
  }
})
</script>
