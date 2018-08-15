<template>
  <div class="posts">
    <h1>Posts</h1>
    <div id="question">
      <input v-model="question" placeholder="ask me dummy">
      <button v-on:click="getPosts(question)">Click it</button>
    </div>
      <span>{{ question }}</span>
      <br />
      <span>{{ answer }}</span>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <span>{{ markov }}</span>
  </div>
</template>

<script>
import { fetchPosts, fetchMarkov } from '@/services/PostsService'

export default {
  name: 'posts',
  data () {
    return {
      answer: '',
      question: '',
      markov: ''
    }
  },
  mounted () {
    this.getMarkov()
  },
  methods: {
    async getPosts (msg) {
      const response = await fetchPosts(msg)
      this.answer = response.data
    },
    async getMarkov() {
      const markov = await fetchMarkov()
      this.markov = markov.data
    }
  }
}
</script>
