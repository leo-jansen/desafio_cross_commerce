import { Request, Response } from "express";
import logger from "../logger";
import { EtlModel } from "../model/EtlModel";
import { EtlService } from "../services/EtlService";

export class EtlController {
	async handle(request: Request, response: Response) {
		const service = new EtlService();
		if (EtlModel.extract == false && EtlModel.firstAccess == true ) {
			service.extractall();
			logger.trace("Resposta que a extração começou"); // começando a estração dos dados
			return response.status(200)
				.json({ "message": "Começando a extração dos dados, por favor faça a requisiçao mais tarde para receber os dados" });
		}
		else if (EtlModel.extract == false) {
			logger.trace("Resposta que a extração está em execução"); // extração dos dados em andamento
			return response.status(200)
				.json({ "message": "Extração de dados em execução, por favor faça a requisiçao mais tarde" });
		}
		else if (EtlModel.extract == true && EtlModel.order == false) {
			logger.trace("Resposta que a ordenação começou"); // ordenando os dados
			return response.status(200)
				.json({ "message": "Ordenando os dados, por favor faça a requisiçao mais tarde" });
		}
		else {
			logger.trace("Resposta da lista ordenada"); //extração e ordenação terminadas
			return response.status(200).json(EtlModel.listNumbers);
		}
	}
}