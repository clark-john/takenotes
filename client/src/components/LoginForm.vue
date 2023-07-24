<script lang="ts" setup>
import { ref, Ref } from 'vue';
import { useRouter } from 'vue-router';
import { FormInst, FormRules, useMessage, useLoadingBar } from 'naive-ui';
import { useMutation } from '@urql/vue';
import { LoginDoc, LoginMutationVariables, LoginMutation } from '@generated';
import { addAntiSpecialChars, removeGraphqlBracket } from '../utils';

const message = useMessage();
const loading = useLoadingBar();
const router = useRouter();

const formRef: Ref<FormInst | null> = ref(null);

const loginValue = ref({
	username: '',
	password: ''
});

const { executeMutation: loginUser } = useMutation(LoginDoc);

const rules: FormRules = {
	username: [
		{
			required: true
		}
	],
	password: [
		{
			required: true
		}
	]
};

addAntiSpecialChars(rules);

const emit = defineEmits<{
	(e: 'registerForm'): void;
}>();

function login() {
	formRef.value?.validate(errs => {
		if (!errs) {
			loading.start();
			loginUser(loginValue.value as LoginMutationVariables).then(
				async result => {
					const errorMessage = removeGraphqlBracket(
						result.error?.message ?? ''
					);
					if (errorMessage) {
						loading.error();
						message.error(errorMessage, { duration: 1500 });
					} else {
						if (localStorage.getItem('token')) {
							localStorage.removeItem('token');
						}
						localStorage.setItem(
							'token',
							(result.data as LoginMutation).login.accessToken
						);
						loading.finish();
						router.push('/');
					}
				}
			);
		}
	});
}
</script>

<template>
	<n-card class="form" size="huge">
		<template #header>
			<span class="login">Login</span>
		</template>
		<n-form
			ref="formRef"
			:model="loginValue"
			size="medium"
			:rules="rules"
			:show-require-mark="false"
		>
			<n-form-item label="Username" path="username">
				<n-input
					size="large"
					placeholder="Enter username"
					v-model:value="loginValue.username"
				/>
			</n-form-item>
			<n-form-item label="Password" path="password">
				<n-input
					size="large"
					type="password"
					placeholder="Enter password"
					v-model:value="loginValue.password"
				/>
			</n-form-item>
			<!-- prettier-ignore -->
			<n-button 
				type="primary" 
				round 
				class="button" 
				@click="login"
			>
				Login
			</n-button>
			<div class="signup">
				Don't have one?
				<span
					@click="
						() => {
							emit('registerForm');
						}
					"
					>Create yours</span
				>
			</div>
		</n-form>
	</n-card>
</template>

<style lang="scss" scoped>
.form {
	width: 400px;
	span.login {
		font-size: 1.8rem;
	}
	.button {
		width: 100%;
		margin-block: 5px;
	}
	.signup {
		margin-block: 1.5rem 1rem;
		text-align: center;
		span {
			color: #63e2b7;
			transition: filter 150ms ease-in-out;
			&:hover {
				cursor: pointer;
				filter: brightness(0.7);
			}
		}
	}
	form {
		width: 100%;
		div.n-form-item {
			&:nth-child(1) {
				margin-bottom: 1rem;
			}
			&:nth-child(2) {
				margin-block: 1rem;
			}
		}
	}
}
</style>
