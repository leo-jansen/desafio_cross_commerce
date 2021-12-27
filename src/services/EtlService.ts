import axios from "axios";
import { EtlModel } from "../model/EtlModel";

const instance = axios.create({
	baseURL: "http://challenge.dienekes.com.br",
	timeout: 3000,
	headers: { "Content-Type": "application/json" }
})

export class EtlService {
	async extract(listNumbers: Array<number>) {
		let index = 1;
		EtlModel.firstAccess = false;
		while (EtlModel.extract == false) {
			let resp = await instance
				.get(`/api/numbers?page=${index}`)
				.then(async res => {
					console.log(`requisição: http://challenge.dienekes.com.br/api/numbers?page=${index}`)
					if (res.status == 200 && res.data['numbers'] != undefined) {
						if (res.data['numbers'].length == 0) {
							EtlModel.extract = true;
							if(EtlModel.firstOrder == true) {
								EtlModel.firstOrder = false;
								await this.sortNumbers();
							}
						} else {
							res.data['numbers'].forEach((element: string) => {
								listNumbers.push(Number(element));
							});
							index += 1;
						}
					}
				})
				.catch(erro => console.log(`Erro na requisição: http://challenge.dienekes.com.br/api/numbers?page=${index} \nRefazendo:`));
		}
	}

	async sortNumbers() {
		const model = new EtlModel();
		await model.mergeSort(EtlModel.listNumbers, 0, EtlModel.listNumbers.length);
		EtlModel.order = true;
	}
}