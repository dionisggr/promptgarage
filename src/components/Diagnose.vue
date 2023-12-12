<template>
  <LoadingButton
    class="px-4 my-10 mb-12 mx-auto"
    style="display: block"
    label="Scan"
    :loading="isLoading"
    @click="getData"
  />

  <div v-if="diagnosis" class="flex flex-col items-center">
    <v-card
      class="report-card mb-6 px-6 w-full mx-auto rounded-xl"
      max-width="850px"
      elevation="4"
    >
      <!-- Title -->
      <h2 class="text-center my-8" style="font-size: 1.75rem">Prompt Health</h2>

      <div class="score-badge text-center mx-auto my-4">
        Score: {{ getAverageScore().toFixed(2) }}%
      </div>

      <v-row class="mx-4" ref="diagnosisSection">
        <v-col
          v-for="(group, label) in categorizedDiagnosis"
          :key="label"
          cols="12"
        >
          <div
            v-if="group.length"
            style="min-height: 125px; margin-bottom: 2rem"
          >
            <h3 class="text-center mb-6" style="font-size: 1.5rem">
              {{ label }}
            </h3>

            <v-row>
              <v-col
                v-for="item in group"
                :key="item.key"
                cols="12"
                md="6"
                style="padding: 0 0.5rem"
              >
                <!-- Category -->
                <v-card
                  :color="getBackgroundColor(item.score)"
                  class="rounded-lg hover:shadow-lg transition mb-4 p-4"
                >
                  <v-card-title>
                    <div class="flex justify-between w-full">
                      <div>
                        {{ item.key[0].toUpperCase() + item.key.slice(1) }}
                      </div>
                    </div>
                  </v-card-title>
                  <v-card-subtitle class="font-bold text-xl">{{
                    item.value || 'N/A'
                  }}</v-card-subtitle>
                  <v-card-text class="font-italic text-sm">{{
                    item.tip
                  }}</v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </div>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import LoadingButton from './LoadingButton.vue';
import data from '../data';

export default {
  components: {
    LoadingButton,
  },
  props: {
    prompt: {
      type: String,
      default: '',
    },
    diagnosis: {
      type: Object,
    },
    isMobile: {
      type: Boolean,
    },
  },
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    async getData() {
      this.isLoading = true;

      try {
        const diagnosis = data.diagnosis;

        this.$emit('diagnose', diagnosis);
        this.scrollToDiagnosis();
      } catch (error) {
        this.$store.dispatch('alert', error.message || error);
      } finally {
        this.isLoading = false;
      }
    },
    getAverageScore() {
      let totalScore = 0;
      let itemCount = 0;

      for (let key in this.diagnosis) {
        if (this.diagnosis[key].score !== undefined) {
          totalScore += this.diagnosis[key].score;
          itemCount++;
        }
      }

      console.log('totalScore', totalScore);

      console.log(totalScore / itemCount);
      return totalScore / itemCount;
    },
    getBackgroundColor(score) {
      if (score > 90) return 'green darken-4';
      if (score > 80) return 'green lighten-2';
      if (score > 70) return 'yellow lighten-3';
      if (score > 60) return 'orange lighten-2';
      return 'red lighten-1';
    },
    scrollToDiagnosis() {
      const space = this.isMobile ? 190 : 225;
      this.$nextTick(() => {
        if (this.$refs.diagnosisSection && this.$refs.diagnosisSection.$el) {
          const elementPosition =
            this.$refs.diagnosisSection.$el.getBoundingClientRect().top;
          const offsetPosition = elementPosition - space; 

          window.scrollBy({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }
      });
    },
  },
  computed: {
    categorizedDiagnosis() {
      let categories = {
        Pass: [],
        'Recommended Action': [],
        'Needs Attention': [],
      };

      for (let key in this.diagnosis) {
        if (this.diagnosis[key].score >= 90)
          categories['Pass'].push({ key, ...this.diagnosis[key] });
        else if (this.diagnosis[key].score >= 80)
          categories['Recommended Action'].push({
            key,
            ...this.diagnosis[key],
          });
        else if (this.diagnosis[key].score <= 70)
          categories['Needs Attention'].push({ key, ...this.diagnosis[key] });
      }

      return categories;
    },
  },
};
</script>

<style scoped>
@media (min-width: 768px) {
  .v-col {
    align-items: flex-start;
  }

  @media (min-width: 768px) {
    .v-col {
      align-items: flex-start;
    }
  }

  .report-card {
    min-height: 250px;
  }
}

.score-badge {
  text-align: center;
  background-color: #1976d2;
  color: white;
  padding: 8px 16px;
  border-radius: 15px;
  font-size: 1.25em;
  margin: 10px auto;
  display: block;
  width: fit-content;
  font-weight: bold;
}
</style>
