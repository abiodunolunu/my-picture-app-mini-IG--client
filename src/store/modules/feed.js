/* eslint-disable no-unused-vars */

import axios from "../../../axios";
import store from "..";
import router from "../../router";


const state = {
    posts: [],
    singlePost: null,
    feedMessage: null,
    loading: true,
}

const mutations = {
    'SET_POSTS': (state, posts) => {
        state.posts = posts
        state.loading = false
    },
    'modifyLikes': (state, likedPost) => {
        const existingPostIndex = state.posts.findIndex((post) => {
            return post._id == likedPost._id
        })
        if (existingPostIndex >= 0) {
            state.posts[existingPostIndex].likes = likedPost.likes

        }
        if (state.singlePost && state.singlePost.post._id === likedPost._id) {
            state.singlePost.post.likes = likedPost.likes
        }
    },
    'SET_SINGLE_POST': (state, singlePost) => {
        state.singlePost = singlePost
    },
    'addNewPost': (state, addNewPost) => {
        addNewPost.likes = []
        state.posts.unshift(addNewPost)
    },
    'removePost': (state, { postID, ownerId }) => {
        const existingPostIndex = state.posts.findIndex((post) => {
            return post._id == postID && post.owner._id == ownerId
        })

        if (existingPostIndex >= 0) {
            state.posts.splice(existingPostIndex, 1)
        }
        if (state.singlePost != null && state.singlePost.post._id == postID && state.singlePost.post.owner._id == ownerId) {
            state.singlePost = null
            router.replace('/home')
        }
    },
    'RESET': (state) => {
        state.posts = []
        state.singlePost = null

    },
    'setFeedMessage': (state, data) => {
        state.feedMessage = data
    }
}

const actions = {
    createPost: async ({ commit }, postInput) => {
        const body = {
            query: `
            mutation($imageUrl: String!, $caption: String!, $imagePublicId: String!) {
                createPost(imageUrl: $imageUrl, caption: $caption, imagePublicId: $imagePublicId) {
                    _id
                    imageUrl
                    caption
                    owner {
                        _id
                        firstname
                        lastname
                      }
                }
            }
            `,
            variables: {
                imageUrl: postInput.imageUrl,
                imagePublicId: postInput.imagePublicId,
                caption: postInput.caption
            }
        }
        const result = await axios.post('/graphql', body, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": 'Bearer ' + store.getters["Auth/token"]
            }
        })
        if (result.data.error) {
            const message = result.data.errors[0].message
            commit('setFeedMessage', { message: message, type: 'error' });
            return
        }
        commit('addNewPost', result.data.data.createPost)
        const message = 'Post Added!'
        commit('setFeedMessage', { message: message, type: 'success' });

    },
    getAllPosts: async ({ commit }) => {
        const body = {
            query: `
            query {
                getPosts {
                    posts {
                      _id
                      caption
                      imageUrl
                      createdAt
                      owner {
                        firstname
                        lastname
                        _id
                      }
                      newestComment {
                        text
                        author {
                          firstname
                          lastname
                        }
                      }
                      likes {
                        _id
                      }
                    }
                }
            }`
        }
        const result = await axios.post('/graphql', body, {
            headers: {
                "Authorization": 'Bearer ' + store.getters["Auth/token"]
            }
        })
        const posts = result.data.data.getPosts.posts
        commit('SET_POSTS', posts)
    },
    createComment: async ({ commit }, commentData) => {
        const body = {
            query: `
            mutation($postId: String!, $text: String!) {
                createComment(postId: $postId, text: $text) {
                    text
                    author {
                      _id
                      email
                    }
                    post {
                      imageUrl
                    }
                }
            }`,
            variables: {
                postId: commentData.postId,
                text: commentData.text
            }
        }
        const result = await axios.post('/graphql', body, {
            headers: {
                "Authorization": 'Bearer ' + store.getters["Auth/token"]
            }
        })
        if (result.data.errors) {
            const message = result.data.errors[0].message
            return commit('setFeedMessage', { message: message, type: 'error' });
        }

        else {
            const message = 'Comment added successfully!'
            return commit('setFeedMessage', { message: message, type: 'success' });
        }
    },
    createLike: async ({ commit }, likeData) => {
        const body = {
            query: `
            mutation($postId: String!) {
                likeAPost(postId: $postId) {
                   _id
                   likes {
                       _id
                   }
                }
            }`,
            variables: {
                postId: likeData.postId,
            }
        }
        const result = await axios.post('/graphql', body, {
            headers: {
                "Authorization": 'Bearer ' + store.getters["Auth/token"]
            }
        })
        if (result.data.errors) {
            const message = result.data.errors[0].message
            return commit('setFeedMessage', { message: message, type: 'error' });
        }

        else {
            const likedPost = result.data.data.likeAPost
            return commit('modifyLikes', likedPost)
        }
    },
    getSinglePost: async ({ commit }, postId) => {
        const body = {
            query: `
            query($postId: String!) {
                getSinglePost(postId: $postId) {
                     post {
                    _id
                    owner {
                        firstname
                        lastname
                        _id
                    }
                    imageUrl
                    caption
                    likes {
                        _id
                    }
                    createdAt
                     updatedAt
                 }
                 comments {
                     _id
                     text
                     author {
                         firstname
                         lastname
                     }
                     createdAt
                    }
                }
            }`,
            variables: {
                postId: postId,
            }
        }


        const result = await axios.post('/graphql', body, {
            headers: {
                "Authorization": 'Bearer ' + store.getters["Auth/token"]
            }
        })


        if (result.data.errors) {
            const message = result.data.errors[0].message
            commit('setFeedMessage', { message: message, type: 'error' });
            return router.replace('/home')
        }
        const singlePost = result.data.data.getSinglePost
        commit('SET_SINGLE_POST', singlePost)
    },
    deleteAPost: async ({ commit }, postId) => {
        const body = {
            query: `
            mutation($postId: String!) {
                deleteAPost(postId: $postId) {
                    _id
                    owner {
                        _id
                    }
                }
            }`,
            variables: {
                postId: postId,
            }
        }

        const result = await axios.post('/graphql', body, {
            headers: {
                "Authorization": 'Bearer ' + store.getters["Auth/token"]
            }
        })

        if (result.data.errors) {
            const message = result.data.errors[0].message
            return commit('setFeedMessage', { message: message, type: 'error' });
        }
        const postID = result.data.data.deleteAPost._id
        const ownerId = result.data.data.deleteAPost.owner._id
        commit('removePost', { postID, ownerId })
        return commit('setFeedMessage', { message: "Post Deleted!", type: 'success' });
    }
}

const getters = {
    allPosts: (state) => {
        return state.posts
    },
    singlePost: (state) => {
        return state.singlePost
    },
    feedMessage: () => {
        return state.feedMessage
    },
    loading: () => {
        return state.loading
    }
}
export default {
    state,
    actions,
    mutations,
    getters,
    namespaced: true
};