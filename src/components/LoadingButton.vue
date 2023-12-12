<template>
  <v-btn
    :loading="isLoading"
    color="custom-dark-blue"
    style="min-width: 150px"
  >
    <template v-slot:loader>
      <v-progress-circular
        indeterminate
        size="16"
        class="mr-2"
      ></v-progress-circular>
      <span class="body-2" style="font-size: 0.75rem">Loading...</span>
    </template>
    {{ label }}
  </v-btn>
</template>

<script>
export default {
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: '',
    }
  }
};
</script>
