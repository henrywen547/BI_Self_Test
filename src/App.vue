<script setup>
import { ref } from 'vue';
import InputText from 'primevue/inputtext';

const dialogVisible = ref(false);
const selectedItem = ref(null);
const tabTitle = ref("");
const radio = ref([
  { label: "水平", value: "horizontal" },
  { label: "垂直", value: "vertical" },
  { label: "嵌套", value: "tree" }
])

const tabItems = ref([]);
const currentTab = ref("0");

const removeTab = (idx) => {
  tabItems.value.splice(idx, 1);

  // Reset currentTab if the removed tab was the current one
  if (!tabItems.value.find(item => item.value === currentTab.value)) {
    currentTab.value = tabItems.value[0]?.value ?? "";
  }
};

let tabCount = ref(0);
const addTab = () => {
  if (tabTitle.value.trim() === "") {
    alert("請輸入頁籤名稱");
    return;
  }
  tabCount.value++;
  const componentName = () => {
    switch (selectedItem.value) {
      case "水平":
        return "HorizontalTab";
      case "垂直":
        return "VerticalTab";
      case "嵌套":
        return "TreeTab";
      default:
        return "HorizontalTab";
    }
  }
};
</script>

<template>
  <p class="T1">Test</p>
  <Toolbar>
    <template #end>
      <Button label="新增頁籤" icon="pi pi-plus" @click="dialogVisible=true" severity="secondary" iconPos="right"/>
    </template>
  </Toolbar>
  <Dialog
    v-model:visible="dialogVisible"
    modal
    header="選擇頁籤"
    :style="{ minWidth: '25rem' }"
  >
    <div class="flex items-center gap-4 mb-4">
      <label for="tabTitle" class="font-semibold w-24">頁籤名稱：　</label>
      <InputText
        id="tabTitle"
        v-model="tabTitle"
        class="flex-auto"
        autocomplete="off"
        placeholder="請輸入頁籤名稱"
      />
    </div>

    <label v-for="item in radio" :key="item.value">
      <div class="option-row">
        <RadioButton
          v-model="selectedItem"
          :inputId="item.value"
          :name="item.value"
          :value="item.label"
        />
        {{ item.label }}
      </div>
    </label>
    
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
          addTab();
          dialogVisible = false;
        "
      ></Button>
    </div>
  </Dialog>
  <template>
    <div class="card">
      <Tabs v-model:value="currentTab">
        <TabList>
          <VueDraggable
            v-model="tabItems"
            tag="div"
            class="flex"
            :animation="200"
            item-key="value"
          >
            <template #item="{ element, index }">
              <Tab :value="element.value">
                {{ element.label }}
              </Tab>
            </template>
          </VueDraggable>
        </TabList>
        <TabPanels>
          <TabPanel
            v-for="item in tabItems"
            :key="item.value"
            :value="item.value"
          >
            <component :is="item.component" />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  </template>
</template>

<style scoped>
.T1 {
  font-size: 25px;
}
/* 讓每個選項間距拉開 */
.option-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 5rem;
}

/* 最後一個選項不要有 margin-bottom */
.option-row:last-child {
  margin-bottom: 0;
}

.button-row {
  display: flex;
  justify-content: flex-end;
  width: 100%;
}
</style>