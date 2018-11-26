# Medicare
## Documentação API

Url: [Medica-webapi](https://medicare-webapi.herokuapp.com/)

### Usuário

Método responsavel por cadastrar o usuário
> POST api/v1/users/cadastrar

Método responsavel por efetuar o login
> POST api/v1/users/login
```
{
  email: string,
  password: string
}
```


### Doação

Método responsavel por cadastrar uma doação. Autenticação obrigatória.
> **POST** api/v1/doacoes

Método responsavel por retornar todas a doações.
> **GET** api/v1/doacoes

Método responsavel por alterar a situação da doação.
> **POST** api/v1/doacoes/{id}/atualizarSituacao'


### Pedido

Método responsavel por cadastrar um pedido. Autenticação obrigatória.
> **POST** api/v1/pedidos

Método responsavel por listar os pedidos.
> **GET** api/v1/pedidos

Método responsavel por listar os pedidos de um usuário. Autenticação obrigatória
> **GET** api/v1/pedidos/user

Método responsavel por retornar um pedido.
> **GET** api/v1/pedidos/{id}

Método responsavel por deletar um pedido. Autenticação obrigatória
> **DELETE** api/v1/pedidos/{id}

Método responsavel por atualizar a situação de um pedido. Autenticação obrigatória
> **POST** api/v1/pedidos/{id}/atualizar
