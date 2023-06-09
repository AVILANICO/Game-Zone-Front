// const cart = [];

// const handleCart =(state= cart, action) => {
//     const product = action.payload;
//     switch (action) {
//         case ADDITEM:
//             //check if product already exists
//             const exist = state.find((x)=>x.id === product.id)
//             if (exist) {
//                 // increase the quantity
//                 return state.map((x) =>
//                 x.id === product.id ? {...x, qty: x.qty + 1} : x
//                 );
//             }else {
//                 const product = action.payload;
//                 return[
//                     ...state,
//                     {
//                         ...product,
//                         qty: 1,
//                     }
//                 ]
//             }
//             break;

//             case "DELETEITEM":
//                 const exist1 = state.find((x)=> x.id === action.payload);
//                 if(exist1.qty === 1){
//                     return state.filter((x)=> x.id !== exist1.qty);
//                 }else {
//                     return state.map((x)=> 
//                     x.id === product.id ? {...x, qty: x.qty - 1} : x
//                     );
//                 }
    
//         default:
//             break;
//     }
// }

// export default handleCart;


