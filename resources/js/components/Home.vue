<template>

    <!-- Show login form if user is not authenticated -->
    <div v-show="!user.value">
        <h2>Login Form</h2>
        <!-- Your login form markup goes here -->
        <input type="text" v-model="email" /><br>
        <input type="text" v-model="password" /><br>
        <button @click="login">Login</button>
    </div>

    <!-- Show categories with products if user is authenticated -->
    <div v-show="user.value">
        <h2>Categories with Products</h2>
        <!-- Your categories with products markup goes here -->
        <div class="grid grid-cols-4 gap-4">
            <div class="space-y-2" v-for="product in products.data" :key="product.id">
                <a href="#">
                    <img src="http://placehold.it/100x100" :alt="product.name" />
                </a>
                <a class="text-slate-500 text-xl font-semibold hover:underline">
                    {{ product.name }}
                </a>
                <p>${{ product.price }}</p>
                <p class="prose-slate">{{ product.description }}</p>
            </div>
        </div>

        <TailwindPagination :data="products" @pagination-change-page="getProducts" class="mt-4" />

        <h2>Create category</h2>
        <div>
            <input type="text" v-model="name" />
            <button @click="submit">Submit</button>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { TailwindPagination } from 'laravel-vue-pagination';

const categories = ref({})
const products = ref({})
const user = ref(false)

const email = ref('')
const password = ref('')

const getCategories = async () => {
    await axios.get('/api/categories')
        .then(response => {
            categories.value = response.data.data
        })
        .catch((error) => console.log(error))
}

const getProducts = async (page = 1) => {
    await axios.get(`/api/products?page=${page}`)
        .then(response => {
            products.value = response.data
        })
        .catch((error) => console.log(error))
}

const login = async () => {
    await axios.get('/sanctum/csrf-cookie')
        .then(response => {
            axios.post('/login', {
                email: email.value,
                password: password.value
            })
                .then(response => {
                    user.value = true
                    getCategories()
                    getProducts()
                })
                .catch(error => console.log(error)); // credentials didn't match
        })
}

onMounted(() => {
    if (user.value) {
        getCategories()
        getProducts()
    }
})

// Create category form

const name = ref('')

const submit = () => {
    axios.post('/api/categories', {
        name: name.value
    })
        .then(response => {
            console.log('New Category ID: ' + response.data.data.id)
        })
        .catch(error => {
            console.log(error.response.data.errors)
        })
} 
</script>