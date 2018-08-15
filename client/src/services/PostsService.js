import Api from '@/services/Api'

export const fetchPosts = (msg) =>
  Api().post('posts', {query: msg})

export const fetchMarkov = () =>
  Api().get('markov')
