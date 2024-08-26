
# Caju Front End Teste

Aplicação que consiste numa plataforma de admissão que permite o usuario adicionar uma admissão com as opções de aprovar, reprovar ou excluir.

## Dashboard

![Screenshot 2024-06-11 at 11 48 24 AM](https://github.com/caju-beneficios/caju-front-teste-1/assets/31169925/fedeff5c-a0d3-4df1-aebd-1f2d25c56a48)

- Dashboard com admissões.

![Screenshot 2024-06-11 at 1 52 35 PM](https://github.com/caju-beneficios/caju-front-teste-1/assets/31169925/3b002341-454b-4b24-82cb-6390656b56cc)

## Formulário para criação de admissões

![Screenshot 2024-06-11 at 11 48 47 AM](https://github.com/caju-beneficios/caju-front-teste-1/assets/31169925/bbbb211c-165f-40e5-b2af-61adafd61398)

## API
Essa aplicação consome uma API mockada localmente, que é executada utilizando o json-server. Para mais informações consulte a [documentação](https://github.com/typicode/json-server/).

Exemplo de Requisição:

```
POST http://localhost:3000/registrations
Content-Type: application/json
{
  "admissionDate": "23/10/2023",
  "email": "maria@caju.com.br",
  "employeeName": "Maria Silva",
  "status": "REVIEW",
  "cpf": "12345678901"
}
```
## Pré-requisitos
- Node >= 21
- yarn

## Como executar

- Iniciar a API: 
```shell
yarn init:db
```
- Executar a aplicação
```shell
yarn init:db
```

Se tude tiver dado certo as seguintes portas estarão disponiveis:
<br/>

Aplicação http://localhost:3001/
<br/>
Json Web Server http://localhost:3000/

## Testes

- Para executar os testes unitários, integração e componente:

```shell
yarn test:dev
```

- Para executar os testes e2e:

```shell
yarn test:playwright
```

## Documentação

- Para visualizar a documentação com Storybook:
```shell
yarn storybook
```



