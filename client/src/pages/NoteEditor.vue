<script lang="ts" setup>
import { useNote } from '@stores';
import { ChevronLeft } from '@vicons/fa';
import { ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { marked } from 'marked';
import throttle from 'lodash.throttle';
import { xss } from '../utils';

const m = marked.setOptions({ mangle: false, headerIds: false });
const note = ref({
  content: ''
});

const route = useRoute();
const { getNoteInfo, updateNote } = useNote();
const { data, fetching } = getNoteInfo(route.params.id as string);

const isPreview = ref(true);
const isSaved = ref(false);

watchEffect(() => {
  if (data.value?.getNote) {
    note.value.content = data.value.getNote.content;
  }
});

const isUpdating = ref(false);

const executeUpdate = throttle(() => {
  updateNote({
    content: note.value.content,
    id: route.params.id as string
  }).then(_result => {
    isSaved.value = true;
    isUpdating.value = false;
  });
}, 1500)

function runThrottled(){
  isUpdating.value = true;
  executeUpdate();
}
</script>

<template>
  <div class="main">
    <div class="top">
      <router-link :to="'/notes/' + route.params.notebookId">
        <n-icon size="30">
          <ChevronLeft />
        </n-icon>
      </router-link>
      <n-button @click="isPreview = !isPreview">Toggle Markdown Preview</n-button>
      <div>
        <div v-if="isUpdating"><n-spin size="small"></n-spin></div>
        <div v-else>
          <div v-if="isSaved">Saved</div>
        </div>
      </div>
    </div>
    <div v-if="fetching"><CenteredSpin /></div>
    <div v-else class="md">
      <textarea 
        class="editor" 
        :style="{ backgroundColor: data?.getNote?.backgroundColor }" 
        v-model="note.content"
        @input="runThrottled"
      >
      </textarea>
      <!-- @vue-ignore -->
      <div 
        class="markdown" 
        :style="{ backgroundColor: data?.getNote?.backgroundColor, display: isPreview ? '' : 'none' }" 
        v-html="xss(m.parse(note.content))"
      >
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.main {
  padding: 2rem;
}
.editor {
  margin: 2rem;
  border: none;
  outline: none;
  resize: none;
  line-height: 1.5;
}

.editor, .markdown {
  color: black;
  font-size: 1rem;
  height: 600px;
  border-radius: 10px;
  padding: 1rem;
}

.markdown {
  padding-inline: 1.75rem;
  word-wrap: break-word;
  overflow-y: scroll;
}

.md {
  display: grid;
  grid-template-columns: repeat(auto-fit, 50%);
  align-items: center;
  justify-content: center;
}
</style>