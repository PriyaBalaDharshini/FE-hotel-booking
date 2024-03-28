import { createContext, useReducer } from "react"
//Initial State
const INITIAL_STATE = {
    city: undefined,
    date: [],
    option: {
        adult: undefined,
        children: undefined,
        room: undefined
    }
}
export const SearchContext = createContext(INITIAL_STATE)

//actions
const SearchReducer = (state, action) => {
    switch (action.type) {
        case "NEW_SEARCH":
            return action.payload
        case "RESET_SEARCH":
            return INITIAL_STATE
        default:
            return state
    }
}

//using reducer in context
export const SearchContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE)

    //returning provider
    return (
        <SearchContext.Provider value={{
            city: state.city,
            date: state.date,
            option: state.option,
            dispatch
        }}>
            {children}
        </SearchContext.Provider>
    )
}