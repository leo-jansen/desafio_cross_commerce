import { Request, Response } from "express";
import { EtlModel } from "../model/EtlModel";

export class EtlController {
	async handle(request: Request, response: Response) {
		if (EtlModel.extract == false && EtlModel.first == true ) {
			return response.status(200)
				.json({ "message": "Começando a extração dos dados, por favor faça a requisiçao mais tarde para receber os dados" });
		}
		else if (EtlModel.extract == false && EtlModel.first == false) {
			return response.status(200)
				.json({ "message": "Extração de dados em execução, por favor faça a requisiçao mais tarde" });
		}
		else if (EtlModel.extract == true && EtlModel.order == false) {
			return response.status(200)
				.json({ "message": "Ordenando os dados, por favor faça a requisiçao mais tarde" });
		}
	}
}