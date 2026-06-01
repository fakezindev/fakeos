# FakeOS - Portfolio System v1.0 🚀

[![Vercel Deployment](https://img.shields.io/badge/Vercel-Deployed-success?style=flat-square&logo=vercel&logoColor=white)](https://fakezin.dev)
[![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)](https://react.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com)

**FakeOS** é um portfólio interativo de alto desempenho que simula a experiência completa de um Sistema Operativo diretamente no navegador. Desenvolvido com foco em interatividade premium, o sistema conta com gestão de janelas dinâmicas, terminal interativo, aplicações nativas e integração full-stack.

🔗 Visite o sistema em produção: [fakezin.dev](https://fakezin.dev)

---

## 🖥️ Funcionalidades do Sistema

* **Ambiente Desktop Interativo:** Ícones funcionais, barra de tarefas reativa, relógio sincronizado e Menu Iniciar customizado.
* **Gestão Dinâmica de Processos:** Abertura, minimização e encerramento de aplicações independentes (Janelas do FakeOS).
* **Terminal App:** Linha de comando simulada para execução de utilitários e navegação retro.
* **Aplicações Embutidas:** Sistema de Xadrez funcional, Navegador Web simulado e visualizador de Projetos/Currículo.
* **Notificações em Tempo Real:** Sistema de toasts integrado utilizando `sonner` para feedback de ações do usuário.

---

## 🛠️ Arquitetura & Tecnologias

O projeto foi construído sob uma arquitetura de **Monorepo**, garantindo isolamento de responsabilidades e reutilização de tipos entre o cliente e o servidor.

* **Frontend:** React 19, Vite v7, TypeScript.
* **Estilização:** Tailwind CSS v4 (Compilação nativa via plugin do Vite para performance extrema).
* **Comunicação API:** tRPC & React Query (Garantindo Typesafety absoluto de ponta a ponta sem necessidade de rotas REST manuais).
* **Serialização:** SuperJSON.
* **Deploy & Infra:** Vercel (Root Directory configurado isoladamente para a pipeline do cliente).

---

## ⚡ Otimizações de Performance & Engenharia

Para garantir que um sistema operacional complexo rodasse de forma fluida em dispositivos móveis, o projeto passou por uma rigorosa fase de refatoração:

1.  **Caminhos Relativos Absolutos:** Eliminação de resoluções de aliases complexas no Rollup, reduzindo o tempo de build em produção para menos de 300ms.
2.  **Tree Shaking Rigoroso:** Remoção de mais de 30 componentes órfãos e não utilizados da biblioteca de UI (`shadcn`), resultando num bundle final extremamente leve e focado no core da aplicação.
3.  **MIME Type Strict Fix:** Correção da raiz absoluta do servidor do Vite (`/src/main.tsx`) garantindo compatibilidade estrita com especificações HTML em builds de produção Linux.

---

## 📦 Como Rodar o Projeto Localmente

Certifique-se de ter o [PNPM](https://pnpm.io/) instalado globalmente na sua máquina.

1. Clone o repositório:
   ```bash
   git clone [https://github.com/seu-usuario/seu-repositorio-publico.git](https://github.com/seu-usuario/seu-repositorio-publico.git)
   cd seu-repositorio-publico
