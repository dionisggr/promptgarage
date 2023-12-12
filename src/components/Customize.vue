<template>
  <LoadingButton
    class="px-4 my-12 mx-auto"
    style="display: block"
    label="Disassemble"
    :loading="isLoading"
    @click="getData"
  />

  <div v-if="diagnosis" class="flex flex-col items-center my-16">

    <!-- Title -->
    <h2 class="text-center my-8" style="font-size: 1.75rem">Prompt Shop</h2>

    <div class="score-badge-wrapper">
      <div class="score-badge text-center">
        Score: <span class="score">{{ getAverageScore().toFixed(2) }}%</span>
      </div>
    </div>
    <v-row
      class="flex flex-col items-center mx-auto"
      style="max-width: 750px"
      ref="customizationSection"
    >
      <v-col v-for="(item, key) in diagnosis" :key="key" cols="12">
        <div
          class="rounded-lg p-4 shadow-md bg-gray-200 transform hover:scale-105 transition-transform flex"
          style="white-space: normal"
        >
          <strong class="category block mb-2 ml-2"
            >{{ key[0]?.toUpperCase() + key?.slice(1) }}:
            {{ getSuggestionScore(key, item) }}</strong
          >

          <v-select
            v-model="selectedOptions[key].value"
            :items="getOptionSuggestions(item)"
            style="white-space: normal;"
          ></v-select>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import LoadingButton from './LoadingButton.vue';
import data from '../data';

export default {
  name: 'Customize',
  components: {
    LoadingButton,
  },
  data() {
    return {
      selectedOptions: {},
      isLoading: false,
      score: 0,
    };
  },
  props: {
    prompt: {
      type: String,
    },
    diagnosis: {
      type: Object,
    },
  },
  computed: {
    averageScore() {

    }
  },
  methods: {
    getAverageScore() {
      const scores = Object.values(this.diagnosis).map(props => {
        return props.score;
      });
      const sum = scores.reduce((a, b) => a + b, 0);
      return sum / scores.length;
    },
    async getData() {
      this.isLoading = true;

      try {
        const response = data.diagnosis;

        this.$emit('customize', response);
        this.scrollToCustomization();
      } catch (error) {
        this.$store.dispatch('alert', error.message || error);
      } finally {
        this.isLoading = false;
      }
    },
    getSelectedSuggestionScore(item, key) {
      const value = this.selectedOptions[key]?.split(' -- ')[0];
      const suggestion = item.suggestions.find((s) => s.value === value);
      return suggestion ? suggestion.score : item.suggestions[0].score;
    },

    getSelectedSuggestionExplanation(item, key) {
      const value = this.selectedOptions[key]?.split(' -- ')[0];
      const suggestion = item.suggestions.find((s) => s.value === value);
      return suggestion
        ? suggestion.explanation
        : item.suggestions[0].explanation;
    },
    scrollToCustomization() {
      this.$nextTick(() => {
        if (
          this.$refs.customizationSection &&
          this.$refs.customizationSection.$el
        ) {
          const elementPosition =
            this.$refs.customizationSection.$el.getBoundingClientRect().top;
          const offsetPosition = elementPosition - 230;

          window.scrollBy({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }
      });
    },
    getOptionSuggestions(option) {
      return option.suggestions?.map((s, i) => `${s.score}% -- ${s.value}`)
    },
    getSuggestionScore(key, item) {
      const match = item.suggestions.find(s => s.value === this.selectedOptions[key].value);

      return Number(match.score);
    },
  },
  watch: {
    diagnosis: {
      handler(newValue) {
        if (newValue) {
          for (let key in newValue) {
            this.selectedOptions[key] = { ...newValue[key].suggestions[0] };
          }
        }
      },
      immediate: true, 
    },
    selectedOptions: {
      handler(newOptions) {
        for (let key in newOptions) {
          if (newOptions[key].value?.includes('--')) {
            newOptions[key].value = newOptions[key].value.split(' -- ')[1];
            this.diagnosis[key].score = newOptions[key].score;

            this.$emit('update-prompt', {
              [key]: {
                value: newOptions[key].value,
                score: newOptions[key].score,
              },
              key,
            })
          }
        }
      },
      deep: true,
    },
  },
};
</script>

<style>
.v-select .v-select__selection-text {
  white-space: normal;
  text-overflow: unset;
}

.v-list-item-title {
  white-space: normal;
}

.category {
  font-size: 1.1rem;
}

.score-badge-wrapper {
  text-align: center;
  margin: 2.5rem 0;
}

.score-badge {
  display: inline-block;
  background-color: #f3f3f3;
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 0.5rem 1rem;
  font-size: 1rem;
}

.score {
  background-color: #007bff;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 10px;
  margin-left: 0.5rem;
}
</style>
