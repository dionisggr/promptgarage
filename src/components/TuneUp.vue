<template>
  <div
    class="mx-auto"
    style="max-width: 750px"
    :style="enhancement && 'height: 112vh'"
  >
    <!-- Options & Enhance Buttons -->
    <v-row class="mt-4 mb-8 justify-center">
      <v-col class="text-center mb-4" cols="12" md="6">
        <v-btn-toggle v-model="selectedOption" mandatory>
          <v-btn value="paragraph" color="custom-dark-blue" depressed :style="isMobile && 'font-size: 0.85rem;'"
            >Paragraph</v-btn
          >
          <v-btn value="structured" color="custom-dark-blue" depressed :style="isMobile && 'font-size: 0.85rem;'"
            >Structured</v-btn
          >
        </v-btn-toggle>
      </v-col>
      <v-col class="text-center" cols="12" mt-2>
        <LoadingButton label="Boost" :loading="isLoading" @click="tuneup" />
      </v-col>
    </v-row>

    <!-- Enhanced Prompt -->
    <v-row v-if="enhancement" class="mb-2 mx-auto" ref="enhancedSection">
      <v-col cols="12">
        <h2 class="text-1xl text-center font-medium mb-4">Enhanced Prompt</h2>
        <p class="enhancement p-4 rounded-md" v-html="markdown(enhancement)"></p>
      </v-col>
    </v-row>

    <v-row v-if="enhancement" class="mb-4">
      <v-col class="text-right">
        <v-btn class="mr-2" color="blue-grey darken-1" @click="copyText"
          >Copy</v-btn
        >
        <v-btn @click="openTitleModal" color="custom-dark-blue">Save</v-btn>
      </v-col>
    </v-row>
  </div>

  <!-- Title Confirmation Modal -->
  <v-dialog v-model="showTitleModal" persistent max-width="400">
    <v-card>
      <v-card-title class="headline"
        >Save Title for Enhanced Prompt</v-card-title
      >
      <v-card-text>
        <v-text-field
          label="Title"
          v-model="title"
          outlined
          dense
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="saveEnhancedPrompt"
          >Save</v-btn
        >
        <v-btn color="red darken-1" text @click="showTitleModal = false"
          >Cancel</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { marked } from 'marked';
import LoadingButton from './LoadingButton.vue';
import data from '../data';

export default {
  components: {
    LoadingButton,
  },
  props: {
    isMobile: {
      type: Boolean,
      default: false,
    },
    prompt: {
      type: String,
    },
    enhancement: {
      type: String,
    },
    user: {
      type: Object,
    },
  },
  mounted() {
    Object.assign(this.enhancement, data.tuneup)
  },
  data() {
    return {
      title: '',
      selectedOption: 'paragraph',
      isLoading: false,
      enhancedPrompt: {
        paragraph:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
        structured: {
          strategy: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          role: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          context: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          task: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
          instructions: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
          goal: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          audience: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          format: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          examples: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        },
      },
      showTitleModal: false,
    };
  },
  methods: {
    async tuneup() {
      this.isLoading = true;
      let result = this.enhancedPrompt[this.selectedOption]

      if (this.selectedOption === 'structured') {
        result = Object.entries(result).map(item => {
          return `**${item[0].toUpperCase()}**: ${item[1]}`
        }).join('\n\n')
      }

      this.$emit('tuneup', result);
      this.scrollToEnhancedSection();
      this.isLoading = false;
    },
    copyText() {
      navigator.clipboard.writeText(this.enhancement);
      this.$store.dispatch('alert', 'Copied!');
    },
    scrollToEnhancedSection() {
      const space = this.isMobile ? 80 : 40;

      this.$nextTick(() => {
        if (this.$refs.enhancedSection && this.$refs.enhancedSection.$el) {
          const elementPosition =
            this.$refs.enhancedSection.$el.getBoundingClientRect().top;
          const offsetPosition = elementPosition - space;

          window.scrollBy({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }
      });
    },
    openTitleModal() {
      if (!window.Clerk?.user?.id) {
        window.Clerk.openSignIn();
      } else {
        this.showTitleModal = true;
      }
    },
    saveEnhancedPrompt() {
      if (!this.title) {
        this.$store.dispatch('alert', 'Please enter a title.');
        return;
      }

      this.showTitleModal = false;

      data.prompts.push({
        id: data.prompts.length + 1,
        title: this.title,
        content: this.prompt,
        user_id: window.Clerk.user.id,
      });
      this.$store.dispatch('alert', 'Saved!');
    },
    markdown(text) {
      return marked.parse(text);
    },
  },
};
</script>

<style scoped>
.enhancement {
  line-height: 1.75rem;
}
</style>
