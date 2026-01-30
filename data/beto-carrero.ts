export type QueueLevel = 'baixa' | 'média' | 'alta'
export type Profile = 'infantil' | 'família' | 'radical'
export type Category = 'attraction' | 'restaurant'

export type ExploreItem = {
  id: string
  category: Category
  name: string
  area: string
  profile: Profile
  min_height_cm: number | null
  queue_level: QueueLevel
  short_description: string
  official_url: string
  // Foto real: por enquanto vamos usar o link oficial como referência.
  // Próximo passo: trocar por imagem_url (banner/og:image) ou thumbnail do YouTube.
  image_url: string | null
  youtube_url: string | null
}

const yt = (q: string) =>
  `https://www.youtube.com/results?search_query=${encodeURIComponent(q + ' beto carrero')}`

export const BETO_CARRERO_ITEMS: ExploreItem[] = [
  // =========================
  // AVENTURA RADICAL
  // =========================
  {
    id: 'atr_firewhip',
    category: 'attraction',
    name: 'Fire Whip',
    area: 'Aventura Radical',
    profile: 'radical',
    min_height_cm: 130,
    queue_level: 'alta',
    short_description: 'Aquela montanha-russa que já dá frio na barriga só de olhar. Pernas “penduradas” e emoção do começo ao fim.',
    official_url: 'https://www.betocarrero.com.br/atracoes',
    image_url: null,
    youtube_url: yt('Fire Whip POV'),
  },
  {
    id: 'atr_star_mountain',
    category: 'attraction',
    name: 'Star Mountain',
    area: 'Aventura Radical',
    profile: 'radical',
    min_height_cm: 120,
    queue_level: 'alta',
    short_description: 'Clássica e intensa: sobe, despenca e faz a gente gritar sorrindo. Ótima pra quem quer “radical de verdade”.',
    official_url: 'https://www.betocarrero.com.br/atracoes/star-mountain',
    image_url: null,
    youtube_url: yt('Star Mountain'),
  },
  {
    id: 'atr_tchibum',
    category: 'attraction',
    name: 'Tchibum',
    area: 'Aventura Radical',
    profile: 'radical',
    min_height_cm: 130,
    queue_level: 'alta',
    short_description: 'Montanha-russa invertida (pés livres!). Tem looping, velocidade e muita adrenalina.',
    official_url: 'https://www.betocarrero.com.br/atracoes/tchibum',
    image_url: null,
    youtube_url: yt('Tchibum POV'),
  },
  {
    id: 'atr_portal_esc',
    category: 'attraction',
    name: 'Portal da Escuridão',
    area: 'Aventura Radical',
    profile: 'radical',
    min_height_cm: null,
    queue_level: 'média',
    short_description: 'Atração de terror interativa pra testar a coragem (e dar risada depois).',
    official_url: 'https://www.betocarrero.com.br/mapa-do-parque',
    image_url: null,
    youtube_url: yt('Portal da Escuridão'),
  },

  // =========================
  // HOT WHEELS
  // =========================
  {
    id: 'atr_big_drop',
    category: 'attraction',
    name: 'Big Drop',
    area: 'Hot Wheels',
    profile: 'radical',
    min_height_cm: 130,
    queue_level: 'alta',
    short_description: 'Torre com queda de tirar o fôlego. Se você ama adrenalina, aqui é o seu momento.',
    official_url: 'https://www.betocarrero.com.br/atracoes/big-drop',
    image_url: null,
    youtube_url: yt('Big Drop'),
  },
  {
    id: 'atr_hw_turbo_drive',
    category: 'attraction',
    name: 'Hot Wheels Turbo Drive',
    area: 'Hot Wheels',
    profile: 'família',
    min_height_cm: 95,
    queue_level: 'alta',
    short_description: 'Corrida em carrinho “tamanho real” com pista temática. Muito legal em família (e rende fotos!).',
    official_url: 'https://www.betocarrero.com.br/atracoes/hot-wheels-turbo-drive',
    image_url: null,
    youtube_url: yt('Hot Wheels Turbo Drive'),
  },

  // =========================
  // MADAGASCAR
  // =========================
  {
    id: 'atr_crazy_river',
    category: 'attraction',
    name: 'Madagascar Crazy River Adventure!',
    area: 'Madagascar',
    profile: 'família',
    min_height_cm: 105,
    queue_level: 'alta',
    short_description: 'Bote girando, risada garantida e chance real de se molhar. Perfeito pra “quebrar” o dia no calor.',
    official_url: 'https://www.betocarrero.com.br/atracoes/madagascar-circus-show',
    image_url: null,
    youtube_url: yt('Madagascar Crazy River'),
  },

  // =========================
  // COWBOYLAND
  // =========================
  {
    id: 'atr_raskapuska',
    category: 'attraction',
    name: 'Raskapuska',
    area: 'Cowboyland',
    profile: 'família',
    min_height_cm: 80,
    queue_level: 'alta',
    short_description: 'Passeio em tronquinho por dentro da montanha, com cenas fofas e clima de aventura leve. As crianças amam.',
    official_url: 'https://www.betocarrero.com.br/atracoes/raskapuska',
    image_url: null,
    youtube_url: yt('Raskapuska'),
  },
  {
    id: 'atr_dum_dum',
    category: 'attraction',
    name: 'Montanha-Russa Dum Dum',
    area: 'Cowboyland',
    profile: 'infantil',
    min_height_cm: 80,
    queue_level: 'média',
    short_description: 'A primeira “montanha-russa” dos pequenos: tem emoção na medida e muita carinha de infância.',
    official_url: 'https://www.betocarrero.com.br/atracoes',
    image_url: null,
    youtube_url: yt('Dum Dum'),
  },
  {
    id: 'atr_rebulico',
    category: 'attraction',
    name: 'Rebuliço',
    area: 'Cowboyland',
    profile: 'radical',
    min_height_cm: null,
    queue_level: 'média',
    short_description: 'Gira, sobe e balança — ótimo pra quem curte “bagunça boa” e dar aquela gargalhada nervosa.',
    official_url: 'https://www.betocarrero.com.br/mapa-do-parque',
    image_url: null,
    youtube_url: yt('Rebuliço'),
  },

  // =========================
  // VILA GERMÂNICA
  // =========================
  {
    id: 'atr_autopista',
    category: 'attraction',
    name: 'Autopista (bate-bate)',
    area: 'Vila Germânica',
    profile: 'família',
    min_height_cm: 110,
    queue_level: 'média',
    short_description: 'Bate-bate clássico: todo mundo vira piloto por 5 minutos. Ótimo pra dar uma pausa do “radical”.',
    official_url: 'https://www.betocarrero.com.br/atracoes/autopista',
    image_url: null,
    youtube_url: yt('Autopista bate-bate'),
  },
  {
    id: 'atr_tigor_mountain',
    category: 'attraction',
    name: 'Tigor Mountain',
    area: 'Vila Germânica',
    profile: 'família',
    min_height_cm: 95, // aparece na listagem oficial
    queue_level: 'média',
    short_description: 'Uma “montanha-russa” mais tranquila — perfeita pra crianças que querem se sentir radicais.',
    official_url: 'https://www.betocarrero.com.br/atracoes',
    image_url: null,
    youtube_url: yt('Tigor Mountain'),
  },
  {
    id: 'atr_carrossel_veneziano',
    category: 'attraction',
    name: 'Carrossel Veneziano',
    area: 'Vila Germânica',
    profile: 'infantil',
    min_height_cm: null,
    queue_level: 'baixa',
    short_description: 'Carrossel lindo (bem “foto de família”). Ótimo pra descansar as pernas e curtir o clima do parque.',
    official_url: 'https://www.betocarrero.com.br/mapa-do-parque',
    image_url: null,
    youtube_url: yt('Carrossel Veneziano'),
  },

  // =========================
  // TRIPLIKLAND
  // =========================
  {
    id: 'atr_roda_gigante',
    category: 'attraction',
    name: 'Roda-Gigante',
    area: 'Triplikland',
    profile: 'família',
    min_height_cm: null,
    queue_level: 'média',
    short_description: 'Vista linda do parque e aquele momento “respira e aprecia”. Bom pra ir no fim da tarde.',
    official_url: 'https://www.betocarrero.com.br/mapa-do-parque',
    image_url: null,
    youtube_url: yt('Roda gigante'),
  },
  {
    id: 'atr_baby_elefante',
    category: 'attraction',
    name: 'Baby Elefante',
    area: 'Triplikland',
    profile: 'infantil',
    min_height_cm: null,
    queue_level: 'média',
    short_description: 'Clássico pra pequenos: divertido, leve e ótimo pra primeira atração do dia.',
    official_url: 'https://www.betocarrero.com.br/mapa-do-parque',
    image_url: null,
    youtube_url: yt('Baby Elefante'),
  },
  {
    id: 'atr_xicaras_malucas',
    category: 'attraction',
    name: 'Xícaras Malucas',
    area: 'Triplikland',
    profile: 'família',
    min_height_cm: null,
    queue_level: 'média',
    short_description: 'Gira-gira que a gente ama (ou se arrepende 😅). Perfeito pra quem quer diversão sem “muito radical”.',
    official_url: 'https://www.betocarrero.com.br/atracoes',
    image_url: null,
    youtube_url: yt('Xícaras Malucas'),
  },

  // =========================
  // ILHA DOS PIRATAS
  // =========================
  {
    id: 'atr_barco_pirata',
    category: 'attraction',
    name: 'Barco Pirata',
    area: 'Ilha dos Piratas',
    profile: 'família',
    min_height_cm: 120,
    queue_level: 'média',
    short_description: 'O barcão balançando alto! Dá frio na barriga e é uma ótima atração “família com emoção”.',
    official_url: 'https://www.betocarrero.com.br/atracoes/barco-pirata',
    image_url: null,
    youtube_url: yt('Barco Pirata'),
  },

  // =========================
  // NERF MANIA
  // =========================
  {
    id: 'atr_spin_blast',
    category: 'attraction',
    name: 'Spin Blast',
    area: 'Nerf Mania',
    profile: 'radical',
    min_height_cm: 120,
    queue_level: 'média',
    short_description: 'Um disco gigante que gira MUITO. É daqueles que você sai rindo e tentando lembrar onde está.',
    official_url: 'https://www.betocarrero.com.br/atracoes/spin-blast',
    image_url: null,
    youtube_url: yt('Spin Blast'),
  },
  {
    id: 'atr_super_soaker',
    category: 'attraction',
    name: 'Super Soaker Splash',
    area: 'Nerf Mania',
    profile: 'família',
    min_height_cm: 120,
    queue_level: 'média',
    short_description: 'Pra se molhar e se divertir: mira, água e bagunça boa (leve capa/poncho se não quiser sair encharcada).',
    official_url: 'https://www.betocarrero.com.br/atracoes/super-soaker-splash',
    image_url: null,
    youtube_url: yt('Super Soaker Splash'),
  },
  {
    id: 'atr_nerf_arcade',
    category: 'attraction',
    name: 'NERF Arcade!',
    area: 'Nerf Mania',
    profile: 'família',
    min_height_cm: null,
    queue_level: 'média',
    short_description: 'Pra quem ama jogo e desafio: você entra e “some do mundo” por um tempo.',
    official_url: 'https://www.betocarrero.com.br/mapa-do-parque',
    image_url: null,
    youtube_url: yt('NERF Arcade'),
  },

  // =========================
  // RESTAURANTES (também adicionáveis ao roteiro)
  // Lista oficial do site
  // =========================
  {
    id: 'res_burguer_mania',
    category: 'restaurant',
    name: 'Burguer Mania',
    area: 'Parque (alimentação)',
    profile: 'família',
    min_height_cm: null,
    queue_level: 'alta',
    short_description: 'Comida rápida pra não perder tempo: perfeito pra “mata-fome” entre uma atração e outra.',
    official_url: 'https://www.betocarrero.com.br/restaurantes',
    image_url: null,
    youtube_url: yt('Burguer Mania restaurante'),
  },
  {
    id: 'res_hot_wheels',
    category: 'restaurant',
    name: 'Hot Wheels (restaurante)',
    area: 'Hot Wheels',
    profile: 'família',
    min_height_cm: null,
    queue_level: 'alta',
    short_description: 'Temática divertida e ótima pra quem está na área do Hot Wheels e quer almoçar sem atravessar o parque.',
    official_url: 'https://www.betocarrero.com.br/restaurantes',
    image_url: null,
    youtube_url: yt('restaurante hot wheels beto carrero'),
  },
  {
    id: 'res_hungry_dogs',
    category: 'restaurant',
    name: 'Hungry Dogs',
    area: 'Parque (alimentação)',
    profile: 'família',
    min_height_cm: null,
    queue_level: 'média',
    short_description: 'Opção prática (e geralmente mais rápida) pra lanchinho no meio do dia.',
    official_url: 'https://www.betocarrero.com.br/restaurantes',
    image_url: null,
    youtube_url: yt('Hungry Dogs beto carrero'),
  },
  {
    id: 'res_excalibur',
    category: 'restaurant',
    name: 'Restaurante Excalibur',
    area: 'Vila Germânica (show/restaurante)',
    profile: 'família',
    min_height_cm: null,
    queue_level: 'alta',
    short_description: 'Almoço + show (bem “experiência”). Ótimo pra programar no roteiro e descansar com as crianças.',
    official_url: 'https://www.betocarrero.com.br/restaurantes',
    image_url: null,
    youtube_url: yt('Excalibur beto carrero'),
  },
  {
    id: 'res_casa_de_massas',
    category: 'restaurant',
    name: 'Casa de Massas',
    area: 'Parque (alimentação)',
    profile: 'família',
    min_height_cm: null,
    queue_level: 'média',
    short_description: 'Quando você quer sentar, comer com calma e “recarregar” de verdade.',
    official_url: 'https://www.betocarrero.com.br/restaurantes',
    image_url: null,
    youtube_url: yt('Casa de Massas beto carrero'),
  },
  {
    id: 'res_pizza_hut',
    category: 'restaurant',
    name: 'Pizza Hut',
    area: 'Parque (alimentação)',
    profile: 'família',
    min_height_cm: null,
    queue_level: 'média',
    short_description: 'Opção segura pra família inteira (principalmente com criança seletiva).',
    official_url: 'https://www.betocarrero.com.br/restaurantes',
    image_url: null,
    youtube_url: yt('Pizza Hut beto carrero'),
  },
  {
    id: 'res_billy_the_beef',
    category: 'restaurant',
    name: 'Restaurante Billy the Beef',
    area: 'Cowboyland',
    profile: 'família',
    min_height_cm: null,
    queue_level: 'alta',
    short_description: 'Estilo “comida de verdade”: bom pra encaixar no roteiro do meio do dia e não cair de energia.',
    official_url: 'https://www.betocarrero.com.br/restaurantes',
    image_url: null,
    youtube_url: yt('Billy the Beef beto carrero'),
  },
  {
    id: 'res_natural_mix',
    category: 'restaurant',
    name: 'Natural Mix',
    area: 'Parque (alimentação)',
    profile: 'família',
    min_height_cm: null,
    queue_level: 'média',
    short_description: 'Pra dar uma equilibrada no dia: opção mais leve e prática.',
    official_url: 'https://www.betocarrero.com.br/restaurantes',
    image_url: null,
    youtube_url: yt('Natural Mix beto carrero'),
  },
]
