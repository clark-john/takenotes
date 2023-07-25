<script lang="ts" setup>
import { FrownOpen } from '@vicons/fa';
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<template>
	<n-result 
		status="404" 
		title="404 Not Found" 
		description="We can't find the page you're looking for."
		style="margin-block: 2rem;"
	>
		<template #icon>
			<n-icon size="90">
				<FrownOpen />
			</n-icon>
		</template>
		<template #footer>
			<n-button @click="() => router.push('/')">Back To Home</n-button>
		</template>
	</n-result>
</template>
