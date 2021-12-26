export class EtlModel {
	static extract = false;
	static order = false;
	static firstAccess = true;
	static listNumbers: Array<number> = [];
	static firstExtract: boolean;

	/*
	* Merge Sort escolhido por ser um algoritmo estavel e garantir o desempenho n log n
	* explicação dos algoritmos de ordenação https://youtube.com/playlist?list=PL5TJqBvpXQv4l7nH-08fMfyl7aDFNW_fC
	*/
	mergeSort(listNumbers: Array<number>, beginning: number, end: number) {
		if (end - beginning > 1) {
			let middle = Math.trunc((end + beginning) / 2); //divisão inteira
			this.mergeSort(listNumbers, beginning, middle);
			this.mergeSort(listNumbers, middle, end);
			this.merge(listNumbers, beginning, middle, end);
		}
	}

	/*
	* etapa de junção da lista
	*/
	merge(listNumbers: Array<number>, beginning: number, middle: number, end: number) {
		let left_list = listNumbers.slice(beginning, middle);
		let right_list = listNumbers.slice(middle, end);
		let top_left = 0;
		let top_right = 0;
		for (let index = beginning; index < end; index++) {
			if (top_left >= left_list.length) {
				// quando acabar a ordenação da lista da esquerda, entra nesse if
				listNumbers[index] = right_list[top_right];
				top_right += 1;
			}
			else if (top_right >= right_list.length) {
				// quando acabar a ordenação da lista da direita, entra nesse if
				listNumbers[index] = left_list[top_left];
				top_left += 1;
			}
			else if (left_list[top_left] < right_list[top_right]) {
				listNumbers[index] = left_list[top_left];
				top_left += 1;
			} else {
				listNumbers[index] = right_list[top_right];
				top_right += 1;
			}
		}
	}
}