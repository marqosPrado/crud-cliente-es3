# Documento de Requisitos

## Visão Geral

Este documento de requisitos descreve as funcionalidades e especificações necessárias para o sistema de gerenciamento de clientes, transações e autenticação. Ele inclui tanto os requisitos funcionais, que definem as ações e comportamentos necessários do sistema, quanto os requisitos não funcionais, que determinam padrões de qualidade e segurança.

---

## Requisitos Funcionais

### RF-CLIENTE: Cadastro de Clientes

- **RF-CLIENTE-0021 - Cadastro de Cliente**: O sistema deve possibilitar o cadastro de clientes, permitindo que informações como nome, CPF, data de nascimento, telefone, e-mail e senha sejam registradas. Cada cliente receberá um código único (ver RNF0035).


- **RF-CLIENTE-0022 - Alteração de Dados Cadastrais**: O sistema deve permitir que os dados cadastrais dos clientes possam ser atualizados de maneira fácil e eficiente, possibilitando que informações desatualizadas sejam corrigidas ou complementadas.


- **RF-CLIENTE-0023 - Inativação de Clientes**: O sistema deve permitir a inativação de clientes, ocultando-os da interface principal e de listagens, mas mantendo seus dados no banco para referências e consultas futuras.


- **RF-CLIENTE-0024 - Consulta de Clientes**: O sistema deve permitir a busca e consulta de clientes utilizando diferentes filtros como CPF, nome, telefone e e-mail. Os filtros podem ser aplicados de forma combinada ou isolada, de acordo com a necessidade do usuário.


- **RF-CLIENTE-0025 - Consulta de Transações de Clientes**: O sistema deve exibir todas as transações realizadas por cada cliente diretamente no cadastro do cliente, para facilitar o acompanhamento histórico de suas operações.


- **RF-CLIENTE-0026 - Cadastro de Endereços de Entrega**: O sistema deve permitir o cadastro de múltiplos endereços de entrega para cada cliente. Cada endereço de entrega deve ser identificado com um nome curto para fácil distinção (ex.: "Casa", "Trabalho").


- **RF-CLIENTE-0027 - Cadastro de Cartões de Crédito**: O sistema deve possibilitar que diversos cartões de crédito sejam associados ao cliente. O cliente deve poder configurar um dos cartões como preferencial para facilitar o uso em futuras transações.


- **RF-CLIENTE-0028 - Alteração de Senha**: O sistema deve permitir a alteração de senha do usuário de forma independente, sem exigir a atualização dos demais dados cadastrais, para garantir maior comodidade e segurança.

### RF-ENDERECO: Endereços

- **RF-ENDERECO-0034 - Gerenciamento de Endereços de Entrega e Cobrança**: O sistema deve permitir que os endereços de entrega e cobrança possam ser adicionados ou alterados de forma independente dos outros dados cadastrais.


- **RF-ENDERECO-0021 - Endereço de Cobrança Obrigatório**: Para cada cliente cadastrado, é obrigatório o registro de ao menos um endereço de cobrança, garantindo que todas as informações de faturamento estejam completas.


- **RF-ENDERECO-0022 - Endereço de Entrega Obrigatório**: Cada cliente deve ter ao menos um endereço de entrega cadastrado para o envio de produtos ou serviços, conforme necessário.


- **RF-ENDERECO-0023 - Estrutura de Dados dos Endereços**: Todo endereço cadastrado deve conter obrigatoriamente os seguintes campos: tipo de residência (ex.: Casa, Apartamento), tipo de logradouro, logradouro, número, bairro, CEP, cidade, estado e país. Um campo opcional de observações pode ser preenchido para detalhes adicionais.

### RF-CARTAO: Cartões de Crédito

- **RF-CARTAO-0024 - Estrutura de Dados do Cartão de Crédito**: Cada cartão de crédito cadastrado no sistema deve incluir obrigatoriamente os campos: número do cartão, nome impresso, bandeira e código de segurança, assegurando conformidade com as regras de uso de cartão de crédito.


- **RF-CARTAO-0025 - Bandeiras de Cartão de Crédito Permitidas**: Somente bandeiras de cartão de crédito previamente cadastradas no sistema podem ser utilizadas para associação com os clientes, garantindo controle sobre os métodos de pagamento.

### RF-AUTENTICACAO: Autenticação e Segurança

- **RF-AUTENTICACAO-0031 - Requisitos de Senha Forte**: A senha cadastrada pelo cliente deve seguir as diretrizes de segurança, sendo composta por pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas e caracteres especiais, para aumentar a proteção contra acessos não autorizados.


- **RF-AUTENTICACAO-0032 - Confirmação de Senha**: O sistema deve solicitar a confirmação da senha durante o cadastro e alteração, exigindo que o cliente a digite duas vezes para evitar erros de digitação.


- **RF-AUTENTICACAO-0033 - Armazenamento Seguro de Senha**: A senha do cliente deve ser criptografada antes de ser armazenada no banco de dados, de modo a preservar a confidencialidade das informações de autenticação.

### RF-TRANSACAO: Transações

- **RF-TRANSACAO-0012 - Log de Transações**: Toda operação de escrita, incluindo inserção e alteração, deve registrar a data, hora e o usuário responsável, bem como os dados anteriores e novos. Isso visa assegurar a rastreabilidade e auditoria de todas as operações.


- **RF-TRANSACAO-0028 - Validação de Status de Transação**: O sistema deve confirmar a efetivação da transação antes de realizar a baixa no estoque. Se a compra não for aprovada, os itens comprados devem ser desbloqueados e mantidos em estoque para futura disponibilidade.

---