<template>
    <div class="wrapper">
      <div class="box a">
        <h2>Select a category:</h2>
        <ul>
          <li v-for="(category, index) in categories" :key="index" class="list-joke">
            <button @click="selectedCategory = category" class="btn-joke btn btn-primary">{{ category }}</button>
          </li>
        </ul>
      </div>
      <div class="box b">
        <h2>Jokes:</h2>
        <ul>
          <li v-for="(joke, index) in jokes" :key="index" style="list-style-type: disclosure-closed;">
            <div class="card shadow joke-card">
            {{ joke.value }}</div>
          </li>
        </ul>
      </div>
    </div>
</template>
<script>
import axios from 'axios'

export default {
  data () {
    return {
      categories: [],
      jokes: [],
      selectedCategory: null
    }
  },
  mounted () {
    axios
      .get('https://clayne-sovtech-api.herokuapp.com/chuck/categories')
      .then((response) => {
        this.categories = response.data
      })
      .catch((error) => {
        console.log(error)
      })
  },
  methods: {
    getJokesByCategory (category) {
      axios
        .get(`https://clayne-sovtech-api.herokuapp.com/chuck/category/joke?category=${category}`)
        .then((response) => {
          this.jokes.push(response.data)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },
  watch: {
    selectedCategory (category) {
      this.jokes = []
      this.getJokesByCategory(category)
    }
  }
}
</script>
<style>
.joke-card{
  padding: 2em;
  margin: 2em;

  list-style-type: none !important;

}
.wrapper {
  display: grid;
  grid-template-columns: 33.334% 66.667% ;
}
.btn-joke {
  font-size: 1em;
  width: 10em;
  margin: 0.2em;
}
.list-joke{
  list-style-type: auto;
  color: black;
}
.box {
  color: #fff;
  padding: 1em;
}
.h2,h2{
  color:black;
}

* {
box-sizing: border-box;
}
.a {
}
.b {
color:black;
}
body {
margin: 5em;
color: black;
}

</style>
