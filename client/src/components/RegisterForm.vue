<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import {
	FormInst,
	FormRules,
	FormItemRule,
	useLoadingBar,
	useMessage
} from 'naive-ui';
import { useMutation } from '@urql/vue';
import { RegisterDoc, RegisterMutation } from '@generated';
import { addAntiSpecialChars, removeGraphqlBracket } from '../utils';

const loading = useLoadingBar();
const message = useMessage();
const router = useRouter();

const formRef = ref<FormInst | null>(null);

interface Form {
	firstName: string;
	lastName?: string;
	username: string;
	password: string;
	confirmPassword?: string;
}

const formValues = ref<Form>({
	firstName: '',
	lastName: '',
	username: '',
	password: '',
	confirmPassword: ''
});

const { executeMutation: register } = useMutation(RegisterDoc);

const rules: FormRules = {
	firstName: [{ required: true, message: 'First name is required' }],
	lastName: [],
	username: [
		{
			required: true,
			min: 3
		}
	],
	password: [
		{
			min: 8,
			required: true
		}
	],
	confirmPassword: [
		{
			validator: (_rule: FormItemRule, val: string) => {
				if (formValues.value.password !== val) {
					return new Error("Passwords doesn't match");
				}
				return true;
			}
		}
	]
};
addAntiSpecialChars(rules);

const emit = defineEmits<{
	(e: 'loginForm'): void;
}>();

function registerUser() {
	formRef?.value?.validate(errs => {
		if (!errs) {
			loading.start();
			register(formValues.value).then(result => {
				if (result.data) {
					localStorage.setItem(
						'token',
						(result.data as RegisterMutation).register.accessToken
					);
					loading.finish();
					router.push('/').then(() => {
						message.success('Successfully registered');
					});
				} else {
					loading.error();
					message.error(removeGraphqlBracket(result.error!.message!), {
						duration: 1500
					});
				}
			});
		}
	});
}
</script>

<template>
	<n-card class="form" size="huge">
		<template #header>
			<span class="register">Register</span>
		</template>
		<n-form
			ref="formRef"
			:show-require-mark="false"
			:rules="rules"
			size="medium"
			:model="formValues"
		>
			<div class="full-name">
				<n-form-item label="First name" path="firstName">
					<n-input
						v-model:value="formValues.firstName"
						placeholder="First name"
					/>
				</n-form-item>
				<n-form-item label="Last name" path="lastName">
					<n-input
						v-model:value="formValues.lastName"
						placeholder="Last name (Optional)"
					/>
				</n-form-item>
			</div>
			<n-form-item label="Username" path="username">
				<n-input v-model:value="formValues.username" placeholder="Username" />
			</n-form-item>
			<n-form-item label="Password" path="password">
				<n-input
					v-model:value="formValues.password"
					placeholder="Password"
					type="password"
				/>
			</n-form-item>
			<n-form-item label="Confirm password" path="confirmPassword">
				<n-input
					v-model:value="formValues.confirmPassword"
					placeholder="Confirm password"
					type="password"
				/>
			</n-form-item>
		</n-form>
		<n-button type="primary" round class="button" @click="registerUser">
			Register
		</n-button>
		<div class="login">
			Already have an account? <span @click="emit('loginForm')">Log in</span>
		</div>
	</n-card>
</template>

<style lang="scss" scoped>
.form {
	width: 400px;
	span.register {
		font-size: 1.8rem;
	}
	.full-name {
		display: flex;
		gap: 10px;
	}
	.button {
		width: 100%;
	}
	.login {
		span {
			color: #63e2b7;
			transition: filter 150ms ease-in-out;
			&:hover {
				cursor: pointer;
				filter: brightness(0.7);
			}
		}
		text-align: center;
		margin-block: 1.5rem 1rem;
	}
	.n-form-item {
		margin-block: 7px;
	}
	.full-name {
		.n-form-item {
			margin-block: 0 7px;
		}
	}
}
</style>
