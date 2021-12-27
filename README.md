# Desafio tecnico da Cross Commerce
Teste de backend para a vaga de dev jr da Cross Commerce
* [Enunciado do teste](https://docs.google.com/document/d/1SpERW5nYW3iNN2d8QmHX_WRa-ithKKn56Kqj3kyicy4/edit?usp=sharing)

## Tecnologias :toolbox:

Tecnologias utilizadas nesse projeto:
* [Node 16+](https://nodejs.org/en/download/)
* [Typescript](https://www.typescriptlang.org/download)
* [Docker](https://www.docker.com/)
* [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#debian-stable)

## Instalação :hammer_and_wrench:

Clone o repositório do projeto
```bash
  git clone https://github.com/leo-jansen/desafio_cross_commerce.git
  cd desafio_cross_commerce
```
Faça o build do projeto com o docker
```bash
  docker build -t desafio_cross_commerce .
```
Execute a imagem criada
```bash
  docker run -p 3000:3000 desafio_cross_commerce
```
## Uso :computer:

Fazendo uma requisição `GET` na rota raiz ``/`` você terá o retorno de um json com o estagio da aplicação, podendo ser:
* Primeiro acesso, quando começa a estração dos dados do endpoint passado na questão:
```
{
	"message": "Começando a extração dos dados, por favor faça a requisiçao mais tarde para receber os dados"
}
```
* Quando a estração ainda não finalizou:
```
{
	"message": "Extração de dados em execução, por favor faça a requisiçao mais tarde"
}
```
* Quando a estração finalizou e a ordenação está em processo:
```
{
	"message": "Ordenando os dados, por favor faça a requisiçao mais tarde"
}
```
* Processo todo realizado, array ordenado:
```
[
	0.0000019774114394001396,
	0.000004636210512744959,
	0.000004756668727175922,
	...
]
```