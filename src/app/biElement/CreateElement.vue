<template>
    <div class="container" v-if="setupComplete">
        <ElementSidebar />
        <div class="card whiteboard">
            <Splitter style="height: 300px; margin-top: 20px;">
                <template v-for="(panel, index) in panels" :key="index">
                    <SplitterPanel :size="panel.size" class="panel-drop-area" @dragover.prevent @drop="handleDrop($event, panel)">
                        <component :is="panel.sidebarItem.type" v-if="panel.setupComplete" class="sidebar-item"></component>
                        <Button
                            v-if="panel.setupComplete"
                            type="button"
                            label="刪除元件"
                            severity="danger"
                            size="small"
                            variant="outlined"
                            @click="clearPanel(panel)">
                        </Button>
                    </SplitterPanel>
                </template>
            </Splitter>
            <Button
                v-tooltip.bottom="{
                    value: '請將所有區塊設定完成',
                    disabled: whiteboardValid
                }"
                type="button"
                label="儲存"
                style="margin-top: 20px"
                size="small"
                @click="saveWhiteboard"
                :disabled="!whiteboardValid">
            </Button>
        </div>
    </div>
    <Dialog
        v-model:visible="dialog.dialogVisible"
        modal
        :style="{ width: '25vw', backgroundColor: '#FFFFFF', color: '#000000' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
        :closable="false"
    >
        <div class="modal-header">
            <h4 class="modal-title">選擇頁籤</h4>
        </div>
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
        <div class="modal-footer">
            <button
                class="btn btn-primary"
                @click="dialog.dialogVisible = false; addPanel();">
                確認
            </button>
        </div>
    </Dialog>
    <Dialog
        v-model:visible="dialog.defSettingDialogVisible"
        modal
        :style="{ width: '25%', backgroundColor: '#FFFFFF', color: '#000000' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
        :closable="false">
            <div class="modal-header">
                <h4 class="modal-title">物件詳細資訊</h4>
            </div>
            <div class="tab-nav-pills">
                <ul class="nav nav-pills">
                    <li class="nav-item">
                        <a class="nav-link" :class="{ active: tab.currentTab === 'object-info' }" @click.prevent="tab.currentTab = 'object-info'" href="#">圖表設定</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" :class="{ active: tab.currentTab === 'data-source' }" @click.prevent="tab.currentTab = 'data-source'" href="#">資料來源設定</a>
                    </li>
                </ul>
                <div class="tab-content">
                    <div class="tab-pane fade show active" v-show="tab.currentTab === 'object-info'">
                        <label class="form-label"> 元件名稱</label>
                        <div class="card-body">
                            <input name="" class="form-control" id="" type="text" size="15" maxlength="10" value="" v-model="form.objectName" placeholder="請輸入元件名稱">
                        </div>
                        <label class="form-label"> 元件描述</label>
                        <div class="card-body">
                            <input name="" class="form-control" id="" type="text" size="15" maxlength="10" value="" v-model="form.objectDesc" placeholder="請輸入元件描述">
                        </div>
                    </div>
                    <div class="tab-pane fade show active" v-show="tab.currentTab === 'data-source'">
                        <label class="form-label"> 資料來源</label>
                        <select name="" class="form-select" v-model="form.selectedAnalysis">
                            <option disabled>--</option>
                            <option v-for="option in analysisOptions" :key="option.analysisName" :value="option.analysisName">
                                {{ option.analysisName }}
                            </option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button
                    class="btn btn-primary"
                    @click="dialog.defSettingDialogVisible = false; submit();"
                    :disabled="!form.objectName || !form.objectDesc || !form.selectedAnalysis">
                    確認
                </button>
            </div>
    </Dialog>
</template>

<script>
import { createSplitterTemplate } from './utils/SplitterFactory.js';
import ElementSidebar from './components/ElementSidebar.vue';
import BarChart from './components/BarChart.vue';
import LineChart from './components/LineChart.vue';
import PieChart from './components/PieChart.vue';
import Table from './components/Table.vue';
import Icon1by1 from '../../assets/Icon1by1.svg'
import Icon1by2 from '../../assets/Icon1by2.svg'
import Icon1by3 from '../../assets/Icon1by3.svg'
import { tab } from '@primeuix/themes/aura/tabs';

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
            tab: {
                currentTab: 'object-info'
            },
            dialog: {
                dialogVisible: false,
                defSettingDialogVisible: false,
            },
            form: {
                objectName: '',
                objectDesc: '',
                selectedAnalysis: null
            },
            selected: '1by1',
            ops: [
                { value: '1by1', label: '1X1', src: Icon1by1 },
                { value: '1by2', label: '1X2', src: Icon1by2 },
                { value: '1by3', label: '1X3', src: Icon1by3 }
            ],
            panels: null,
            analysisOptions: [
                {
                    analysisName: 'Example',
                },
                {
                    analysisName: 'Example2',
                },
                {
                    analysisName: 'Example3',
                }
            ],
            setupComplete: false,
            currentPanel: null,
        }
    },
    mounted() {
        this.dialog.dialogVisible = true;
    },
    computed: {
        whiteboardValid() {
            return this.panels && this.panels.length > 0 && this.panels.every(panel => panel.setupComplete);
        }
    },
    methods: {
        addPanel () {
            if (!this.setupComplete) {
                this.panels = createSplitterTemplate(this.selected);
                this.setupComplete = true;
            }
        },
        clearPanel(panel) {
            panel.sidebarItem.type = null;
            panel.sidebarItem.type_str = '';
            panel.sidebarItem.def = null;
            panel.setupComplete = false;
        },
        handleDrop(event, panel) {
            const item = JSON.parse(event.dataTransfer.getData('item'));
            if (item && item.source === 'element-sidebar') {
                this.currentPanel = panel;
                this.currentPanel.setupComplete = false;
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
                this.dialog.defSettingDialogVisible = true;
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
            // Reset form
            this.form.objectName = '';
            this.form.objectDesc = '';
            this.form.selectedAnalysis = null;
            this.tab.currentTab = 'object-info';
        },
        saveWhiteboard() {
            if (!this.whiteboardValid) {
                return;
            }

            const whiteboardData = {
                elementName: 'New Element',
                elementType: this.panels.length,
                elementCells: this.panels.map(panel => ({
                    cellIndex: panel.cellIndex,
                    cellType: panel.sidebarItem.type_str,
                    definition: panel.sidebarItem.def
                }))
            }

            console.log('Saving whiteboard data:', whiteboardData);

            // fetch('http://localhost:8080/api/v1/BI/element', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(whiteboardData)
            // })
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
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    background-color: #E7E7E7;
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