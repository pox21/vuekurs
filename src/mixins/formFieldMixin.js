import BaseFormField from "@/components/BaseFormField.vue";

export default {
  props: ["title", "type", "error", "placeholder", "value"],
  components: { BaseFormField },
  computed: {
    dataValue: {
      get() {
        return this.value;
      },
      set(value) {
        return this.$emit("update:value", value);
      },
    },
  },
};