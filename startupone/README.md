# StartupOne

README resumido do projeto

## Descrição

Projeto Next.js com componentes React e PrimeReact. Fornece uma interface UI com temas do PrimeReact e usa dados mockados a partir de um contexto (`MockDataContext`). A estrutura do projeto segue o padrão App Router do Next.js (diretório `app/`) e inclui componentes reutilizáveis em `components/`.

## Principais funcionalidades

- Componentes para criação rápida, upload de arquivos, notificações e solicitações.
- Mock de dados fornecido via `context/MockDataContext` para desenvolvimento offline.

## Tecnologias e dependências

- Next.js 15 (App Router)
- React 19
- TypeScript
- PrimeReact + primeicons (componentes UI e temas)
- Embla Carousel (carrossel)
- Tailwind CSS (configurada via PostCSS)
- Biome (ferramenta de lint/format)

As dependências estão definidas em `package.json`.

## Arquivos importantes

- `package.json` — scripts e dependências
- `app/layout.tsx` — layout raiz, providers e import de estilos
- `app/page.tsx`, `app/home/page.tsx`, `app/login/page.tsx` — páginas principais
- `components/` — componentes reutilizáveis
- `context/MockDataContext.tsx` — provider de dados mockados

## Como rodar localmente

### Pré-requisitos

- Node.js (recomendado >= 18)
- npm (ou outro gerenciador de pacotes como pnpm)

### Instalação

Abra um terminal na pasta do projeto `startupone` e execute:

```powershell
npm install
```

### Modo desenvolvimento

Execute o servidor de desenvolvimento (usa Turbopack por padrão):

```powershell
npm run dev
```

Abra o navegador em http://localhost:3000 (o Next exibirá a porta correta no terminal se diferente).

### Build e execução em produção (local)

```powershell
npm run build
npm run start
```

### Lint e formatação

```powershell
npm run lint
npm run format
```

## Observações e troubleshooting

- Se ocorrerem erros de dependência, tente apagar `node_modules` e `package-lock.json` e rodar `npm install` novamente.
- O projeto carrega temas CSS do PrimeReact em `app/layout.tsx`. Se o estilo não aparecer, verifique imports duplicados ou comentados.
- Para substituir os dados mockados por uma API real, troque o `MockDataProvider` por um provider que faça fetch das rotas externas.

## Próximos passos sugeridos

- Adicionar `.env.example` com variáveis de ambiente usadas em produção.
- Adicionar testes automatizados e scripts de CI que rodem lint e build.

## Contato

Abra uma issue no repositório para dúvidas ou contribuições.
