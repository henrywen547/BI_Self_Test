<template>
    <div class="element-sidebar">
        <img src="../../../assets/sidebar-element.svg" alt="Element Sidebar Icon" class="sidebar-icon" />
        <h3>選項列表</h3>
        <!--chart-->
        <div v-for="group in chartGroups" :key="group.label" class="menu-group">
            <div class="menu-group-label" @click="toggle(group)">
                <i :class="group.icon"></i>
                {{ group.label }}
                <i :class="group.collapsed ? 'pi pi-chevron-right' : 'pi pi-chevron-down'"></i>
            </div>
            <div v-show="!group.collapsed" class="menu-group-items">
                <div
                    v-for="item in group.items"
                    :key="item.label"
                    class="menu-item"
                    draggable="true"
                    @dragstart="ondragStart($event, item)">
                    <i :class="item.icon"></i>
                    <span>{{ item.label }}</span>
                </div>
            </div>
        </div>
        <!--table-->
        <div class="menu-group">
            <div class="table-label" draggable="true" @dragstart="ondragStart($event, tableItem)">
                <i :class="tableItem.icon"></i>
                <span>{{ tableItem.label }}</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'ElementSidebar',
    data () {
        return {
            chartGroups: [
                {
                    label: '圖',
                    icon: 'pi pi-bars',
                    collapsed: false,
                    items: [
                        {
                            label: '長條圖',
                            type: 'bar',
                            icon: 'pi pi-chart-bar',
                        },
                        {
                            label: '折線圖',
                            type: 'line',
                            icon: 'pi pi-chart-line',
                        },
                        {
                            label: '圓餅圖',
                            type: 'pie',
                            icon: 'pi pi-chart-pie',
                        }
                    ]
                },
            ],
            tableItem: {
                            label: '表',
                            type: 'table',
                            icon: 'pi pi-table',
                        }
        }
    },
    methods: {
        toggle(group) {
            if (group.collapsed != null) {
                group.collapsed = !group.collapsed;
            }
        },
        ondragStart(event, item) {
            if (!item) {
                console.error('Item is undefined or null');
                return;
            }
            const source = 'element-sidebar';
            const dragItem = { ...item, source };
            event.dataTransfer.setData("item", JSON.stringify(dragItem));
        }
    },
}
</script>
<style scoped>
.element-sidebar {
    width: 150px;
    height: 350px;
    top: 0;
    left: 0;
    background: #f4f4f4ea;
    padding: 10px;
    border-radius: 8px;
}
.menu-group {
    margin-bottom: 8px;
    text-align: left;
}
.menu-group-label {
    font-weight: bold;
    cursor: pointer;
    padding: 4px 8px;
    display: flex;
    align-items: center;
}
.menu-group-label i {
    margin-right: 8px;
}
.menu-group-items {
    padding-left: 20px;
}

.menu-item {
    display: flex;
    align-items: center;
    padding: 4px 0;
    cursor: grab;
}

.table-label {
    font-weight: bold;
    display: flex;
    align-items: center;
    padding: 4px 8px;
    cursor: grab;
}

.table-label i {
    margin-right: 8px;
}

.menu-item i {
    margin-right: 6px;
}
</style>