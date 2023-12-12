<template>
  <v-container fluid :style="{ 'margin-top': isMobile ? '48px' : '7vw' }">
    <!-- Notification -->
    <Notification />

    <v-row class="justify-center">
      <v-col cols="12" md="8">

        <!-- Welcome Message -->
        <v-row class="my-2 md:my-4">
          <v-col class="text-center" cols="12">
            <h1 class="text-center font-semibold text-lg mb-2 md:mb-4 mx-auto">
              Welcome to PromptGarage
            </h1>

            <p class="text-center text-sm">Fine-tune your creative genius.</p>
          </v-col>
        </v-row>

        <v-btn-toggle
          v-if="isMobile"
          v-model="selectedMode"
          mandatory
          style="margin-top: 20px"
          class="full-width-toggle mb-2"
        >
          <v-btn class="rounded" value="Diagnose" depressed>Diagnose</v-btn>
          <v-btn class="rounded" value="Tune-Up" depressed>Tune-Up</v-btn>
          <v-btn class="rounded" value="Customize" depressed>Customize</v-btn>
        </v-btn-toggle>

        <v-row
          class="mx-auto mb-2"
          :class="{ 'mt-16': !isMobile }"
          style="max-width: 750px"
        >
          <v-col cols="12">
            <div style="position: relative">
              <!-- Modes -->
              <v-btn-toggle
                v-if="!isMobile"
                v-model="selectedMode"
                mandatory
                style="position: absolute; top: -50px; right: 0"
                class="full-width-toggle mx-auto"
              >
                <v-btn
                  class="rounded"
                  value="Diagnose"
                  color="custom-dark-blue"
                  depressed
                >
                  Diagnose
                </v-btn>
                <v-btn
                  class="rounded"
                  value="Tune-Up"
                  color="custom-dark-blue"
                  depressed
                >
                  Tune-Up
                </v-btn>
                <v-btn
                  class="rounded"
                  value="Customize"
                  color="custom-dark-blue"
                  depressed
                >
                  Customize
                </v-btn>
              </v-btn-toggle>

              <v-textarea
                v-model="prompt"
                outlined
                rows="4"
                class="text-sm"
                placeholder="Your original prompt here"
              ></v-textarea>

              <div>
                <transition name="fade">
                  <v-btn
                    style="
                      position: absolute;
                      bottom: -10px;
                      left: 5px;
                      font-size: 0.65rem;
                      height: 27px;
                    "
                    :style="{ opacity: prompt ? 1 : 0 }"
                    small
                    color="blue lighten-1"
                    @click="copyText"
                  >
                    Copy
                  </v-btn>
                </transition>

                <!-- Clear button -->
                <v-btn
                  style="
                    position: absolute;
                    bottom: -10px;
                    right: 5px;
                    font-size: 0.65rem;
                    height: 27px;
                  "
                  small
                  color="yellow lighten-1"
                  @click="confirmClear"
                >
                  {{ enhancement || diagnosis ? 'Reset' : 'Clear' }}
                </v-btn>
              </div>
            </div>
          </v-col>
        </v-row>

        <Diagnose
          v-if="selectedMode === 'Diagnose'"
          :prompt="prompt"
          :diagnosis="diagnosis"
          :isMobile="isMobile"
          @diagnose="diagnosis = $event"
          @scroll="scrollToSection"
        />

        <TuneUp
          v-if="selectedMode === 'Tune-Up'"
          :prompt="prompt"
          :enhancement="enhancement"
          :isMobile="isMobile"
          @tuneup="enhancement = $event"
          @scroll="scrollToSection"
        />

        <Customize
          v-if="selectedMode === 'Customize'"
          :prompt="prompt"
          :diagnosis="diagnosis"
          :isMobile="isMobile"
          @customize="diagnosis = $event"
          @scroll="scrollToSection"
          @update-prompt="updatePrompt"
        />
      </v-col>
    </v-row>
  </v-container>

  <!-- Clear Confirmation Dialog -->
  <v-dialog v-model="showClearDialog" persistent max-width="290">
    <v-card>
      <v-card-title class="headline">{{ action }} Input</v-card-title>
      <v-card-text>
        Are you sure you want to {{ action.toLowerCase() }}
        {{
          this.enhancement || this.diagnosis ? 'your work so far' : 'the input'
        }}?
      </v-card-text>
      <v-card-actions>
        <v-btn text @click="showClearDialog = false">Cancel</v-btn>
        <v-btn text color="red lighten-1" @click="clearInput"
          >Yes, {{ action }}</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Diagnose from './Diagnose.vue';
import TuneUp from './TuneUp.vue';
import Customize from './Customize.vue';
import Notification from './Notification.vue';

export default {
  components: {
    TuneUp,
    Diagnose,
    Customize,
    Notification,
  },
  created() {
    window.addEventListener('load', () => {
      window.Clerk.addListener(({ user }) => {
        const action = user ? 'login' : 'logout';

        this.$store.commit(action);

        if (action === 'login') {
          this.$store.dispatch('alert', 'Welcome!');
        }
      });
    });
  },
  mounted() {
    this.checkMobile();
    window.addEventListener('resize', this.checkMobile);
    this.setupCustomizedPrompt();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.checkMobile);
  },
  data() {
    return {
      user: null,
      prompt: '',
      customizedPrompt: null,
      options: ['Paragraph', 'Structured'],
      showClearDialog: false,
      modes: ['Diagnose', 'Tune-Up', 'Customize'],
      selectedMode: 'Tune-Up',
      enhancement: '',
      diagnosis: null,
      isMobile: window.innerWidth <= 768,
      drawer: false,
    };
  },
  methods: {
    clearInput() {
      if (this.enhancement || this.diagnosis) {
        this.enhancement = '';
        this.diagnosis = null;

        this.setupCustomizedPrompt();
      } else {
        this.prompt = '';
      }

      this.showClearDialog = false;
    },
    setupCustomizedPrompt() {
      this.customizedPrompt = {
        strategy: '',
        role: '',
        context: '',
        task: '',
        instructions: '',
        goal: '',
        audience: '',
        format: '',
        examples: '',
      };
    },
    confirmClear() {
      this.setupCustomizedPrompt();

      if (!this.prompt) return;

      this.showClearDialog = true;
    },
    checkMobile() {
      this.isMobile = window.innerWidth <= 768;
    },
    scrollToSection(ref) {
      this.$nextTick(() => {
        if (ref && ref.$el) {
          const elementPosition =
            ref.enhancedSection.$el.getBoundingClientRect().top;
          const offsetPosition = elementPosition - 60;

          window.scrollBy({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }
      });
    },
    copyText() {
      navigator.clipboard.writeText(this.prompt);
      this.$store.dispatch('alert', 'Copied!');
    },
    setupDemo() {
      this.user = {
        id: 'demo',
      };

      this.$store.dispatch('login');
    },
    updatePrompt({ key, ...prompt }) {
      this.customizedPrompt[key] = prompt[key].value;

      this.prompt = this.shownPrompt;
    },
  },
  computed: {
    action() {
      return this.enhancement || this.diagnosis ? 'Reset' : 'Clear';
    },
    shownPrompt() {
      const combinedPrompt = [
        this.customizedPrompt?.strategy,
        this.customizedPrompt?.role,
        this.customizedPrompt?.context,
        this.customizedPrompt?.task,
        this.customizedPrompt?.instructions,
        this.customizedPrompt?.goal,
        this.customizedPrompt?.audience,
        this.customizedPrompt?.format,
        this.customizedPrompt?.examples,
      ]
        .filter((p) => p)
        .join('. ');

      return combinedPrompt || this.prompt;
    }
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s; 
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}


:root {
  --custom-dark-blue: #031a40;
}


.full-width-toggle {
  width: 100%;
  border: none; 
  background-color: transparent; 
  padding: 0;
}

.full-width-toggle .v-btn {
  width: 33.33%;
  justify-content: center; 
  background-color: transparent; 
  color: var(--custom-dark-blue);
  border: none;
}

.full-width-toggle .v-btn--active {
  background-color: var(--custom-dark-blue);
}


.full-width-toggle .v-btn {
  width: 33.33%;
  justify-content: center; 
}

@media (max-width: 768px) {
  h1 {
    font-size: 1.8rem; 
    margin-top: 0.5rem; 
    margin-bottom: 100px;
    display: inline-block;
  }

  .full-width-toggle {
    padding: 0 5%;
  }
}
</style>
