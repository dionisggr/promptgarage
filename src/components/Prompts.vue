<template>
  <Notification />

  <h2 class="page-title">My Prompts</h2>

  <v-container class="prompts-container">
    <v-row>
      <!-- Prompt list -->
      <v-col :cols="isMobile ? '12' : '4'" class="prompt-list my-4">
        <v-list>
          <v-list-item-group
            v-if="prompts.length"
            v-model="selectedPromptIndex"
          >
            <v-list-item
              v-for="(prompt, index) in prompts"
              :key="index"
              @click="selectPrompt(index)"
              :class="{ 'selected-prompt': index === selectedPromptIndex }"
            >
              <v-card outlined class="mb-2">
                <v-card-content class="px-3 py-2">
                  <v-list-item-content>
                    <v-list-item-title class="text-center font-weight-bold">
                      <span>{{ prompt.title }}</span>
                    </v-list-item-title>
                    <v-list-item-subtitle class="px-4">{{
                      getTrimmedContent(prompt.content)
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-card-content>
              </v-card>
            </v-list-item>
          </v-list-item-group>
          <v-list-item v-else>
            <v-list-item-content>No prompts available</v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>

      <!-- Desktop View -->
      <v-col
        v-if="!isMobile"
        :cols="selectedPrompt ? '8' : '0'"
        class="desktop-view"
      >
        <v-card v-if="selectedPrompt" class="py-2 pt-4">
          <v-card-title v-if="!isEditing" class="font-bold mt-2">{{
            selectedPrompt.title
          }}</v-card-title>
          <v-text-field
            v-else
            v-model="editedPrompt.title"
            outlined
            dense
          ></v-text-field>

          <v-card-text v-if="!isEditing">{{
            selectedPrompt.content
          }}</v-card-text>
          <v-textarea
            v-else
            v-model="editedPrompt.content"
            outlined
            dense
            class="mb-3"
          ></v-textarea>
          <v-card-actions v-if="!isEditing" class="justify-center">
            <v-btn @click="copyPrompt">Copy</v-btn>
            <v-btn color="blue" @click="toggleIsEditing">Edit</v-btn>
            <v-btn color="red" @click="deletePrompt">Delete</v-btn>
          </v-card-actions>
          <v-card-actions v-else class="justify-center">
            <v-btn color="green" @click="saveEditedPrompt">Save</v-btn>
            <v-btn color="red" @click="toggleIsEditing">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <!-- Mobile View -->
      <v-dialog
        v-if="isMobile && selectedPrompt"
        v-model="mobileModal"
        max-width="500px"
      >
        <v-card>
          <v-card-title class="justify-center font-weight-bold text-h4">
            {{ selectedPrompt.title }}
            <v-spacer></v-spacer>
            <v-btn icon @click="mobileModal = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text>{{ selectedPrompt.content }}</v-card-text>
          <v-card-actions class="justify-center">
            <v-btn @click="copyPrompt">Copy</v-btn>
            <v-btn color="blue" @click="toggleIsEditing">Edit</v-btn>
            <v-btn color="red" @click="deletePrompt">Delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import Notification from './Notification.vue';
import data from '../data';

export default {
  components: {
    Notification,
  },
  mounted() {
    if (!window.Clerk.user?.id) {
      this.$router.push('/');
    } else {
      this.prompts = data.prompts.reverse();
    }
  },
  data() {
    return {
      prompts: [],
      selectedPromptIndex: null,
      mobileModal: false,
      windowWidth: 0,
      isEditing: false,
      editedPrompt: {
        title: '',
        content: '',
      },
    };
  },
  computed: {
    selectedPrompt() {
      return this.prompts[this.selectedPromptIndex] || null;
    },
    isMobile() {
      return this.windowWidth <= 768;
    },
  },
  methods: {
    selectPrompt(index) {
      this.selectedPromptIndex = index;
      if (this.isMobile) {
        this.mobileModal = true;
      }
    },
    saveEditedPrompt() {
      this.prompts[this.selectedPromptIndex] = this.editedPrompt;

      this.toggleIsEditing();
      this.$store.dispatch('alert', 'Prompt updated!');
    },
    getTrimmedContent(content) {
      const lines = content.split('\n').slice(0, 3);
      return lines.join('\n');
    },
    copyPrompt() {
      navigator.clipboard.writeText(
        this.prompts[this.selectedPromptIndex].content
      );
      this.$store.dispatch('alert', 'Copied!');
    },
    toggleIsEditing() {
      if (!this.isEditing) {
        Object.assign(this.editedPrompt, this.selectedPrompt);
      }

      this.isEditing = !this.isEditing;
    },
    deletePrompt() {
      if (confirm('Are you sure you want to delete this prompt?')) {
        this.prompts.splice(this.selectedPromptIndex, 1);
        this.selectedPromptIndex = null;
        this.$store.dispatch('alert', 'Prompt deleted!');
      }
    },
    updateWidth() {
      this.windowWidth = window.innerWidth;
    },
  },
  created() {
    window.addEventListener('resize', this.updateWidth);
    this.updateWidth();
  },
  destroyed() {
    window.removeEventListener('resize', this.updateWidth);
  },
};
</script>

<style scoped>
v-container {
  max-height: 100vh;
}

.prompt-list {
  border-right: 1px solid rgba(0, 0, 0, 0.12);
  height: 70vh;
  overflow-y: auto;
}

.scrollable-list {
  max-height: calc(100vh - 7rem - 3rem);
}

v-card-text {
  max-height: calc(100vh - 10rem);
  overflow-y: auto;
}

v-btn[absolute][top][left] {
  left: 9rem;
  top: 0;
  position: absolute;
}

.prompts-container {
  margin-top: 1rem;
  position: relative;
  max-width: 1200px;
  padding-top: 2rem;
  border-radius: 2rem;
  background: #fff;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  border: 1px solid #ddd;
  transform: translateZ(0);
}

.page-title {
  margin-top: 6rem;
  font-size: 2.25rem;
  text-align: center;
}

.desktop-view .v-card {
  padding: 1rem;
}

@media only screen and (max-width: 768px) {
  .prompt-list {
    border-right: none;
  }
}
</style>
