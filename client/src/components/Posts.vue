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
  </div>
</template>z

<script>
import { fetchPosts } from '@/services/PostsService'

export default {
  name: 'posts',
  data () {
    return {
      answer: '',
      question: ''
    }
  },
  methods: {
    async getPosts (msg) {
      const response = await fetchPosts(msg)
      this.answer = response.data
    }
  }
}
</script>
