import axios from 'axios';

const apiService = axios.create({
	baseURL: 'https://01cb-131-0-230-79.ngrok-free.app/',
});

export default apiService;

export interface ResponseAPI {
	ok?: boolean;
	code?: number;
	message?: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	data?: any;
}
