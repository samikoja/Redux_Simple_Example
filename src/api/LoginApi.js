import Global from '../utils/Global';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../store/Auth';

// const dispatch = useDispatch();

export const Login1 = async ( dispatch, username, password ) => {
    // if (username.trim() == '' || password.trim() == '') {
    //     alert("All fields are required");
    //   } else {
        try {
          const response = await fetch(`${Global.apiURL}/login?username=${username}&password=${password}`, {
            headers: {
              "X-Parse-Application-Id": Global.appID,
              Authorization: "application/json"
            },
          })
          const result = await response.json();
  
          if (result.error) {
            alert(result.error)
          } else {
            dispatch(login({ token: result.sessionToken, username: result.username, email: result.email, name: result.name }))
            // storeData('token', result.sessionToken);
            // storeData('username', result.username);
            // storeData('password', password);
          }
        } catch (err) {
          console.log("error", err)
        }
      //}
}



// const Login = async (username, password ) => {
//     if (username.trim() == '' || password.trim() == '') {
//         alert("All fields are required");
//       } else {
//         try {
//           const response = await fetch(`${Global.apiURL}/login?username=${username}&password=${password}`, {
//             headers: {
//               "X-Parse-Application-Id": Global.appID,
//               Authorization: "application/json"
//             },
//           })
//           const result = await response.json();
  
//           if (result.error) {
//             alert(result.error)
//           } else {
//             dispatch(login({ token: result.sessionToken, username: result.username, email: result.email, name: result.name }))
//             // storeData('token', result.sessionToken);
//             // storeData('username', result.username);
//             // storeData('password', password);
//           }
//         } catch (err) {
//           console.log("error", err)
//         }
//       }
// }

