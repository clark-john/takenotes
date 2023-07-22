import { CombinedError } from '@urql/vue';
import { useDialog } from 'naive-ui';
import { Ref, watch } from 'vue';
import { Router, useRouter } from 'vue-router';

export const useSessionErrorDialog = (
	err: Ref<CombinedError | undefined>,
	onPositiveClick: (router: Router) => void
) => {
	const dialog = useDialog();
	const router = useRouter();

	return watch(err, val => {
		if (val) {
			dialog.error({
				title: 'Error',
				content: 'Session expired. Please relogin.',
				closable: false,
				onEsc() {
					return false;
				},
				onMaskClick(_e: any) {
					return false;
				},
				onPositiveClick(_e: MouseEvent) {
					onPositiveClick(router);
				},
				positiveText: 'Ok'
			});
		}
	});
};
