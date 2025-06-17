<template>
    <div class="home">
        <router-link to="/elementList">
            <Button type="button" label="Element"></Button>
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'Home',
}
</script>

<style scoped>
.home {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 60px;
}
</style>