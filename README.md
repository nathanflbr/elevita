![Banner Image](/readme-assets/readme-card-design.png)

# Entrega do teste Técnico

> Tomei a liberdade de realizar toda a parte de design do projeto, incluindo prototipagem no Figma, criação de UI/UX intuitiva e manipulação/criação de imagens com Photoshop e ferramentas de design. refletindo outras competências que possuo e que posso agregar ao time/empresa GrupoSIX

## Sobre

Uma landing page com fluxo de checkout moderna e responsiva para venda de produtos nutracêuticos

## Tecnologias Utilizadas

- **Framework**: Next.js 15.4.3 (App Router)
- **Linguagem**: TypeScript 5
- **Estilização**: Tailwind CSS 4
- **Lib de Ícones**: Lucide React
- **Gerenciador de Pacotes**: pnpm
- **Linting**: ESLint

## Como Executar Localmente

### Pré-requisitos

- Node.js 18+ instalado
- pnpm, npm ou yarn

### Passo a Passo

1. **Clone o repositório**

   ```bash
   git clone <url-do-repositorio>
   cd elevita
   ```

2. **Instale as dependências**

   ```bash
   # Usando pnpm
   pnpm install

   # usando npm
   npm install

   # usando yarn
   yarn install
   ```

3. **Execute o servidor de desenvolvimento**

   ```bash
   # Usando pnpm
   pnpm dev

   # usando npm
   npm run dev

   # usando yarn
   yarn dev
   ```

4. **Acesse a aplicação**

   Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## Entregas

### Landing Page

- Header com vídeo promocional
- Lista de produtos com preços e descontos
- Seção de avaliações de clientes
- Footer com informações da empresa

### Checkout (não estava nos requisitos mas fiz pois achei que se encaixaria bem no fluxo entre as páginas do projeto e agregaria mais ao teste)

- Seleção de produtos via URL
- Validação de CEP com preenchimento automático
- Formulário de pagamento com validação
- Simulação de parcelamento
- Preservação de UTMs durante todo o fluxo

### API de Produtos (Usei a API Router do Next.JS)

- Endpoint RESTful simples para consulta de produtos
- Validação de parâmetros
- Tratamento de erros

## Como Testar a Captura e preservação de parâmetros UTM

#### Teste Básico com URL

Acesse a aplicação com parâmetros UTM na URL:

```
http://localhost:3000?utm_source=google&utm_medium=cpc&utm_campaign=lancamento&utm_term=nutraceuticos&utm_content=banner-principal
```

## 🚀 Deploy

### Vercel

1. Conecte seu repositório a Vercel
2. Deploy automático a cada push

### Outras Plataformas

```bash
# Build de produção
pnpm build

# Iniciar servidor de produção
pnpm start
```

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Desenvolvedor

Desenvolvido por **NathanFL** para o teste técnico da **GRUPOSIX**

---

**🔗 Links Úteis:**

- [Figma do Projeto Desenvolvido por min](https://www.figma.com/design/AWDqfBh34GxKSmJMvJM3Yo/Elevita?node-id=0-1&t=Wcuk9Ab8LSQWOSCF-1)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript](https://www.typescriptlang.org/docs)
- [Lucide Icons](https://lucide.dev)
