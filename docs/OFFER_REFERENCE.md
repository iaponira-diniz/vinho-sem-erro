# Vinho Sem Erro — Oferta e Go-to-Market (material de apoio)

**O que este documento é:** um extrato organizado da conversa original com a AURA (agente GPT do curso) que antecedeu a construção do MVP. Reúne copy pronta, dados de mercado e direção visual para reuso direto.

**O que este documento NÃO é:** fonte de verdade do produto. Para especificação funcional, arquitetura técnica e estado real da implementação, consultar sempre `PRODUCT_SPEC.md`, `TECH_SPEC.md` e `HANDOFF.md`.

---

## Nota importante sobre arquitetura técnica (histórico superado)

Na conversa original com a AURA, a arquitetura técnica proposta era:

```
React + TypeScript + Vite
→ Cloudflare Workers + Static Assets
→ Cloudflare D1 (banco)
→ Cloudflare Analytics Engine
```

Essa decisão foi **superada**. A arquitetura real do MVP, confirmada em `HANDOFF.md` e `TECH_SPEC.md`, é:

```
React + TypeScript + Vite
→ Vercel (hospedagem)
→ Vercel Functions (planejado)
→ Supabase / PostgreSQL (planejado, ainda não integrado)
```

Os arquivos legados do Cloudflare (`worker/`, `wrangler.toml`, `tsconfig.worker.json`) ainda existem no repositório, mas não estão em uso. A remoção será feita em etapa controlada, conforme já registrado no `TECH_SPEC.md`.

**Qualquer leitura futura deste documento deve considerar `TECH_SPEC.md` como a arquitetura vigente**, não a descrita nas seções técnicas da conversa original (que não foram reproduzidas aqui por esse motivo — só a Matriz de Decisão de conteúdo/perfis foi preservada, porque essa parte continua válida independentemente do stack).

---

## 1. Copy completa da página de vendas

### Headline e sub-headline

**Pare de escolher vinho no escuro.**

Descubra em até 3 minutos qual tipo de vinho procurar — de acordo com seu gosto, ocasião, comida e orçamento — mesmo sem entender de vinho.

Vinho Sem Erro — Seu Sommelier de Bolso

Uma ferramenta digital criada para ajudar você justamente no momento em que surge a dúvida: "Qual vinho eu escolho?"

**[BOTÃO] QUERO ESCOLHER VINHO SEM ERRO**

*Elemento visual recomendado: mockup de um celular mostrando a tela inicial do Vinho Sem Erro e uma tela de resultado "Sua Rota de Hoje".*

### Identificação do problema

Você gosta de vinho. O problema começa quando precisa escolher um.

Você chega ao supermercado e encontra uma prateleira inteira de garrafas. Olha os nomes. Compara os preços. Tenta reconhecer alguma uva. Talvez procure uma indicação no celular. E continua com a mesma dúvida: "Como eu sei qual deles vai combinar comigo?"

No restaurante, acontece algo parecido. Você abre a carta e encontra nomes, regiões e produtores que deveriam facilitar a escolha... mas acabam deixando a decisão ainda mais difícil.

Talvez você já tenha pensado:

- "Tenho medo de gastar e escolher errado."
- "Não sei qual vinho combina com esse prato."
- "Queria comprar um vinho para presente, mas não sei por onde começar."
- "Sempre preciso pedir indicação para alguém."
- "Não sei explicar que tipo de vinho eu gosto."
- "Às vezes escolho pela embalagem ou pelo preço e torço para dar certo."

Existe uma boa notícia: o problema não é você não saber tudo sobre vinho. O problema é tentar tomar uma decisão complexa sem saber quais informações realmente importam.

### Apresentação da solução

Foi para resolver isso que eu criei o Vinho Sem Erro.

O Vinho Sem Erro não é mais um curso para você assistir antes de poder escolher uma garrafa. Você não precisa decorar regiões. Não precisa estudar centenas de uvas. Não precisa aprender um vocabulário complicado.

Você simplesmente acessa a ferramenta pelo celular, responde algumas perguntas rápidas e recebe uma orientação prática sobre: qual tipo de vinho procurar e como reconhecer uma opção adequada para aquela situação.

É como ter uma orientação de sommelier no bolso justamente quando você precisa decidir.

### Como o produto funciona

Tudo começa pelo Método ROTA do Vinho. Quatro filtros simples.

- **R — Razão.** Qual é a ocasião? Você vai beber em casa, jantar, comemorar, presentear ou escolher no restaurante?
- **O — Orçamento.** Quanto pretende gastar? A recomendação precisa fazer sentido também para o seu bolso.
- **T — Tipo de Paladar.** Que estilo costuma agradar você? Mais leve, mais frutado, mais intenso, mais refrescante? Não sabe responder? Tudo bem, a ferramenta foi pensada justamente para quem ainda não domina esse vocabulário.
- **A — Acompanhamento.** Vai beber o vinho sozinho ou com alguma comida?

E então você recebe: **SUA ROTA DE HOJE**

### Benefícios do produto

Com o Vinho Sem Erro, você poderá:

- **Chegar à prateleira sabendo o que procurar.** Em vez de tentar entender todas as garrafas, você começa com um perfil claro.
- **Escolher com mais autonomia.** Você deixa de depender sempre da opinião de outra pessoa.
- **Reduzir o medo de gastar errado.** Nenhuma ferramenta pode garantir que você gostará de toda garrafa, mas uma escolha orientada tende a ser muito mais consciente do que uma decisão no escuro.
- **Saber explicar o que deseja**, inclusive no restaurante ou em uma loja especializada.
- **Considerar seu próprio gosto.** A ferramenta não começa pela opinião de críticos ou de outras pessoas. Começa por você.
- **Harmonizar de maneira mais simples**, sem precisar estudar regras intermináveis de harmonização.
- **Escolher presentes com mais critério**, considerando situação, perfil e orçamento.
- **Economizar tempo.** A proposta não é estudar por horas. É tomar uma decisão melhor em poucos minutos.

### Diferenciais competitivos

- Não é um curso. Você não precisa estudar antes de usar.
- Não exige conhecimento técnico. As perguntas foram pensadas para pessoas comuns que gostam de vinho.
- Não começa pelo rótulo. Começa pela sua situação.
- Não depende de milhares de avaliações. O objetivo é entender o que faz sentido procurar para você.
- Foi criado por uma sommelier. Existe conhecimento especializado por trás da simplicidade da experiência.
- O complexo fica comigo. A decisão simples fica com você.

### CTA #1

Da próxima vez que você ficar diante de uma prateleira cheia de vinhos, não escolha no escuro.

**[BOTÃO] QUERO MEU SOMMELIER DE BOLSO**
Vinho Sem Erro — Edição Fundadores | R$97

### Prova social

O Vinho Sem Erro está começando sua primeira edição. Por isso, os depoimentos desta área serão preenchidos com experiências reais dos primeiros usuários. Não utilizar depoimentos fictícios.

Perguntas para coletar os primeiros depoimentos:

- Em qual situação você usou o Vinho Sem Erro?
- Como costumava escolher vinho antes?
- O que mudou depois de receber sua Rota?
- A orientação deixou sua decisão mais simples?
- Você se sentiu mais segura para escolher?
- Voltaria a utilizar a ferramenta?

*Elemento visual recomendado: prints autorizados de mensagens reais recebidas no WhatsApp.*

### Demonstração do produto

Imagine esta situação: "Vou jantar massa à bolonhesa, tenho até R$100 e prefiro vinhos que não sejam muito pesados."

Depois de passar pelo Método ROTA, você poderia receber:

**SUA ROTA DE HOJE**

- Procure por: um vinho tinto de corpo médio, com boa acidez, fruta presente e taninos macios.
- Boas pistas: estilos e uvas que normalmente apresentam características compatíveis com essa situação.
- Observe no rótulo: informações que podem ajudar a reconhecer esse perfil.
- Para esta ocasião, talvez seja melhor evitar: vinhos excessivamente pesados ou alcoólicos, dependendo do prato e do seu gosto.
- Por que essa orientação faz sentido? Porque buscamos equilibrar o peso da comida com um vinho que acompanhe o prato sem dominar a experiência.

### Autoridade

Eu passei anos aprendendo vinho para que você consiga escolher melhor em poucos minutos.

Sou sommelier internacional, formada na Itália pela Fondazione Italiana di Sommelier. Morei durante 10 anos na Itália.

Ao longo da minha trajetória: visitei mais de 100 vinícolas, participei de eventos ligados ao universo do vinho, criei o blog Sapore Divino, desenvolvi uma plataforma de ensino online, criei cursos de vinho, ensinei alunos através de produtos digitais, realizei experiências presenciais de harmonização entre vinho, gastronomia e queijos, publiquei centenas de conteúdos sobre vinho.

Durante muitos anos, meu trabalho foi ensinar pessoas a entender vinho. Mas percebi uma coisa: nem todo mundo quer estudar vinho profundamente. Muita gente quer apenas conseguir responder: "O que eu escolho agora?"

Foi dessa percepção que nasceu o Vinho Sem Erro. Em vez de ensinar tudo o que eu sei, organizei minha experiência para ajudar você a tomar uma decisão.

*Elementos visuais recomendados: foto em vinícola na Itália, fotos reais de degustações, registros de visitas às vinícolas, imagem ligada à formação, registros antigos do Sapore Divino, prints ou mosaico do acervo de vídeos. Priorizar imagens reais em vez de banco de imagens.*

### CTA #2

Você não precisa virar especialista. Precisa saber o que procurar.

Vinho Sem Erro — Seu Sommelier de Bolso
Edição Fundadores: R$97 · 12 meses de acesso

**[BOTÃO] QUERO ESCOLHER COM MAIS SEGURANÇA**

### FAQ

**Preciso entender de vinho?** Não. O produto foi desenvolvido especialmente para quem gosta de vinho, mas ainda se sente inseguro na escolha.

**Isso é um curso?** Não. O Vinho Sem Erro é uma ferramenta de decisão. Você não precisa concluir módulos ou assistir horas de aulas antes de utilizá-lo.

**Ele vai indicar uma marca ou rótulo específico?** O foco do MVP é ajudar você a identificar qual tipo de vinho procurar e como reconhecer uma opção compatível com sua situação. A proposta inicial não é manter um banco de dados com todos os rótulos disponíveis no mercado.

**Posso usar no supermercado?** Sim. Esse é um dos principais contextos de uso.

**Posso usar no restaurante?** Sim. A orientação pode ajudar você a identificar o estilo que deseja procurar na carta ou a explicar melhor sua preferência.

**Posso usar para harmonização?** Sim. O acompanhamento faz parte do Método ROTA.

**Posso usar para escolher presente?** Sim. A ferramenta poderá orientar a decisão de acordo com ocasião, orçamento e perfil de quem receberá o vinho.

**E se eu nem souber dizer que tipo de vinho gosto?** Sem problema. As perguntas serão feitas em linguagem simples. Você não precisa conhecer uvas ou regiões para começar.

**Funciona no celular?** Sim. O Vinho Sem Erro foi pensado prioritariamente para utilização pelo celular.

**Preciso instalar um aplicativo?** Não. A primeira versão será acessada diretamente pelo navegador.

**Preciso de internet?** Sim.

**Por quanto tempo terei acesso?** A Edição Fundadores inclui 12 meses de acesso, conforme as condições apresentadas na compra.

### Garantia

Experimente por 7 dias. Caso perceba dentro desse período que a ferramenta não corresponde ao que esperava, poderá solicitar o cancelamento de acordo com as condições da compra.

### Bônus — Decifrador de Rótulos

Às vezes, você já sabe que tipo de vinho procura... mas continua sem saber interpretar o que está escrito na garrafa. Por isso, os clientes da Edição Fundadores também recebem o Decifrador de Rótulos: um guia rápido para ajudar a identificar algumas das informações mais úteis presentes em uma garrafa. Sem aula longa, sem complicação, apenas informações que ajudam na decisão.

### Escassez e urgência (modelo ético)

Esta é a primeira versão comercial do Vinho Sem Erro. O acesso inicial será aberto de forma controlada para acompanhar de perto como as pessoas utilizam a ferramenta, quais situações aparecem com maior frequência, quais recomendações são mais úteis, quais dúvidas surgem e o que deverá ser melhorado nas próximas versões.

Usar apenas uma condição verdadeira:

- **Opção A — limite de participantes:** "A Edição Fundadores ficará disponível para os primeiros [NÚMERO REAL] participantes."
- **Opção B — limite de tempo:** "As inscrições para a Edição Fundadores ficarão abertas até [DATA REAL]."

Não utilizar contador reiniciável, vagas falsas ou desconto fictício.

### CTA #3 (fechamento)

Quanto custa continuar escolhendo no escuro?

Uma única garrafa pode custar R$50, R$70, R$100 ou muito mais. E ainda assim você pode chegar em casa e perceber que não era aquilo que esperava.

Por R$97 você recebe 12 meses de acesso a uma ferramenta criada para ajudar em diversas escolhas ao longo do ano.

**VINHO SEM ERRO — SEU SOMMELIER DE BOLSO**
**[BOTÃO] QUERO ACESSAR O VINHO SEM ERRO**

### Compatibilidade e acessibilidade

Para quem é o Vinho Sem Erro? Para pessoas maiores de idade que consomem vinho e querem escolher com mais segurança. Não é necessário ter conhecimento anterior sobre vinho.

Como acessar? Diretamente pelo navegador do celular, sem instalação.

Onde posso usar? Em qualquer lugar com acesso à internet: casa, supermercado, loja, restaurante, viagem, antes de comprar um presente.

### Frase-mãe da marca

"Eu passei anos estudando vinho para que você consiga escolher bem em poucos minutos."

### Transformação central

De: "Não faço ideia de qual vinho escolher."
Para: "Agora eu sei o que procurar."

---

## 2. Evidências de mercado que sustentam o preço de R$97

Levantamento usado pela AURA para justificar migrar a recomendação inicial de R$67 para R$97 (pesquisa nacional Consevitis-RS/Sebrae, 2025, com 1.709 consumidores de bebidas alcoólicas):

- 66% dos consumidores compraram vinho brasileiro nos seis meses anteriores à pesquisa.
- 57% dos consumidores compram vinho uma ou mais vezes por mês (consumo recorrente, não esporádico).
- 45,4% declaram escolher rótulos na faixa de R$30 a R$70.
- Supermercado é disparado o principal canal de compra, com 89%.
- Preço e tipo de uva estão entre os atributos mais valorizados na escolha; recomendações de amigos e familiares têm peso relevante.
- Preço elevado apareceu como a maior barreira declarada ao aumento do consumo, citado por 38% — ou seja, o consumidor tem renda relativamente maior, mas continua sensível a preço e valor percebido.

Ancoragem de categoria (referências 2026, não concorrentes diretos, apenas contexto de precificação): ABS-SP com curso introdutório a R$1.890 e formação online de sommelier a R$7.370; ABS-Rio com módulos online na faixa de milhares de reais. Isso posiciona R$97 como acessível dentro do universo de conhecimento especializado sobre vinho, sem parecer "baratinho" a ponto de gerar desconfiança de qualidade.

Nota comportamental usada como argumento: em contextos de incerteza sobre qualidade, o próprio preço pode funcionar como pista de qualidade percebida — o que sustenta a preocupação de que um preço baixo demais enfraqueça a percepção de especialização, mas não implica que preço mais alto seja sempre melhor.

**Decisão de preço registrada:** R$97 como Edição Fundadores (não R$67). R$127–147 como faixa de teste depois de evidência de uso e satisfação. Regra explícita: se a oferta a R$97 vender menos que o esperado, não reduzir preço automaticamente para R$67 antes de investigar se o problema foi preço ou promessa/desejo/compreensão do produto.

---

## 3. Estratégia de validação em ondas

Validar antes do Web App completo, priorizando os ativos que já existem antes de investir em tráfego pago.

**Onda 1 — grupo antigo de ex-alunos (~60 pessoas).** Apresentar o conceito como evolução do trabalho já feito: "durante anos eu ensinei vinho; agora estou transformando essa experiência em uma ferramenta para ajudar você a decidir em minutos." Oferta real a R$97.

**Onda 2 — comunidade mais recente (~168 pessoas).** Testar mais diretamente a dor e a promessa, com menos história e mais confronto direto: "você também trava diante da prateleira?" → demonstração → oferta.

**Onda 3 — outros grupos com acesso.** Somente com autorização dos administradores, entrando por conteúdo útil ou demonstração, nunca só com link de venda.

**Onda 4 — anúncios.** Só depois de já saber qual headline chama atenção, quais objeções aparecem, qual parte do produto as pessoas valorizam e se alguém efetivamente paga R$97 e usa. Tráfego pago é fase 2 de aquisição, não fase 1 de validação.

Meta inicial sugerida: 20 a 30 clientes fundadores (R$1.940 a R$2.910 em validação paga) — o valor em si é secundário, o que importa é a resposta para "as pessoas realmente pagam para resolver essa dor dessa maneira?".

**Cinco números para acompanhar desde o primeiro lançamento:**

1. Quantas pessoas viram a oferta.
2. Quantas demonstraram interesse.
3. Quantas chegaram à página/checkout.
4. Quantas compraram.
5. Quantas realmente utilizaram o Vinho Sem Erro em uma situação de escolha real (o indicador mais decisivo — separa um produto que vende pela autoridade de um produto que vira hábito).

Recomendação: não construir o Web App inteiro antes desse teste. Construir apenas uma versão funcional suficiente para que alguém passe pelo Método ROTA e receba "Sua Rota de Hoje".

---

## 4. Direção visual e kit de prompts

### Conceito visual-mãe

"A sua rota até o vinho certo." A identidade une vinho + navegação/decisão. O elemento visual principal é o Web App funcionando no celular, não taças, barris ou vinhedos — o universo do vinho aparece como contexto e sofisticação, a interface aparece como solução. A página deve parecer mais um produto digital moderno (app de viagem, finanças, bem-estar) do que uma escola de sommelier.

### Sistema visual

| Elemento | Direção |
|---|---|
| Cor principal | Bordeaux profundo #641C2C |
| Bordeaux de destaque | #8B2942 |
| Fundo claro | Creme quente #F8F4EE |
| Branco | #FFFFFF |
| Texto principal | Grafite #202020 |
| Texto secundário | #62605D |
| Acento | Dourado fosco #C5A46D |
| Cor funcional positiva | Verde oliva sofisticado #68765A |
| Tipografia de interface | Manrope, Inter ou DM Sans |
| Tipografia editorial opcional | Cormorant Garamond, só em pequenos destaques |
| Formas | Cards arredondados, chips, botões largos, linhas de rota |
| Ícones | Lineares, simples, contemporâneos |
| Fotografia | Natural, editorial, Itália/vinícolas/degustação, sem aparência de banco de imagens |

O dourado deve ser acento, não protagonista. Muito preto + dourado empurraria a marca para "vinho premium tradicional"; o objetivo é comunicar simplicidade, tecnologia e utilidade.

### Arquitetura visual da página (seção a seção)

1. **Hero** — "Pare de escolher vinho no escuro." Fundo creme claro, copy à esquerda, mockup de smartphone à direita mostrando "Sua Rota de Hoje". Chips flutuantes: Ocasião, Orçamento, Paladar, Comida. CTA Bordeaux.
2. **Reconhecimento do problema** — pessoa diante de prateleira com muitas opções, sem dramatização exagerada. "Informação demais, clareza de menos."
3. **Virada conceitual** — "muitas garrafas → quatro critérios → uma direção clara."
4. **Demonstração do produto** — duas ou três telas reais/conceituais do Web App: perguntas rápidas, processamento da ROTA, resultado.
5. **Método ROTA do Vinho** — infográfico horizontal (desktop) / vertical (mobile), R-O-T-A conectados por linha de navegação, cada letra com ícone simples.
6. **Sua Rota de Hoje** — ampliação da tela de resultado, cards: "O que procurar", "Uvas e estilos", "Pistas no rótulo", "O que evitar", "Por que combina com você".
7. **Curso x ferramenta de decisão** — visual dividido: livros/anotações de um lado, smartphone + resposta prática do outro. Foco na diferença, não em atacar cursos.
8. **Decifrador de Rótulos** — mockup próprio, close de rótulo com marcações indicando região, uva, classificação.
9. **Autoridade da sommelier** — fotografias reais (Itália, vinícolas, degustações, trajetória), composição documental/editorial, não IA.
10. **Oferta Fundadores** — smartphone principal + Decifrador de Rótulos + selo discreto "Edição Fundadores".
11. **Garantia** — card simples, selo de 7 dias discreto, muito espaço em branco.
12. **Fechamento/checkout** — repetir o smartphone com a Rota pronta, mesma identidade visual do checkout.

### Tela-chave: "Sua Rota de Hoje" (conteúdo conceitual do mockup)

```
Sua Rota de Hoje
Jantar · Até R$100 · Macio · Massa

Procure por:
 Tinto macio, frutado e de corpo médio.

Boas pistas:
 Merlot · Barbera · Montepulciano

No rótulo, procure:
 Nome da uva ou região indicada.

Evite hoje:
 Tintos muito tânicos e encorpados.

Por que essa rota?
 Seu jantar e suas preferências combinam melhor com
 vinhos de textura mais macia e fruta presente.
```

Esta tela deve receber mais investimento de qualidade do que qualquer outra imagem da página — é o ativo visual mais importante.

### Elementos gráficos recorrentes

Linha de rota como assinatura gráfica, aparecendo discretamente entre seções, atrás do smartphone, no Método ROTA e perto dos CTAs. Ícones fixos: Razão → calendário/celebração; Orçamento → etiqueta de preço; Tipo de Paladar → taça/ondas sensoriais; Acompanhamento → prato + talheres; e um quinto símbolo de destino representando "Agora eu sei o que procurar".

### Regra para mockups

Nunca mostrar o produto como "caixa de curso" (notebook + tablet + celular + livro + apostila + caixa 3D + bônus). Quanto mais simples, melhor: 1 smartphone grande → 1 resultado claro → 1 decisão. Produção recomendada: IA para cenário/smartphone/iluminação/composição → Figma/Canva para a tela real → mockup final.

### Kit de prompts para geração de imagem

**1. Logotipo.** Identidade minimalista combinando rota/navegação com taça de vinho (linha de caminho formando abstratamente uma taça, ou pin de localização integrado a uma taça). Estética de startup premium e acessível — evitar brasões, videiras clássicas, barris, castelos, excesso de dourado, estética de adega antiga. Paleta Bordeaux #641C2C, grafite #202020, creme #F8F4EE, acento dourado fosco #C5A46D. Sans-serif contemporânea, versões horizontal e símbolo isolado, fundo limpo, vetorial flat, sem 3D.

**2. Hero (celular).** Smartphone em perspectiva exibindo "Sua Rota de Hoje" com cards organizados, chips para ocasião/orçamento/paladar/comida, recomendação principal em destaque. Interface mobile-first extremamente limpa, estilo app de lifestyle/finanças/viagem, não plataforma de cursos. Elementos discretos de navegação ao redor (linha de rota, pontos, pin minimalista). Fundo creme, interface branca, detalhes Bordeaux, grafite e dourado fosco. Formato 16:9.

**3. Infográfico Método ROTA.** Quatro etapas conectadas por linha fluida: R (calendário/celebração), O (etiqueta de preço/carteira), T (taça estilizada/símbolo sensorial), A (prato e talheres), conduzindo a um destino final (taça ou check de decisão). Estética SaaS premium, ícones lineares, muito espaço em branco. Evitar estética escolar, mapa vintage, pergaminho.

**4. Visual da dor.** Fotografia editorial realista de consumidora adulta diante de prateleira de vinhos, com dúvida sutil e excesso de opções, não desespero caricato. Tons neutros e Bordeaux, área livre para texto. Formato 3:2.

**5. Transformação.** Consumidora escolhendo com tranquilidade, consultando o celular brevemente e alcançando uma garrafa com expressão de satisfação. Foco emocional: autonomia, não virou especialista, apenas sabe o que procurar. Formato 3:2, espaço negativo para texto.

**6. Mockup do bônus (Decifrador de Rótulos).** Smartphone ou card digital ao lado de garrafa, close elegante do rótulo com marcadores gráficos indicando uva/região/produtor/classificação. Estética "agora o rótulo começa a fazer sentido", não aula técnica. Formato 4:3.

**7. Capa do produto (1080x1080).** Smartphone com "Sua Rota de Hoje", linha de rota conectando ocasião/orçamento/paladar/comida. Título "Vinho Sem Erro", assinatura menor "Seu Sommelier de Bolso". Sem excesso de garrafas, livros, selos de curso.

**9. Banner de checkout.** Smartphone com "Sua Rota de Hoje" à direita + card do bônus, área limpa à esquerda para copy de reforço. Fundo predominantemente Bordeaux com áreas creme. Formato ~3:1. Evitar relógios regressivos, dinheiro, estética agressiva de infoproduto.

*(Os prompts completos em português e inglês, prontos para colar em ferramentas de geração de imagem, estão preservados na conversa original — este resumo mantém a direção conceitual de cada peça para consulta rápida.)*

---

## 5. Matriz de decisão de conteúdo (ainda válida, independe do stack técnico)

Esta parte da conversa original permanece útil porque descreve lógica de produto, não infraestrutura.

**Regra central:** Razão e Orçamento personalizam a apresentação e priorizam pistas; quem determina o perfil sensorial é sempre Tipo de vinho + Paladar.

| Tipo escolhido | Preferência de paladar | Resultado |
|---|---|---|
| Tinto | Leve, fresco, fácil de beber | RED_01 |
| Tinto | Macio, frutado, pouca secura | RED_02 |
| Tinto | Corpo médio, presença e equilíbrio | RED_03 |
| Tinto | Intenso, encorpado, estruturado | RED_04 |
| Branco | Leve, seco, refrescante | WHITE_01 |
| Branco | Aromático, perfumado, frutado | WHITE_02 |
| Branco | Cremoso, encorpado, estruturado | WHITE_03 |
| Rosé | Seco, fresco ou frutado | ROSE_01 |
| Espumante | Seco e refrescante | SPARK_01 |
| Espumante | Frutado e aromático, sem muita doçura | SPARK_02 |
| Espumante | Doce, frutado e aromático | SPARK_03 |

Regra de orçamento: não muda o perfil sensorial, apenas prioriza quais pistas (uvas/estilos/denominações) aparecem primeiro dentro daquele perfil — orçamento baixo não deveria abrir com Amarone/Brunello, por exemplo, mesmo que ambos sejam pistas válidas de RED_04.

Regra para "não sei": nunca travar a pessoa nem fazer perguntas cuja resposta não muda o resultado. Sempre existe um caminho de fallback até um perfil, nunca um beco sem saída.

---

*Documento gerado a partir da conversa original com a AURA. Consultar sempre `PRODUCT_SPEC.md`, `TECH_SPEC.md` e `HANDOFF.md` para o estado real e vigente do produto.*
