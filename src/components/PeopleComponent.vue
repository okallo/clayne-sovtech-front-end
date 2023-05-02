<template>
  <div>
    <table class="table-hover table-striped">
    <thead>
      <tr>
        <th>Name
        </th>
        <th>Height
        </th>
        <th>Mass
        </th>
        <th>Gender
        </th>
        <th>Birth_year
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(person, index) in people" :key="index">
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
    <nav>
      <button :disabled="page === 1" @click="page--" class="ml-auto btn btn-primary" >Previous Page</button>
      <button class="btn btn-secondary">{{ page }}</button>
      <button :disabled="page >= pageCount" @click="page++" class="ml-auto btn btn-primary" >Next Page</button>
    </nav>
  </div>
</template>

<script>
import axios from 'axios'
import { reactive, toRefs, watch } from 'vue'

export default {
  name: 'PaginatedTable',

  props: {
    perPage: {
      type: Number,
      default: 10
    }
  },

  setup (props) {
    const state = reactive({
      page: 1,
      pageCount: 1,
      people: []
    })

    const fetchData = async () => {
      const response = await axios.get('https://swapi.dev/api/people/', {
        params: {
          page: state.page
        }
      })

      state.people = response.data.results
      state.pageCount = Math.ceil(response.data.count / props.perPage)
    }

    watch(() => state.page, fetchData, { immediate: true })

    return {
      ...toRefs(state)
    }
  }
}
</script>

<style scoped>
table {
  border: 2px solid #42b983;
  border-radius: 3px;
  background-color: #fff;
  width: 100%;
  color: black;
  margin: 3em;
}

th {
  background-color: #42b983;
  color: rgba(255, 255, 255, 0.66);
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -user-select: none;
}

td {
  background-color: #f9f9f9;
}

th,
td {
  min-width: 120px;
  padding: 10px 20px;
}

#search {
  margin-bottom: 10px;
}

#page-navigation {
  display: flex;
  margin-top: 5px;
}

#page-navigation p {
  margin-left: 5px;
  margin-right: 5px;
}

#page-navigation button {
  background-color: #42b983;
  border-color: #42b983;
  color: rgba(255, 255, 255, 0.66);
}
</style>
