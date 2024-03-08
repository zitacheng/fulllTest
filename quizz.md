1.What would return the following code? B - 
```
<ScrollView>
   <View>
     <Text>Hello</Text>
     <Text>World</Text>
   </View>
 </ScrollView>
```

2.Which reducer code do not follow best practices? A - push is a function so it should be called with () not []

3.Which reducer code is correct? A - 
```
export function userSetData(
   state: IUserState,
   action: UserSetDataAction,
 ): IUserState {
   const { data, authType } = action
 
   return { ...state, data, authType, loading: false }
 }
 ```
 this is the only one not using async. Reducers are not supposed to have any async calls.

4.A higher-order component is a function that: A - takes a component and returns a new component that has been modified.

5.What is "windowing"? B - a technique to render a small subset of a larger dataset. The goal of windowing is to improve performences by limiting the render of the items visible on screen.

6.Which methods are not usable with React hooks? All of them. These methods were used in class components, and are not compatible with function components.

7.Which status code is not an error? A and D - 200 (successful response) and 204 (successful but no content send in the response)

8.Use Typescript to describe the following function which returns a success message when the request has been successfully sent, returns a code status when the request has failed.

```
type Result = string | number;

async function registerUser(name: string, age: number): Promise<Result> {
  try {
    const response: Response = await apiCall()
    if (response.status != 200)
      return response.status
    return response.message
  } catch(error: Error) {
    return error.status || 500
  }
}
```

9.What is the main difference between queries and mutations in GraphQL?
Queries are used to fetch data from the backend and do not modify the data on the server;
Mutations are used to create, edit or delete data on the backend.

10.What does not permit to interact with servers within React Native project? C - SwiftUI. it is a library from apple to build iOS native apps.