import { createApp } from 'vue'
import './style.css'

import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import App from './App.vue'

// 引入 PrimeVue 的按鈕
import Button from 'primevue/button';

// 引入 PrimeVue 的提示框
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";

// 引入 PrimeVue 的勾選項目
import Checkbox from 'primevue/checkbox';
import CheckboxGroup from 'primevue/checkboxgroup';
import RadioButton from 'primevue/radiobutton';

// PrimeVue 4.x 的元件必須在 main.js 用 app.component 全域註冊
import Splitter from 'primevue/splitter'
import SplitterPanel from 'primevue/splitterpanel'

// 引入 Vue Draggable Plus
import { VueDraggable } from 'vue-draggable-plus'

const app = createApp(App);

app.use(PrimeVue, { theme: Aura });

// 按鈕
app.component('Button', Button);
// 提示框
app.component('Dialog', Dialog);
// 輸入框
app.component('InputText', InputText);
// 勾選項目
app.component('Checkbox', Checkbox);
app.component('CheckboxGroup', CheckboxGroup);
app.component('RadioButton', RadioButton);
// 分割器
app.component('Splitter', Splitter);
app.component('SplitterPanel', SplitterPanel);
// Vue Draggable Plus
app.component('VueDraggable', VueDraggable);

app.mount('#app');
