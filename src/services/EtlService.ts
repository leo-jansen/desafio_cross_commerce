import axios from "axios";
import { EtlModel } from "../model/EtlModel";

const instance = axios.create({
	baseURL: "http://challenge.dienekes.com.br",
	timeout: 3000,
	headers: { "Content-Type": "application/json" }
})

export class EtlService {
	/*
	* retorna 0 se a requisição pegar numbers[] vazio
	* retorna 1 se a requisição pegar um numbers[] preenchido
	* retorna retorna o mesmo numero passado por parametro se der erro na requisição
	*/
	async extract(listNumbers: Array<number>, index: number): Promise<number> {
		EtlModel.firstAccess = false;
		let resp = await instance
			.get(`/api/numbers?page=${index}`)
			.then(async res => {
				console.log(`requisição: http://challenge.dienekes.com.br/api/numbers?page=${index}`)
				if (res.data['numbers'].length == 0) {
					EtlModel.extract = true;
					await this.sortNumbers();
					return 0;
				} else {
					res.data['numbers'].forEach((element: string) => {
						listNumbers.push(Number(element));
					});
					return index + 1;
				}
			})
			.catch(erro => {
				console.log(`Erro na requisição: http://challenge.dienekes.com.br/api/numbers?page=${index} \nRefazendo:`)
				return index;
			});
		return resp;
	}

	/*
	* extração de todos os dados
	*/
	async extractall() {
		let index = 1;
		while (index != 0) {
			index = await this.extract(EtlModel.listNumbers, index);
		}
	}

	/*
	* ordenação do array no EtlModel
	*/
	async sortNumbers() {
		const model = new EtlModel();
		await model.mergeSort(EtlModel.listNumbers, 0, EtlModel.listNumbers.length);
		EtlModel.order = true;
	}
}