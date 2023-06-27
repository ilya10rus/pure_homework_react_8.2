export const requestDeleteCurrentTask = (id, refresh) => {
	fetch(`http://localhost:3004/todos/${id}`, {
		method: 'DELETE',
	}).finally(refresh());
};