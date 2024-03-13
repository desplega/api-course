<template>
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
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { TailwindPagination } from 'laravel-vue-pagination';

const categories = ref({})
const products = ref({})

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

onMounted(() => {
    getCategories()
    getProducts()
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