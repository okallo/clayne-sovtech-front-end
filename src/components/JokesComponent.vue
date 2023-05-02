<!-- eslint-disable vue/valid-v-slot -->
<template>
  <div>
    <div d-flex space-between>
      <div>totalPages : {{ totalPages }}</div>
      <div>current page : {{ pagination.page }}</div>
      <div>row per page : {{ pagination.rowsPerPage }}</div>
    </div>
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
      <tr v-for="(person, index) in persons" :key="index">
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
  <div class="row" d-flex>
    <div class="col-md-6"><button variant="primary" class="ml-auto btn btn-primary" @click="PreviousPage"> previous </button></div>
    <div class="col-md-6"><button variant="primary" class="ml-auto btn btn-primary" @click="NextPage"> next </button></div>
  </div>
  </div>
</template>

<script>
import axios from 'axios'
import { reactive } from 'vue'
export default {
  data () {
    return {
      persons: reactive([]),
      headers: [
        { text: 'Name', value: 'name' },
        { text: 'Height', value: 'height' },
        { text: 'Mass', value: 'mass' },
        { text: 'Gender', value: 'gender' },
        { text: 'Birth Year', value: 'birth_year' }
      ],
      pagination: {
        page: 1,
        rowsPerPage: 10
      },
      totalPages: 0,
      count: 0,
      next: '',
      previous: ''

    }
  },
  computed: {
    totalRows () {
      return this.persons.length
    }
  },
  methods: {
    fetchPeople (v) {
      const start = (this.pagination.page - 1) * this.pagination.rowsPerPage
      const end = start + this.pagination.rowsPerPage
      axios.get(`https://swapi.dev/api/people/?page=${v}`)
        .then(response => {
          console.log('check people', response.data.results)
          this.persons = response.data.results.slice(start, end)
          this.count = response.data.count
          this.next = response.data.next
          this.previous = response.data.previous
          this.totalPages = Math.ceil(response.data.count / this.pagination.rowsPerPage)
        })
        .catch(error => {
          console.log(error)
        })
    },
    NextPage () {
      if (this.pagination.page < this.totalPages) {
        this.pagination.page++
        this.fetchPeople(this.pagination.page)
      }
    },
    PreviousPage () {
      if (this.pagination.page > 1 && this.pagination.page < this.totalPages) {
        this.pagination.page--
        this.fetchPeople(this.pagination.page)
      }
    }
  },
  mounted () {
    this.fetchPeople(this.pagination.page)
  },
  watch () {
    this.fetchPeople(this.pagination.page)
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
