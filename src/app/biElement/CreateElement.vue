<template>
    <div class="container" v-if="setupComplete">
        <ElementSidebar />
        <div class="card whiteboard">
            <Splitter style="height: 300px; margin-top: 20px;">
                <template v-for="(panel, index) in panels" :key="index">
                    <SplitterPanel :size="panel.size" class="panel-drop-area" @dragover.prevent @drop="handleDrop($event, panel)">
                        <component :is="panel.sidebarItem.type" v-if="panel.setupComplete" class="sidebar-item"></component>
                    </SplitterPanel>
                </template>
            </Splitter>
        </div>
    </div>
        <Dialog
            v-model:visible="dialogVisible"
            modal
            header="選擇頁籤"
            :style="{ width: '25%' }"
        >
            <div
                v-for="option in ops"
                :key="option.value"
                class="template-option"
                :class="{ selected: selected === option.value }"
                @click="selected = option.value"
            >
                <img :src="option.src" alt="Icon" style="width: 80px;"/>
                <div class="template-label">
                    {{ option.label }}
                </div>
            </div>
            <div class="button-row">
                <Button
                    type="button"
                    label="取消"
                    severity="secondary"
                    size="small"
                    @click="dialogVisible = false"
                ></Button>
                <Button
                    type="button"
                    label="儲存"
                    size="small"
                    @click="
                        dialogVisible = false;
                        addPanel();
                    "
                ></Button>
            </div>
        </Dialog>
        <Dialog
            v-model:visible="defSettingDialogVisible"
            modal
            header="圖表元件設定"
            :style="{ width: '50%' }">
            <Tabs value="0">
                <TabList>
                    <Tab value="0">圖表設定</Tab>
                    <Tab value="1">來源資料設定</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel value="0">
                        <label for="elementname">元件名稱:</label>
                        <InputText id="elementname" />
                        <label for="elementdesc">元件描述:</label>
                        <InputText id="elementdesc" />
                    </TabPanel>
                    <TabPanel value="1">
                        <label for="datasource">資料來源:</label>
                        <InputText id="datasource" />
                        <label for="query">查詢語句:</label>
                        <InputText id="query" />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Dialog>
</template>

<script>
import { ref } from 'vue'
import { createSplitterTemplate } from './utils/SplitterFactory.js';
import ElementSidebar from './components/ElementSidebar.vue';
import BarChart from './components/BarChart.vue';
import Icon1by1 from '../../assets/Icon1by1.svg'
import Icon1by2 from '../../assets/Icon1by2.svg'
import Icon1by3 from '../../assets/Icon1by3.svg'

export default {
    components: {
        ElementSidebar,
        BarChart,
    },
    data () {
        return {
            dialogVisible: ref(false),
            defSettingDialogVisible: ref(false),
            selected: '1by1',
            ops: [
                { value: '1by1', label: '1X1', src: Icon1by1 },
                { value: '1by2', label: '1X2', src: Icon1by2 },
                { value: '1by3', label: '1X3', src: Icon1by3 }
            ],
            panels: ref(null),
            setupComplete: ref(false),
        }
    },
    mounted() {
        this.dialogVisible = true;
    },
    methods: {
        addPanel () {
            if (!this.setupComplete) {
                this.panels = createSplitterTemplate(this.selected);
                this.setupComplete = true;
            }
        },
        handleDrop(event, panel) {
            const item = JSON.parse(event.dataTransfer.getData('item'));
            if (item && item.source === 'element-sidebar') {
                if (item.type === 'bar') {
                    panel.sidebarItem.type = BarChart;
                    panel.sidebarItem.type_str = 'BarChart';
                } else if (item.type === 'line') {
                    panel.sidebarItem.type = LineChart;
                } else if (item.type === 'pie') {
                    panel.sidebarItem.type = PieChart;
                } else if (item.type === 'table') {
                    panel.sidebarItem.type = Table;
                }
                this.defSettingDialogVisible = true;
                panel.setupComplete = true;

                console.log(panel);
            }
        }
    },
}
</script>
<style scoped>
.container {
    display: flex;
    padding: 20px;
    gap: 20px;
    overflow-y: unset;
}
.whiteboard {
    flex-grow: 1;
    padding: 10px;
    border: 2px solid #ccc;
    border-radius: 8px;
    position: relative;
    overflow-y: auto;
}
.panel-drop-area {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: stretch;
    justify-content: center;
}
.template-selector {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
}
.template-option.selected {
    border-bottom: 2px solid green;
}
.button-row {
    display: flex;
    justify-content: flex-end;
    width: 100%;
}
.template-option {
    display: inline-block;
    flex-direction: column;
    align-items: center;
    width: 90px;
    cursor: pointer;
    margin: 10px;
}
.template-icon {
    width: 80px;
    height: 50px;
}
.template-label {
    margin-top: 5px;
    text-align: center;
}
.sidebar-item {
    background: white;
    padding: 5px;
    margin: 5px;
    border-radius: 4px;
    display: inline-block;
}
.box {
    height: 100%;
    background-color: #ccc;
    border: 1px solid #999;
}
</style>