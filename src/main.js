import { createApp } from "vue";
import App from "./App.vue";

import { str1 } from "./str";
import { str2 } from "./str";
import { messageOutput } from "./alert";

messageOutput(`${str1} ${str2}`);
messageOutput(`Good job`);

createApp(App).mount("#app");
