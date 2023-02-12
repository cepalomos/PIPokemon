import {POKEMON_FAILURE,POKEMON_SUCCESS,POKEMON_REQUEST,POKEMON_PAGINATION,POKEMON_FILTER,POKEMON_ORDER_ASC,POKEMON_ORDER_SASC,POKEMON_ORDER_SDES,POKEMON_ORDER_DES} from './actions';

const initialState = {
    loading: false,
    pokemonUrl:[],
    pokemon:[],
    pokemonPage:[],
    numberPages:[],
    currentPage:1,
    error:'',
}

const pokemonUrl = (state = initialState, action) =>{
    switch(action.type){
        case POKEMON_REQUEST:
            return {
                ...state,
                loading: true,
                error:''
            }
        case POKEMON_SUCCESS:
            return {
                ...state,
                pokemonUrl:action.payload,
                pokemon: action.payload,
                loading:false,
                error: ''
            }
        case POKEMON_FAILURE:
            return{
                ...state,
                loading: false,
                error: action.payload
            }
        case POKEMON_PAGINATION:
            return{
                ...state,
                pokemonPage:state.pokemon.slice(action.payload.star, action.payload.end),
                currentPage:action.payload.currentPage,
                numberPages:action.payload.numberPages
            }
        case POKEMON_FILTER:
            return {
                ...state,
                pokemon:state.pokemonUrl.filter(({types:[Type1,Type2]})=> Type1 === action.payload || Type2 === action.payload),
                error:'',
            }
        case POKEMON_ORDER_ASC:
            return {
                ...state,
                pokemon:[...state.pokemon.sort(({name:a},{name:b})=>a>b?1:a<b?-1:0)]
            }
            case POKEMON_ORDER_DES:
            return {
                ...state,
                pokemon:[...state.pokemon.sort(({name:a},{name:b})=>a<b?1:a>b?-1:0)]
            }
        case POKEMON_ORDER_SASC:
            return{
                ...state,
                pokemon:[...state.pokemon.sort(({attack:a},{attack:b})=>a-b)],
            }
        case POKEMON_ORDER_SDES:
            return{
                ...state,
                pokemon:[...state.pokemon.sort(({attack:a},{attack:b})=>b-a)],
            }

        default: return state;
    }
}
export default pokemonUrl