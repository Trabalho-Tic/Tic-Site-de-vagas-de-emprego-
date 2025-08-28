# 📌 Guia de Contribuição

Bem-vindo(a)! Este documento explica como **fazer commits** e **abrir pull requests** corretamente neste projeto.  
Seguindo este guia, garantimos um histórico de mudanças **organizado, claro e padronizado**.

---

## 📝 Estrutura de um Commit

Nós seguimos o padrão [Conventional Commits](https://www.conventionalcommits.org/).  
A mensagem de commit deve ter a seguinte estrutura:

<tipo>(escopo opcional): descrição breve

- **tipo** → Define a natureza da mudança.  
- **escopo (opcional)** → Parte do sistema afetada (ex: login, api, ui).  
- **descrição** → Resumo curto e claro da alteração.  

---

## 🔖 Tipos de Commits

| Tipo      | Uso | Exemplo |
|-----------|-----|---------|
| **feat**  | Nova funcionalidade. | `feat(auth): adicionar login com Google` |
| **fix**   | Correção de bug. | `fix(ui): corrigir alinhamento do botão` |
| **docs**  | Alterações em documentação. | `docs(readme): adicionar guia de contribuição` |
| **style** | Alterações que não afetam o código (formatação, lint). | `style(lint): ajustar indentação` |
| **refactor** | Refatoração sem mudar comportamento. | `refactor(api): melhorar legibilidade` |
| **test**  | Adição ou alteração de testes. | `test(auth): adicionar teste para logout` |
| **chore** | Tarefas diversas (build, configs, deps). | `chore(deps): atualizar axios` |
| **perf**  | Melhorias de performance. | `perf(api): otimizar consulta ao banco` |
| **debug** | Commits temporários para depuração. | `debug(api): log da resposta da API` |

---

## ✅ Boas Práticas para Commits

- Faça commits **pequenos e objetivos**.  
- Evite mensagens genéricas como *"update"*, *"ajustes"* ou *"finalizando"*.  
- Sempre use **português** nas mensagens.
  
---

## 🔀 Como Abrir um Pull Request (PR)

1. Crie uma **branch** com nome descritivo:

```bash
   git checkout -b feat/nome-da-funcionalidade
```

Exemplos:

feat/login-social

fix/erro-deploy

docs/melhorar-readme

Faça commits seguindo o padrão explicado acima.

Envie a branch para o GitHub:

```bash
git push origin feat/nome-da-funcionalidade
```

Abra um Pull Request (PR) no GitHub:

Descreva claramente o que foi feito.

Se aplicável, relacione issues (closes #id).

Marque revisores, se necessário.

🚦 Fluxo Resumido
# Criar branch

```bash
git checkout -b feat/nome-da-feature
```

# Adicionar arquivos

```bash
git add .
```

# Commit seguindo padrão

```bash
git commit -m "feat(auth): implementar autenticação JWT"
```

# Enviar para o GitHub

```bash
git push origin feat/nome-da-feature
```

# Abrir PR no GitHub
🎯 Exemplo Prático

```bash
git checkout -b fix/cadastro-nulo
git add src/pages/Register.js
git commit -m "fix(register): corrigir bug ao salvar usuário com campo vazio"
git push origin fix/cadastro-nulo
```

Depois é só abrir o Pull Request e aguardar a revisão. ✅
