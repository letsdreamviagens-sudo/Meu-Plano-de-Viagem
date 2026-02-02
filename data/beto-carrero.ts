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
  youtube_url: string | null
}

const yt = (q: string) =>
  `https://www.youtube.com/results?search_query=${encodeURIComponent(q + ' beto carrero')}`

export const BETO_CARRERO_ITEMS: ExploreItem[] = [
  // RADICAIS
  { id:'atr_firewhip', category:'attraction', name:'Fire Whip', area:'Aventura Radical', profile:'radical', min_height_cm:130, queue_level:'alta',
    short_description:'A montanha-russa que faz todo mundo gritar. Pernas livres e adrenalina do começo ao fim.',
    youtube_url: yt('Fire Whip POV') },

  { id:'atr_big_drop', category:'attraction', name:'Big Drop', area:'Hot Wheels', profile:'radical', min_height_cm:130, queue_level:'alta',
    short_description:'Queda livre com aquele “socorro” gostoso. Vai com coragem (e prende o cabelo!).',
    youtube_url: yt('Big Drop') },

  { id:'atr_star_mountain', category:'attraction', name:'Star Mountain', area:'Aventura Radical', profile:'radical', min_height_cm:120, queue_level:'alta',
    short_description:'Clássica e intensa. Perfeita pra quem quer emoção sem parar.',
    youtube_url: yt('Star Mountain') },

  { id:'atr_tchibum', category:'attraction', name:'Tchibum', area:'Aventura Radical', profile:'radical', min_height_cm:130, queue_level:'alta',
    short_description:'Invertida, rápida e com sensação de “como eu fui parar aqui?”.',
    youtube_url: yt('Tchibum POV') },

  // FAMÍLIA
  { id:'atr_raskapuska', category:'attraction', name:'Raskapuska', area:'Vila Germânica', profile:'família', min_height_cm:80, queue_level:'alta',
    short_description:'A queridinha da família: gostosa, leve e rende fotos lindas.',
    youtube_url: yt('Raskapuska') },

  { id:'atr_crazy_river', category:'attraction', name:'Madagascar Crazy River Adventure!', area:'Madagascar', profile:'família', min_height_cm:105, queue_level:'alta',
    short_description:'Bote girando e risada garantida (chance alta de se molhar!).',
    youtube_url: yt('Madagascar Crazy River') },

  { id:'atr_hw_turbo', category:'attraction', name:'Hot Wheels Turbo Drive', area:'Hot Wheels', profile:'família', min_height_cm:95, queue_level:'alta',
    short_description:'Corrida temática divertida. Excelente pra ir com criança e curtir sem estresse.',
    youtube_url: yt('Hot Wheels Turbo Drive') },

  { id:'atr_barco_pirata', category:'attraction', name:'Barco Pirata', area:'Ilha dos Piratas', profile:'família', min_height_cm:120, queue_level:'média',
    short_description:'O barcão balançando alto e dando frio na barriga sem ser “radical demais”.',
    youtube_url: yt('Barco Pirata') },

  { id:'atr_autopista', category:'attraction', name:'Autopista (bate-bate)', area:'Vila Germânica', profile:'família', min_height_cm:110, queue_level:'média',
    short_description:'Clássico bate-bate: pausa divertida no meio do dia.',
    youtube_url: yt('Autopista bate-bate') },

  // INFANTIL
  { id:'atr_dum_dum', category:'attraction', name:'Montanha-Russa Dum Dum', area:'Cowboyland', profile:'infantil', min_height_cm:80, queue_level:'média',
    short_description:'A primeira montanha-russa dos pequenos. Emoção na medida certa.',
    youtube_url: yt('Dum Dum') },

  { id:'atr_carrossel', category:'attraction', name:'Carrossel', area:'Vila Germânica', profile:'infantil', min_height_cm:null, queue_level:'baixa',
    short_description:'Perfeito pra descanso + foto de família bem linda.',
    youtube_url: yt('Carrossel beto carrero') },

  // RESTAURANTES (também entram no roteiro)
  { id:'res_excalibur', category:'restaurant', name:'Restaurante Excalibur', area:'Vila Germânica', profile:'família', min_height_cm:null, queue_level:'alta',
    short_description:'Ótimo pra “programar” no roteiro: senta, come e descansa de verdade.',
    youtube_url: yt('Restaurante Excalibur') },

  { id:'res_billy', category:'restaurant', name:'Billy The Beef', area:'Cowboyland', profile:'família', min_height_cm:null, queue_level:'alta',
    short_description:'Comida de verdade pra recuperar energia (bom pra família).',
    youtube_url: yt('Billy the Beef') },

  { id:'res_burguer', category:'restaurant', name:'Burguer Mania', area:'Alimentação', profile:'família', min_height_cm:null, queue_level:'alta',
    short_description:'Rápido e prático: perfeito quando você não quer “perder tempo de parque”.',
    youtube_url: yt('Burguer Mania') },

  { id:'res_massas', category:'restaurant', name:'Casa de Massas', area:'Alimentação', profile:'família', min_height_cm:null, queue_level:'média',
    short_description:'Boa opção pra sentar e fazer uma pausa com calma.',
    youtube_url: yt('Casa de Massas') },

  { id:'res_natural', category:'restaurant', name:'Natural Mix', area:'Alimentação', profile:'família', min_height_cm:null, queue_level:'média',
    short_description:'Quando você quer algo mais leve no meio do dia.',
    youtube_url: yt('Natural Mix') }
]
