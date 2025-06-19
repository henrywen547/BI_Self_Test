<template>
    <div class="card flex justify-center">

        <Dialog
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
                    @click="submit()"
                    :disabled="!form.objectName || !form.objectDesc || !form.selectedAnalysis"
                ></Button>
            </div>
        </Dialog>
    </div>
</template>
<script>
import Dialog from "primevue/dialog";
import Tabs from 'primevue/tabs';
import Tab from 'primevue/tab';
import TabList from 'primevue/tablist';
import TabPanel from 'primevue/tabpanel';
import TabPanels from 'primevue/tabpanels';
import InputText from "primevue/inputtext";
import Select from 'primevue/select';
import Button from 'primevue/button';
export default {
    name: 'ObjectDetail',
    components: {
        Dialog,
        Tabs,
        Tab,
        TabList,
        TabPanel,
        TabPanels,
        InputText,
        Select,
        Button
    },
    props: {
        panel: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            analysisOptions:[
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
            form: {
                objectName: '',
                objectDesc: '',
                selectedAnalysis: null
            }
        }
    },
    methods: {
        submit() {
            if (!this.form.objectName || !this.form.objectDesc || !this.form.selectedAnalysis) {
                this.$toast.add({ severity: 'error', summary: '錯誤', detail: '請填寫所有必填欄位', life: 3000 });
                return;
            }
            this.panel.sidebarItem.def = {
                objectName: this.form.objectName,
                objectDesc: this.form.objectDesc,
                selectedAnalysis: this.form.selectedAnalysis
            }
            this.panel.setupComplete = true;
            this.$toast.add({ severity: 'success', summary: '成功', detail: '物件已儲存', life: 3000 });
            this.$emit('updatepanel', this.panel);
            this.$emit('close');
        }
    },
}
</script>
<style scoped>
.button-row {
    display: flex;
    justify-content: flex-end;
    width: 100%;
}
</style>