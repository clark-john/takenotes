import { authExchange } from "@urql/exchange-auth";
import { Router } from "vue-router";
// import { useMutation } from "@urql/vue";

const initializeAuthState = (): Promise<string> => {
	return new Promise((res, _rej) => {
		const token = localStorage.getItem("token");
		res(token || '');
	});
};

export const auth = (_baseUrl: string, router: Router) => authExchange(async utils => {
	const token = await initializeAuthState();
	return {
		addAuthToOperation(operation){
			// console.log(token);
			if (!token || token === 'undefined') {

				router.push("/login");
				return operation;
			}
			return utils.appendHeaders(operation, {
				Authorization: `Bearer ${token}`
			});
		},
		didAuthError(err, _operation){
			return err.message.includes("Unauthorized");
		},
		willAuthError(_operation){
			return false;
		},
		async refreshAuth(){
			// localStorage.removeItem("token");
			router.push("/login");
				// console.clear();

		/*	fetch(`${baseUrl}/refresh`, {
				method: "POST",
				credentials: "include"
			}).then(async x => {
				localStorage.setItem("token", (await x.json()).accessToken);
			}).catch(_err => {
				console.log("Login again");
			});*/
		},
	}
});
