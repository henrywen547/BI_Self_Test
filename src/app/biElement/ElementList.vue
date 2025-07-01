<template>
    <div>
        <div class="header">
            <h1>元件清單</h1>
            <router-link to="/">
                <Button type="button" label="首頁"></Button>
            </router-link>
        </div>

        <router-link to="/createElement">
            <Button type="button" label="新增元件"></Button>
        </router-link>

        <table>
            <thead>
                <tr>
                    <th>元件名稱</th>
                    <th>動作</th>
                </tr>
            </thead>
            
            <tbody>
                <tr v-for="element in elementList" :key="element.id">
                    <td>{{ element.elementName }}</td>
                    <td>
                        <Button type="button" label="編輯" @click="editElement(element.elementId)"></Button>
                        <Button type="button" label="查看" @click="viewElement(element.elementId)"></Button>
                        <Button type="button" label="刪除" @click="deleteElement(element.elementId)"></Button>
                    </td>
                </tr>
            </tbody>
        </table>

    </div>
</template>
<script>
export default {
    data () {
        return {
            elementList: []
        }
    },
    created () {
        this.fetchElementList()
    },
    methods: {
        async fetchElementList () {
            try {
                const response = await fetch('http://localhost:8080/api/v1/BI/elements', {
                    method: 'GET',
                    headers: { 'Content-Type' : 'application/json' }
                })
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                const data = await response.json()
                this.elementList = data.data
            }
            catch (error) {
                console.error('Error fetching element list:', error)
            }
        },

        editElement (elementId) {
            this.$router.push(`/editElement/${elementId}`)
        },

        viewElement (elementId) {
            this.$router.push(`/viewElement/${elementId}`)
        },

        async deleteElement (elementId) {
            try {
                const response = await fetch(`.../${elementId}`, {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' }
                })
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                this.fetchElementList() // Refresh the list after deletion
            } catch (error) {
                console.error('Error deleting element:', error)
            }
        }
    }
}
</script>