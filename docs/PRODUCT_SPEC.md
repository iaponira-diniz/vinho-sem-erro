# Vinho Sem Erro — Product Specification

**Produto:** Vinho Sem Erro
**Tagline:** Seu Sommelier de Bolso
**Marca-mãe:** SaporeDiVino
**Status:** MVP em desenvolvimento e preparação para validação
**Documento:** Especificação funcional e de produto
**Versão:** Consolidada após revisão da jornada, orçamento, rosé e espumantes

---

# 1. OBJETIVO DESTE DOCUMENTO

Este documento registra as decisões de produto do Vinho Sem Erro.

Ele explica:

* o que o produto é;
* qual problema resolve;
* como a experiência deve funcionar;
* quais princípios devem orientar futuras decisões;
* o que já foi decidido;
* o que ainda está pendente de decisão.

IMPORTANTE:

Este documento descreve o produto desejado.

Nem tudo descrito aqui necessariamente já está implementado no código.

Para saber o estado atual da implementação, consultar:

`docs/HANDOFF.md`

---

# 2. VISÃO DO PRODUTO

Vinho Sem Erro é uma ferramenta digital de decisão rápida para pessoas que gostam de vinho, mas não se sentem seguras para escolher.

Não é um curso de vinho.

Não tem como objetivo ensinar teoria enológica antes da compra.

Sua função é ajudar o usuário, em poucos minutos, a descobrir:

* que perfil de vinho procurar;
* quais pistas observar;
* o que evitar;
* como pedir ajuda;
* como tomar uma decisão com mais segurança.

A experiência deve funcionar como:

**Seu Sommelier de Bolso.**

---

# 3. BIG IDEA

> Você não precisa entender de vinho para escolher bem. Precisa saber o que procurar.

---

# 4. PROMESSA

> Descubra em até 3 minutos qual perfil de vinho procurar — e como reconhecê-lo — considerando seu gosto, ocasião e contexto de consumo, mesmo sem entender de vinho.

O produto ajuda a encontrar uma direção.

Ele não promete identificar automaticamente um rótulo específico disponível no mercado.

---

# 5. HEADLINE

> Pare de escolher vinho no escuro.

---

# 6. POSICIONAMENTO

O produto não vende conhecimento pelo conhecimento.

A mudança de posicionamento é:

ANTES:

> Estude vinho comigo.

AGORA:

> Use minha experiência para tomar uma decisão melhor em poucos minutos.

Frases que representam o posicionamento:

> Eu passei anos aprendendo vinho para que você consiga escolher bem em poucos minutos.

> O complexo fica comigo. A decisão simples fica com você.

---

# 7. PROBLEMA CENTRAL

Dor principal:

> Eu gosto de vinho, mas não sei escolher.

Essa insegurança aparece principalmente quando a pessoa:

* está diante de uma prateleira;
* abre uma carta de vinhos;
* vai receber pessoas;
* vai jantar;
* quer escolher algo para relaxar;
* procura algo para uma ocasião especial;
* tem medo de gastar e escolher errado;
* não sabe transformar seu gosto em uma escolha prática.

---

# 8. TRANSFORMAÇÃO DESEJADA

Estado inicial:

> Eu gosto de vinho, mas fico perdida para escolher.

Estado desejado:

> Eu sei o que procurar e consigo me virar.

O produto deve gerar:

* autonomia;
* segurança;
* prazer;
* leveza;
* sensação de progresso;
* confiança para pedir ajuda;
* menos medo de errar.

---

# 9. PRINCÍPIO CENTRAL

O Vinho Sem Erro começa pela pessoa, não pelo rótulo.

Não começar a experiência perguntando:

* uva;
* região;
* pontuação;
* safra;
* denominação técnica.

Começar por:

* ocasião;
* sensação desejada;
* tipo de vinho;
* preferência de consumo.

A complexidade enológica fica nos bastidores.

---

# 10. MÉTODO ROTA DO VINHO

Mecanismo conceitual:

**R — Razão**
**O — Orçamento**
**T — Tipo de Paladar**
**A — Acompanhamento**

ROTA é o mecanismo intelectual do produto.

Ele não precisa aparecer de forma rígida como quatro telas obrigatórias.

## R — Razão

Representa o momento ou ocasião.

## O — Orçamento

No MVP, orçamento NÃO determina o perfil enológico.

Ele é apenas um contexto opcional de compra.

## T — Tipo de Paladar

Representa a experiência sensorial desejada.

## A — Acompanhamento

Pode ser usado quando realmente ajuda a decisão.

Não criar perguntas apenas para cumprir a sigla ROTA.

---

# 11. JORNADA FUNCIONAL ALVO

A jornada desejada é:

```text
Home
↓
Abrir Vinho Sem Erro
↓
Momento / ocasião
↓
Tipo de vinho
↓
Paladar ou microdiagnóstico, somente quando necessário
↓
Perfil resolvido
↓
Complemento opcional de faixa de preço
↓
Resultado
```

---

# 12. TELA DE INTENÇÃO

Na versão atual do MVP existe apenas uma intenção real:

**escolher um vinho para mim.**

Portanto, não faz sentido mostrar uma tela perguntando isso.

DECISÃO:

* remover a etapa visual de intenção;
* assumir internamente `for_me`;
* ao entrar em `/app`, cair diretamente na primeira pergunta real;
* não exibir opções futuras ainda indisponíveis.

A primeira pergunta real deve ser:

**Momento / ocasião.**

---

# 13. MOMENTO / OCASIÃO

Motivos existentes:

* Dia a dia
* Relaxar e tomar uma taça
* Receber pessoas
* Ocasião especial
* Experimentar algo diferente

O momento contextualiza a apresentação.

Ele não deve alterar arbitrariamente o perfil sensorial.

Comportamentos possíveis:

### Dia a dia

Apresentação direta.

### Relaxar

Apresentação direta e leve.

### Receber pessoas

Dar mais destaque ao bloco “Pode pedir assim”.

### Ocasião especial

Pode mostrar mais alternativas.

### Experimentar algo diferente

Pode utilizar opções menos óbvias do banco interno do perfil.

---

# 14. TIPO DE VINHO

Categorias principais:

* Tinto
* Branco
* Rosé
* Espumante
* Não sei / me ajuda a decidir

O usuário não precisa conhecer termos técnicos para responder.

---

# 15. PERFIS ATUAIS

Existem 11 perfis oficiais.

## Tintos

* RED_01 — Tinto Leve e Vivo
* RED_02 — Tinto Macio e Frutado
* RED_03 — Tinto Médio e Equilibrado
* RED_04 — Tinto Intenso e Estruturado

## Brancos

* WHITE_01 — Branco Leve e Refrescante
* WHITE_02 — Branco Aromático e Frutado
* WHITE_03 — Branco Cremoso e Estruturado

## Rosé

* ROSE_01 — Rosé Seco e Refrescante

## Espumantes

* SPARK_01 — Espumante Seco e Refrescante
* SPARK_02 — Espumante Frutado e Aromático
* SPARK_03 — Espumante Doce e Aromático

O conteúdo completo dos perfis vive em:

`content/profiles/`

---

# 16. PRINCÍPIO DOS PERFIS

O aplicativo recomenda um **perfil**, não um rótulo específico.

As pistas servem como orientação.

Evitar comunicar que:

* determinada uva sempre produz aquele estilo;
* determinada denominação garante aquele resultado;
* determinada pista é uma regra absoluta.

Preferir linguagem como:

* procure;
* boas pistas;
* tende a;
* pode encontrar;
* algo nessa direção.

---

# 17. ROSÉ — DECISÃO OFICIAL

No MVP existe apenas:

**ROSE_01 — Rosé Seco e Refrescante**

DECISÕES:

* não criar ROSE_02;
* não oferecer “rosé docinho”;
* não oferecer “rosé mais docinho”;
* não perguntar uma preferência de rosé se todas as respostas levam ao mesmo perfil.

Fluxo desejado:

```text
Usuário escolhe Rosé
↓
ROSE_01 é resolvido diretamente
↓
segue a jornada
```

Princípio:

> Não fazer perguntas que simulam personalização quando todas levam ao mesmo resultado.

---

# 18. ROSE_SWEET E UNSUPPORTED

A implementação anterior possuía:

`rose_sweet`

Esse caminho levava a uma tela `unsupported`.

Ele foi considerado ruim para a experiência porque o próprio sistema oferecia uma escolha e depois informava que não podia atendê-la.

DECISÃO:

Remover `rose_sweet`.

Se esse continuar sendo o único caso `unsupported`, remover também:

* estado `unsupported`;
* nó correspondente;
* componente específico;
* branches;
* testes;
* documentação.

Não manter código morto “para talvez usar depois”.

---

# 19. ESPUMANTES — STATUS: PENDENTE DE DECISÃO FINAL

A experiência dos espumantes ainda NÃO está finalizada.

A lógica atual usa doçura demais como eixo de escolha.

Isso precisa ser revisto.

Princípios já definidos:

* frutado não significa doce;
* aromático não significa doce;
* doçura não deve ser o principal eixo para diferenciar dois estilos secos;
* evitar “pouca sensação de açúcar”;
* evitar “mais forte” quando a intenção é corpo ou presença;
* doce continua sendo uma preferência legítima quando a pessoa realmente quer um estilo doce.

---

# 20. ANÁLISE JÁ REALIZADA DOS ESPUMANTES

Foi feita uma análise conceitual e técnica sem alteração de código.

## SPARK_01 — Espumante Seco e Refrescante

Está majoritariamente alinhado com uma experiência:

* leve;
* fresca;
* aperitivo;
* brindar;
* petiscar;
* beliscar.

Porém, algumas referências secundárias do perfil, como Champagne Brut, Franciacorta Brut e Trento DOC Brut, também podem ter leitura mais gastronômica ou estruturada.

Isso precisa ser considerado na próxima revisão.

## SPARK_02 — Espumante Frutado e Aromático

NÃO sustenta atualmente a promessa:

> Mais encorpado e gastronômico.

O conteúdo atual está fortemente ligado a:

* espumante rosé;
* fruta;
* flores;
* frutas vermelhas;
* morango;
* framboesa;
* cereja;
* perfil fácil de beber;
* perfil descontraído.

Portanto:

**não mapear automaticamente “mais encorpado e gastronômico” para SPARK_02.**

Isso criaria uma promessa na pergunta e entregaria outro perfil no resultado.

## SPARK_03 — Espumante Doce e Aromático

Está coerente com uma escolha deliberadamente:

* doce;
* aromática;
* voltada à sobremesa;
* ou à pessoa que realmente quer esse estilo.

---

# 21. DIREÇÃO EM ESTUDO PARA ESPUMANTES

Pergunta possível:

> Como você quer aproveitar esse espumante?

Direções conceituais em estudo:

### Leve e fresco

Para brindar, aperitivo ou petiscar.

### Com mais presença à mesa

Para acompanhar pratos com mais sabor.

### Doce e aromático

Para sobremesa ou porque a pessoa realmente deseja um estilo doce.

### Não sei, me ajuda a decidir

ATENÇÃO:

Essa estrutura ainda NÃO está aprovada para implementação.

A principal pendência é decidir qual perfil sustentará a segunda opção.

---

# 22. “NÃO SEI” NOS ESPUMANTES

O fluxo atual de “Não sei” volta a usar doçura como eixo.

Isso também deve ser revisto.

O novo diagnóstico deve trabalhar com:

* sensação;
* ocasião;
* forma de consumo;
* presença à mesa.

Não voltar simplesmente a perguntar sobre açúcar.

A redação e os destinos ainda estão pendentes.

---

# 23. REGRA PARA ALTERAR SPARK_02

Outra IA NÃO deve reescrever SPARK_02 automaticamente.

Se uma nova pergunta não corresponder ao perfil existente:

1. parar;
2. explicar o conflito;
3. identificar campos afetados;
4. aguardar aprovação enológica.

Campos que poderiam ser afetados:

* name;
* customerSummary;
* mainClues;
* additionalClues;
* internalLibrary;
* labelClues;
* avoid;
* askPhrase;
* whyThisRoute.

---

# 24. MICRODIAGNÓSTICO

O microdiagnóstico existe para quem não consegue responder facilmente:

* qual tipo de vinho quer;
* qual sensação prefere.

Ele deve:

* fazer poucas perguntas;
* usar linguagem simples;
* evitar teoria;
* evitar jargão;
* não parecer um quiz;
* não testar conhecimento.

Objetivo:

> uma pista de cada vez.

Regra:

Não fazer uma pergunta se a resposta não puder alterar o resultado.

---

# 25. FONTE ÚNICA DE VERDADE

O perfil recomendado deve ser derivado das respostas.

Não criar um `profileId` armazenado independentemente apenas para “guardar” a recomendação.

A recomendação deve continuar sendo recalculada a partir do estado da jornada.

---

# 26. FAIXA DE PREÇO — PAPEL CORRETO

A faixa de preço NÃO participa da escolha do perfil.

O Vinho Sem Erro não possui:

* preços em tempo real;
* banco de estoque;
* catálogo de supermercados;
* catálogo de lojas;
* garantia de encontrar um vinho naquela faixa.

Portanto, o preço só pode ser usado como:

**contexto opcional para pedir ajuda.**

---

# 27. PERGUNTA DE PREÇO

Depois que a Rota já estiver resolvida:

> Quer incluir uma faixa de preço na hora de pedir ajuda?

Opções:

* Até R$50
* R$50 a R$80
* R$80 a R$120
* R$120 a R$200
* Mais de R$200
* Prefiro não definir

Não criar uma tela Sim/Não antes disso.

Essa própria tela já oferece a opção de não definir.

---

# 28. PREÇO E PROGRESSO

A barra de progresso representa a parte necessária para descobrir a Rota.

A etapa de preço é complementar.

Quando ela aparece:

**a Rota já está pronta.**

Ela não deve parecer uma pergunta diagnóstica adicional.

---

# 29. PREÇO NO RESULTADO

Não mostrar no topo do resultado:

* “Seu orçamento”;
* R$50–80 ao lado do perfil;
* qualquer elemento que sugira que o perfil recomendado custa aquele valor.

A faixa deve aparecer apenas onde tiver utilidade prática.

Principalmente:

**Pode pedir assim.**

---

# 30. “PODE PEDIR ASSIM”

É um dos elementos centrais do produto.

Sem preço:

> Estou procurando um tinto mais leve e fresco, com fruta presente e taninos delicados. O que você recomenda?

Com preço:

> Quero gastar entre R$50 e R$80. Estou procurando um tinto mais leve e fresco, com fruta presente e taninos delicados. O que você recomenda?

Regra:

Não fazer parsing do `askPhrase`.

Não tentar inserir o valor no meio da frase.

Compor:

```text
frase de preço
+
askPhrase original
```

---

# 31. FRASES DE PREÇO

Até R$50:

> Quero gastar até R$50.

R$50 a R$80:

> Quero gastar entre R$50 e R$80.

R$80 a R$120:

> Quero gastar entre R$80 e R$120.

R$120 a R$200:

> Quero gastar entre R$120 e R$200.

Mais de R$200:

> Quero gastar mais de R$200.

Prefiro não definir:

não adicionar frase de preço.

PENDÊNCIA:

Verificar se algum `askPhrase` atual já contém expressão como:

> nessa faixa de preço

Não reescrever automaticamente esses textos sem revisão.

---

# 32. RESULTADO

O resultado deve priorizar decisão prática.

Devem permanecer visíveis:

* Sua Rota de hoje;
* nome do perfil;
* resumo;
* principais pistas;
* pistas de rótulo;
* “Pode pedir assim”;
* “Evite”, com peso secundário.

Podem ser expansíveis:

* Mais opções;
* Sair do óbvio;
* Por que esta é sua Rota?

---

# 33. FEEDBACK

Feedback é parte central do MVP.

## Momento A — Clareza

Já existe conceitualmente/tecnicamente.

Respostas:

* clear;
* partial;
* lost.

Razões para partial/lost:

* wanted_examples;
* hard_terms;
* taste_mismatch;
* situation_mismatch;
* other.

Comentário opcional.

## Momento B — Futuro

> O que aconteceu quando você foi escolher?

## Momento C — Futuro

Avaliação após provar.

---

# 34. HOME

A Home deve ser simples.

Existe um problema visual identificado:

o conteúdo foi empurrado para baixo por `margin-top: auto` aplicado ao bloco principal da marca.

Decisão:

corrigir apenas a distribuição vertical.

Preservar:

* estrutura;
* CTA;
* tipografia;
* paleta;
* identidade.

---

# 35. IDENTIDADE VISUAL

Direção aprovada:

* elegante;
* acolhedora;
* contemporânea;
* premium sem parecer inacessível;
* leve;
* mobile-first.

Tipografia:

* Fraunces;
* Manrope.

Paleta:

* crème quente;
* quase preto quente;
* bordô profundo;
* dourado/âmbar dessaturado em pequenos detalhes.

---

# 36. EVITAR NO VISUAL

Não usar:

* excesso de bordô;
* luxo genérico;
* uvas decorativas;
* taças decorativas;
* garrafas decorativas;
* rolhas;
* brasões inventados;
* excesso de caixas;
* aparência de formulário corporativo;
* visual de curso online.

---

# 37. MARCA

Hierarquia:

VINHO SEM ERRO
Seu Sommelier de Bolso
por SaporeDiVino

Existe logo oficial da SaporeDiVino.

Não criar ou redesenhar esse logo.

---

# 38. TOM DE VOZ

Tom:

* claro;
* seguro;
* acolhedor;
* direto;
* sem pedantismo;
* sem infantilização;
* sem excesso de jargão.

O produto nunca deve fazer a pessoa se sentir ignorante.

---

# 39. PRINCÍPIOS DE UX

1. Não fazer perguntas desnecessárias.
2. Não oferecer opções que terminem em frustração.
3. Não fingir personalização.
4. Não prometer dados que o produto não possui.
5. Não exigir conhecimento técnico.
6. Não confundir complexidade com valor.
7. Mostrar progresso rápido.
8. Entregar uma ação prática.
9. Manter a especialização nos bastidores.
10. Tornar a decisão simples.

---

# 40. PRINCÍPIOS ENOLÓGICOS DE COMUNICAÇÃO

* Frutado não significa doce.
* Aromático não significa doce.
* Rosé não deve ser tratado automaticamente como doce.
* Termos técnicos de açúcar em espumantes podem confundir o leigo.
* Não usar “mais forte” quando a intenção é corpo ou estrutura.
* Preferência por doce não é inferior.
* Pistas de rótulo não são garantias absolutas.

---

# 41. O QUE NÃO FAZER NO MVP

Não implementar inicialmente:

* banco massivo de rótulos;
* preços em tempo real;
* estoque;
* scanner;
* reconhecimento de imagem;
* chatbot de IA;
* comunidade;
* diário sofisticado;
* native app;
* gamificação complexa;
* geolocalização;
* recomendação probabilística complexa.

---

# 42. POSSÍVEIS EXPANSÕES FUTURAS

Não pertencem ao MVP atual:

* Meu Paladar;
* Sommelier IA;
* Leia Meu Vinho;
* favoritos;
* histórico;
* avaliações após degustação;
* banco maior de rótulos;
* personalização avançada.

Não implementar apenas porque aparecem neste documento.

---

# 43. VALIDAÇÃO

Plano inicial:

1. estabilizar jornada;
2. testar com aproximadamente 10–20 pessoas;
3. observar clareza;
4. verificar se conseguem realmente escolher;
5. corrigir;
6. testar oferta paga.

Não considerar likes ou elogios como validação comercial suficiente.

---

# 44. OFERTA

Nome:

**Vinho Sem Erro — Edição Fundadores**

Hipótese inicial:

**R$97**

Acesso planejado:

**12 meses**

Garantia:

**7 dias**

---

# 45. BÔNUS

**Decifrador de Rótulos**

Deve ser:

* curto;
* prático;
* complementar;
* fácil de consultar.

Não transformar em e-book longo.

---

# 46. ARQUITETURA DE MARCA

Marca-mãe:

**SaporeDiVino**

Produto:

**Vinho Sem Erro**

Tagline:

**Seu Sommelier de Bolso**

Domínio planejado:

`vinhosemerro.saporedivino.com.br`

---

# 47. STATUS DAS DECISÕES

## Aprovadas

* remover tela de intenção;
* começar por momento;
* preço fora da recomendação;
* preço como complemento opcional;
* rosé direto para ROSE_01;
* remover rose_sweet;
* remover unsupported se ficar sem uso;
* preservar identidade visual atual;
* corrigir espaçamento vertical da Home.

## Pendente de decisão

* nova lógica completa dos espumantes;
* destino da opção “mais presença/gastronômico”;
* papel futuro de SPARK_02;
* novo microdiagnóstico de espumantes;
* possível revisão de conteúdo dos perfis de espumante.

---

# 48. REGRA PARA OUTRAS IAs

Antes de alterar produto:

1. ler este documento;
2. ler `TECH_SPEC.md`;
3. ler `HANDOFF.md`;
4. verificar o código real.

Não assumir que uma decisão aprovada já foi implementada.

---

# 49. REGRA FINAL

Quando houver conflito entre:

**mostrar mais coisas**

e

**ajudar melhor a escolher**

priorizar:

**clareza da decisão.**

O produto deve parecer simples para quem usa, mesmo quando a inteligência por trás dele é sofisticada.

---

# 50. NOVA FRENTE — "ENCONTRAR VINHOS PARA COMPRAR" (🟣 PLANEJADO, NÃO IMPLEMENTADO)

Nome funcional provisório:

**"Encontrar vinhos para comprar"**

Objetivo:

Depois que o usuário concluir o diagnóstico e descobrir o perfil de vinho ideal, o Vinho Sem Erro poderá mostrar opções reais de vinhos disponíveis para compra e links para as lojas.

Jornada pretendida:

```text
Diagnóstico
↓
Perfil recomendado
↓
Como reconhecer esse perfil
↓
Como pedir ajuda / askPhrase
↓
Opcionalmente:
  "Encontrar vinhos para comprar"
↓
Opções reais compatíveis
↓
Onde comprar
```

DECISÕES:

* essa funcionalidade **NÃO substitui** o diagnóstico;
* ela acontece **DEPOIS** que o perfil já foi definido;
* o diferencial do produto continua sendo: primeiro descobrir **o que** a pessoa deve procurar, e só depois procurar produtos reais compatíveis.

STATUS: nenhum código foi escrito para esta frente. Ver `docs/TECH_SPEC.md` para a arquitetura planejada e `docs/HANDOFF.md` para o próximo passo (validação de fontes).

---

# 51. PRINCÍPIO DE SEGURANÇA E CREDIBILIDADE — REGRA CENTRAL DO PRODUTO

O Vinho Sem Erro **NÃO pode recomendar** qualquer vinho apenas porque:

* está disponível;
* tem comissão;
* está em promoção;
* está dentro do orçamento;
* aparece primeiro em uma busca.

A recomendação leva a reputação profissional da criadora do produto.

Por isso, um vinho real só pode ser apresentado como recomendação quando existirem informações suficientes para justificar a compatibilidade com o `WineProfile` correspondente.

**A comissão de afiliado NUNCA pode ser critério de compatibilidade ou ranking enológico.**

Se os dados disponíveis forem insuficientes ou a confiança for baixa, o sistema deve preferir **NÃO recomendar**.

Mensagem conceitual possível:

> "Não encontrei uma opção com informações suficientes para recomendar com segurança agora."

É melhor não indicar nenhum vinho do que indicar um vinho inadequado.

---

# 52. COMO A RECOMENDAÇÃO DE PRODUTOS DEVE FUNCIONAR (CONCEITUAL)

Entrada:

* `WineProfile` resolvido pelo motor atual (`resolveProfile()`);
* faixa de preço, se o usuário tiver informado;
* contexto/ocasião, quando relevante;
* características e pistas do `WineProfile`.

Fluxo conceitual:

1. consultar fontes de produtos autorizadas;
2. obter produtos disponíveis;
3. analisar os dados conhecidos de cada vinho;
4. comparar com os critérios do `WineProfile`;
5. excluir candidatos incompatíveis ou com informação insuficiente;
6. atribuir nível de confiança;
7. selecionar poucas opções de boa compatibilidade;
8. explicar de forma simples POR QUE cada opção combina com o perfil;
9. mostrar preço/fonte/data da consulta quando disponíveis;
10. oferecer link "Ver onde comprar".

O preço é filtro/contexto comercial. Não determina sozinho a recomendação enológica.

Este fluxo é conceitual — ver `docs/TECH_SPEC.md` para a arquitetura técnica planejada (Product Sources, Product Matching Engine).

---

# 53. UX PLANEJADA — "ENCONTRAR VINHOS PARA COMPRAR" (HIPÓTESE, NÃO IMPLEMENTAR AGORA)

Hipótese de interface após o resultado:

```text
[ Encontrar vinhos para comprar ]
```

Ao clicar:

> "Encontrei algumas opções compatíveis com o seu perfil."

Para cada vinho, poderemos mostrar futuramente:

* nome do vinho;
* produtor;
* imagem, se autorizada pela fonte;
* preço encontrado;
* loja;
* principais características;
* por que combina com o perfil;
* nível interno de confiança;
* botão "Ver onde comprar".

O nível interno de confiança não precisa necessariamente ser exposto como número ao cliente.

Exemplo conceitual:

```text
Vinho X
R$ XX
Loja Y

"Por que combina com sua Rota:
perfil frutado, corpo médio e taninos macios."

[ Ver onde comprar ]
```

**Não criar essa interface agora. Somente documentar.**

---

# 54. MODELO DE AFILIADOS (POSSIBILIDADE COMERCIAL FUTURA)

O botão "Ver onde comprar" poderá usar link de afiliado quando existir programa autorizado.

Isso poderá gerar uma segunda fonte de receita além da venda do Vinho Sem Erro.

Regra explícita:

**RECEITA DE AFILIADO NÃO PODE INTERFERIR NA ESCOLHA ENOLÓGICA.**

Uma opção com maior comissão não deve receber prioridade por esse motivo — ver seção "PRINCÍPIO DE SEGURANÇA E CREDIBILIDADE".

Se houver conteúdo patrocinado ou relação comercial que exija divulgação, isso deverá ser comunicado de forma transparente.

---

# 55. ÁLCOOL / RESPONSABILIDADE — REVISÃO NECESSÁRIA ANTES DO LANÇAMENTO

Por se tratar de bebida alcoólica, antes do lançamento da funcionalidade "Encontrar vinhos para comprar" deverão ser revisados:

* regras brasileiras aplicáveis à publicidade de bebidas alcoólicas;
* políticas das plataformas parceiras;
* comunicação para público adulto;
* avisos e disclosures necessários;
* regras de afiliados de cada parceiro.

**Não implementar mecanismos jurídicos agora. Somente registrar a necessidade.**

---

# 56. ESCOPO DE LANÇAMENTO — HIPÓTESE A VALIDAR

Existe interesse em lançar o Vinho Sem Erro **já com** a funcionalidade "Encontrar vinhos para comprar", em vez de adicioná-la apenas depois do lançamento.

Isso ainda depende de validação técnica.

Condição para entrar no produto de lançamento:

Antes de prometer essa funcionalidade comercialmente, precisamos comprovar que pelo menos uma fonte real e confiável consegue entregar dados suficientes como:

* produtos;
* preço;
* link;
* identificação do vinho;
* informações mínimas para matching;
* atualização razoável.

Idealmente validar 1 ou 2 fontes antes de assumir essa promessa na oferta.

Ver `docs/HANDOFF.md`, seção "PRÓXIMO EXPERIMENTO", para a investigação inicial planejada.
