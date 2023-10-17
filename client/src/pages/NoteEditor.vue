<script lang="ts" setup>
import { useNote } from '@stores';
import { ChevronBack } from '@vicons/ionicons5';
import { toBlob } from 'html-to-image';
import throttle from 'lodash.throttle';
import unip from 'universal-emoji-parser';
import { ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { isNotForCurrentUser, marked, xss } from '../utils';

const note = ref({
	content: ''
});

const noteRef = ref<HTMLDivElement>();

const route = useRoute();
const { getNoteInfo, updateNote } = useNote();
const { data, fetching } = getNoteInfo(route.params.id as string);

const isPreview = ref(true);
const isSaved = ref<"error" | "saved" | null>();

watchEffect(() => {
	if (data.value?.getNote) {
		note.value.content = data.value.getNote.content;
	}
});

const isUpdating = ref(false);
const isSavingImage = ref(false);

const executeUpdate = throttle(() => {
	updateNote({
		content: note.value.content,
		id: route.params.id as string
	}).then(({ data }) => {
		isSaved.value = data ? 'saved' : 'error';
		isUpdating.value = false;
	});
}, 1250);

function runThrottled() {
	isUpdating.value = true;
	executeUpdate();
}

async function saveAsImage(){
	isSavingImage.value = true;
	const blob = await toBlob(noteRef.value!, { 
		type: "image/png", 
		width: noteRef.value!.offsetWidth,
		style: { overflow: 'auto' }
	});
	const a = document.createElement("a");
	a.download = `note-${route.params.id}.png`;
	const objUrl = URL.createObjectURL(blob!);
	a.href = objUrl;
	a.click();
	a.remove();
	URL.revokeObjectURL(objUrl);
	isSavingImage.value = false;
}

function isDisabled(){
	return isNotForCurrentUser(data.value!.getNote!.userId)
}

</script>

<template>
	<div class="main">
		<div class="top">
			<router-link :to="'/notes/' + route.params.notebookId">
				<n-icon size="40">
					<ChevronBack />
				</n-icon>
			</router-link>
			<n-button @click="isPreview = !isPreview">
				Toggle Markdown Preview
			</n-button>
			<div>
				<div v-if="isUpdating"><n-spin size="small"></n-spin></div>
				<div v-else>
					<div v-if="isSaved === 'saved'">Saved</div>
					<div v-else-if="isSaved! === 'error'">Error</div>
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
				:disabled="isDisabled()"
			>
			</textarea>
			<div
				class="markdown"
				ref="noteRef"
				:style="{
					backgroundColor: data?.getNote?.backgroundColor,
					display: isPreview ? '' : 'none'
				}"
				v-html="xss(unip.parseToUnicode(marked.parse(note.content)))"
			></div>
		</div>
		<div v-if="data" class="note">
      <n-button 
        type="primary" 
        :disabled="!isPreview"
        @click="saveAsImage"
      >
        {{ isSavingImage ? "Saving" : "Save as Image" }}
      </n-button>
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

.editor,
.markdown {
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
