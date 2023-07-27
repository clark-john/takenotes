<template>
	<div>
		<TopPart text="Settings" />
		<div class="content">
			<div class="theme">Switch Theme: <ThemeSwitcher class="switch" /></div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.content {
	padding: 2rem 3rem;
	.theme {
		display: flex;
		align-items: center;
		gap: 10px;
		margin-inline: 2rem;
		font-size: 20px;
		.switch {
			font-size: 1rem;
		}
	}
}
</style>
