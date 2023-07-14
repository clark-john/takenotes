export function removeGraphqlBracket(message: string){
	return message.replace(/\[GraphQL\]\s*/, "");
}
