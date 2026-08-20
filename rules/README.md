# rules/

Motor de recomendação — a lógica que transforma respostas da jornada de
perguntas em um `WineProfile` (via `content/`). **Vazio de propósito nesta
fase da fundação**: nenhuma regra de vinho foi definida ainda, então nenhum
código de decisão foi escrito.

## Princípios (não negociáveis)

- **Determinístico.** Mesma entrada → mesma saída, sempre. Nada de IA, nada
  de aleatoriedade, nada de chamada a serviço externo dentro do motor.
- **Sem overengineering.** Quando as regras existirem, devem ser o mais
  simples possível para o número de perfis que temos (11). Provavelmente uma
  árvore de decisão ou tabela de mapeamento — não um sistema de scoring
  genérico até que haja motivo concreto para isso.
- **Versionado.** Assim como os perfis em `content/`, o conjunto de regras
  terá uma versão própria, para permitir auditar "qual regra recomendou X
  perfil para este usuário, e quando".
- **Separado da interface.** `src/` (UI) chama funções daqui; este código
  nunca importa de `src/`.
- **Sem inventar vinho.** As condições das regras (ex.: "se respondeu X e Y,
  recomendar RED_02") vêm de uma definição de produto explícita, não de
  suposição de engenharia sobre o que é um bom vinho.

## Estrutura prevista

```
rules/
├── recommendation/     # motor de decisão: respostas -> WineProfile
├── journey/             # definição das perguntas da jornada (futuro)
└── README.md
```

Nada disso está implementado ainda — ver `recommendation/README.md`.
