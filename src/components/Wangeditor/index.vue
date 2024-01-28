<template>
  <div style="border: 1px solid #ccc">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <Editor
      style="height: 500px; overflow-y: hidden"
      v-model="valueHtml"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="handleCreated"
      @onChange="handleChange"
    />
  </div>
</template>
<script setup lang="ts">
import { onBeforeUnmount, shallowRef, watch } from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import "@wangeditor/editor/dist/css/style.css"; // 引入 css

interface Props {
  modelValue: string;
}
const mode = ref("default");
const editorRef = shallowRef();
const valueHtml = ref("");
const toolbarConfig = ref({});
const editorConfig = ref({ placeholder: "请输入内容" });
const props = withDefaults(defineProps<Props>(), {
  modelValue: "",
});
const emit = defineEmits(["update:modelValue"]);

const handleCreated = (editor: any) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};

watch(
  () => props.modelValue,
  () => {
    valueHtml.value = props.modelValue;
  }
);

const handleChange = () => {
  emit("update:modelValue", valueHtml.value);
};

// 组件销毁前
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});
</script>
