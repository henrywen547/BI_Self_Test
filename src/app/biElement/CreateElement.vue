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
        :style="{ width: '25vw' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
        :closable="false"
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
        header="物件詳細資訊"
        :style="{ width: '25%' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
        :closable="false">
        <Tabs value="0">
                <TabList>
                    <Tab value="0">圖表設定</Tab>
                    <Tab value="1">來源資料設定</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel value="0">
                        <label for="objectname">元件名稱:</label>
                        <InputText id="objectname" v-model="form.objectName"/>
                        <br />
                        <label for="objectdesc">元件描述:</label>
                        <InputText id="objectdesc" v-model="form.objectDesc"/>
                    </TabPanel>
                    <TabPanel value="1">
                        <Select
                            v-model="form.selectedAnalysis"
                            :options="analysisOptions"
                            variant="filled"
                            showClear
                            optionLabel="analysisName"
                            placeholder="選擇資料來源"
                            class="w-full md:w-56"
                        ></Select>
                    </TabPanel>
                </TabPanels>
            </Tabs>    
            <div class="button-row">
                <Button
                    type="button"
                    label="儲存"
                    size="small"
                    @click="defSettingDialogVisible = false;
                    submit();"
                    :disabled="!form.objectName || !form.objectDesc || !form.selectedAnalysis"
                ></Button>
            </div>
    </Dialog>
</template>

<script>
import { ref } from 'vue'
import { createSplitterTemplate } from './utils/SplitterFactory.js';
import ElementSidebar from './components/ElementSidebar.vue';
import BarChart from './components/BarChart.vue';
import LineChart from './components/LineChart.vue';
import PieChart from './components/PieChart.vue';
import Table from './components/Table.vue';
import Icon1by1 from '../../assets/Icon1by1.svg'
import Icon1by2 from '../../assets/Icon1by2.svg'
import Icon1by3 from '../../assets/Icon1by3.svg'

export default {
    components: {
        ElementSidebar,
        BarChart,
        LineChart,
        PieChart,
        Table,
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
            form: {
                objectName: '',
                objectDesc: '',
                selectedAnalysis: null
            },
            analysisOptions: ref([
                {
                    analysisName: 'Example',
                },
                {
                    analysisName: 'Example2',
                },
                {
                    analysisName: 'Example3',
                }
            ]),
            setupComplete: ref(false),
            currentPanel: ref(null),
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
                    panel.sidebarItem.type_str = 'LineChart';
                } else if (item.type === 'pie') {
                    panel.sidebarItem.type = PieChart;
                    panel.sidebarItem.type_str = 'PieChart';
                } else if (item.type === 'table') {
                    panel.sidebarItem.type = Table;
                    panel.sidebarItem.type_str = 'Table';
                }
                this.currentPanel = panel;
                this.defSettingDialogVisible = true;
            }
        },
        submit() {
            if (!this.form.objectName || !this.form.objectDesc || !this.form.selectedAnalysis) {
                return;
            }
            this.currentPanel.sidebarItem.def = {
                objectName: this.form.objectName,
                objectDesc: this.form.objectDesc,
                selectedAnalysis: this.form.selectedAnalysis
            }
            this.currentPanel.setupComplete = true;
            console.log(this.panels);
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