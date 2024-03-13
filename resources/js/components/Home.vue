<template>
    Coming soon...
</template>
 
<script setup>
import { onMounted, ref } from 'vue';
 
const categories = ref({})
const products = ref({})
 
const getCategories = async () => {
    await axios.get('/api/categories') 
        .then(response => {
            categories.value = response.data.data
        })
        .catch((error) => console.log(error)) 
}
 
const getProducts = async () => {
    await axios.get('/api/products') 
        .then(response => {
            products.value = response.data.data
        })
        .catch((error) => console.log(error)) 
}
 
onMounted(() => {
    getCategories()
    getProducts()
})
</script>