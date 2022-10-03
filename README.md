**React Context API login example using FaceIO for face authentication.**

This is part of a two part series, where I am going to show you how to use React and Typescript coupled with [FaceIO ](https://faceio.net/)to sign-up, authenticate a user and consume user data in your website.

What is FaceIO.

FaceIO is a facial authentication framework to authenticate users via face recognition instead of the traditional login/password. It is implemented via a simple JavaScript snippet (like google tag). More [here](https://faceio.net/getting-started).

**<u>Why use FaceIO.</u>**

1. The simplicity. We all know the complexity and work that goes into creating a way to authenticate users to your website yet all we want to do is to register a user and be able to login the user every time they came back.
In comes FaceIO with the easiest way to add passwordless authentication to your web based application. As we go on you will see how easy it is leaving us with more time to create amazing user experiences.

2. FaceIO does not add to the bundle size of your project. As we will see we just add a script to the index.html and you are done.

3. It is compatible with pretty much every browser out there (Chrome, Firefox, Safari, Edge & Chromium derivatives).
 

Let me now demonstrate the simplicity of FaceIO by building this sign-up form.

**<u>Initializing React, Typescript and Tailwind CSS in our project using Vite.</u>**

Fire up you favorite code editor and open the bash terminal.

I am going to use yarn so,

`yarn create vite`


![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/wvub07omg8lbrgm85df1.png)

You can use `yarn dev — host` to host your project and be able to access it via multiple devices.

Let us add Tailwind CSS to our project.

`yarn add -D tailwindcss postcss autoprefixer
npx tailwindcss init -p`

Go into src/tailwind.config.cjs and replace the contents with.

```
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

If you now run `yarn dev`


![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/gnzeg3gl3kos7fvfdhfy.png)

Now let me show you how easy it is to add FaceIO to your project.

Go to index.html , note the contents and then replace them with

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>FaceIO authentication using react + ts</title>
  </head>
  <body>
    <script src="https://cdn.faceio.net/fio.js"></script>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html> 
```

As you can see the only thing we have added is

`<script src=”https://cdn.faceio.net/fio.js"></script>`

above the `<div id=”root”></div>`

It is as simple as that. More on the integration [here](https://faceio.net/integration-guide#fiojs-integration).

Before we begin implementing FaceIO in our project you will need to sign up on [FaceIO console](https://console.faceio.net/). Once you have signed up you will come to this page.


![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ctk1i0mip0gufxgm0bf3.png)


Select NEW FACEIO APPLICATION and follow the prompts.


![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/2snxj0h9rw2sauousc3s.png)

Once done note the public Id.


![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ifs9m3qplrizbwu5gq2p.png)

Before we continue to creating our sign-up form component let us also bring in tailwind css.

Go to index.css and replace the contents with,

```
@tailwind base;
@tailwind components;
@tailwind utilities;
  
```
Go to app.tsx and replace its contents with this,

```
function App() {

  return (
    <div className='min-h-screen flex justify-center'>
      <h1 className='text-3xl font-bold text-yellow-600'>
        FaceIO authentication using react and typescript
      </h1>
    </div>
  );
}

export default App;

  
```

Your application should now look like this,


![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/blf8jcyeg15etflo3kdz.png)

Let us now create a new folder named components and in it a file named SignupForm.tsx


![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/re9mtkf03l35ntweigt0.png)

We will use react hook form to create our form let us add it to our project.

`yarn add react-hook-form @hookform/resolvers yup`

Make the necessary imports in the SignupForm.tsx.

```
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

  
```
Import the form into app.tsx file and make necessary changes,


![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/z7b96ucwojqjb2j49y6b.png)

Let us create the ui for form.

Under the h1 tags in SignupForm.tsx,

```
<form className='space-y-6'>
        <div>
          <label
            htmlFor=''
            className='text-sm font-bold backdrop:bold text-gray-600 block'
          >
            Name
          </label>
          <input
            type='text'
            placeholder='name'
            className='w-full p-2 border border-blue-900 rounded mt-1'
          />
        </div>
        <div>
          <label
            htmlFor=''
            className='text-sm font-bold backdrop:bold text-gray-600 block'
          >
            Email
          </label>
          <input
            type='text'
            placeholder='email@mail.com'
            className='w-full p-2 border border-blue-900 rounded mt-1'
          />
        </div>
        <div>
          <button className='w-full py-2 px-4 bg-blue-700 rounded-md text-white text-sm'>
            Sign Up
          </button>
        </div>
</form>
```
Now for the fun part of adding the logic, first let us create a new folder in the folder src with a file to store our types which we are going to use through out our build let us call it ,

```
/** src/@types/user.d.ts */

interface Iuser {
  name: string;
  email: string;
}
```

Back to our form let us define the data that we are going to take from the user and submit to faceIO to register the said user using yup. This should be done above the SignupForm declaration. This will also enable us to alert the user if any errors occur.

```
const SignupSchema = yup
  .object({
    name: yup.string().required(),
    email: yup.string().required(),
  })
  .required();
```
Inside the SignupForm function let us use the useForm from react-hook-form. It provides us with some handy functions that will help us to take input from the user and deliver it where we need like, register, handleSubmit and errors, as shown below.

```
const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Iuser>({
    resolver: yupResolver(SignupSchema),
  });
```
Let us also create a onSubmit function that will enable us to submit the data we take from the user to FaceIO.

```
const onSubmit = (data: Iuser) => {
    alert(JSON.stringify(data));
handleSignUp(data);
  };
```
As you can see inside there is a handleSignUp function let us define it but before we do that let us load FaceIO into our page using a useEffect hook, make the necessary import of useEffect then,

```
let faceio: any;
  useEffect(() => {
    faceio = new faceIO('fioxxxxxx');
  }, []);
```
Note the ‘fioxxxxx’ you should ensure that you have replaced it with your FaceIO public id.

Let us now create the handleSignUp function

```
const handleSignUp = async (user: Iuser): Promise<any> => {
    try {
      let response: any = await faceio.enroll({
        locale: 'auto',
        payload: {
          name: `${user.name}`,
          email: `${user.email}`,
        },
      });
      alert(
        ` Unique Facial ID: ${response.facialId}
      Enrollment Date: ${response.timestamp}
      Gender: ${response.details.gender}
      Age Approximation: ${response.details.age}
      payload: ${JSON.stringify(response.details)}`
      );
    } catch (error) {
      alert('Unable to register you please refresh page and try again');
    }
  };
```

As you can see in it we have a try-catch block where in the try block we call a FaceIO function called enroll which takes a payload containing the name of the user and email which we will attain from the form. For more of the enroll function, check this [documentation](https://faceio.net/integration-guide#enroll).

Let us now update the form tags to now be able to take in the user data and submit it.

```
<form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
//....
<form/>
```
And the input fields,

```
<input 
            type='text'
            placeholder='name'
            {...register('name')}
            className='w-full p-2 border border-blue-900 rounded mt-1'
          />
          {errors.name && <p className='text-red-900'>{errors.name.message}</p>}
//email input
<input
            type='text'
            placeholder='email@mail.com'
            {...register('email')}
            className='w-full p-2 border border-blue-900 rounded mt-1'
          />
          {errors.email && (
            <p className='text-red-900'>{errors.email.message}</p>
          )}
```

And with that we are done the whole sign up form looks like,

```
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
const SignupSchema = yup
  .object({
    name: yup.string().required(),
    email: yup.string().required(),
  })
  .required();
const SignupForm = () => {
  let faceio: any;
  useEffect(() => {
    faceio = new faceIO('fioa48b7');
  }, []);
const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Iuser>({
    resolver: yupResolver(SignupSchema),
  });
//create  a submit function that will submit the data
  const onSubmit = (data: Iuser) => {
    alert(JSON.stringify(data));
handleSignUp(data);
  };
//create a signup function that will submit the data to faceIO by calling the function faceIO enroll
  const handleSignUp = async (user: Iuser): Promise<any> => {
    try {
      let response: any = await faceio.enroll({
        locale: 'auto',
        payload: {
          name: `${user.name}`,
          email: `${user.email}`,
        },
      });
      alert(
        ` Unique Facial ID: ${response.facialId}
      Enrollment Date: ${response.timestamp}
      Gender: ${response.details.gender}
      Age Approximation: ${response.details.age}
      payload: ${JSON.stringify(response.details)}`
      );
    } catch (error) {
      alert('Unable to register you please refresh page and try again');
    }
  };
return (
    <div className='max-w-md mx-auto mt-4 bg-yellow-100 p-8 border border-gray-3000'>
      <h1 className='text-3xl font-bold text-blue-600 pb-5'>
        Sign-up form using FaceIO
      </h1>
<form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label
            htmlFor=''
            className='text-sm font-bold backdrop:bold text-gray-600 block'
          >
            Name
          </label>
          <input
            type='text'
            placeholder='name'
            {...register('name')}
            className='w-full p-2 border border-blue-900 rounded mt-1'
          />
          {errors.name && <p className='text-red-900'>{errors.name.message}</p>}
        </div>
        <div>
          <label
            htmlFor=''
            className='text-sm font-bold backdrop:bold text-gray-600 block'
          >
            Email
          </label>
          <input
            type='text'
            placeholder='email@mail.com'
            {...register('email')}
            className='w-full p-2 border border-blue-900 rounded mt-1'
          />
          {errors.email && (
            <p className='text-red-900'>{errors.email.message}</p>
          )}
        </div>
        <div>
          <button className='w-full py-2 px-4 bg-blue-700 rounded-md text-white text-sm'>
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};
export default SignupForm;
```
This should be the finished .


![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/nypgfnzujzc2udg9a7ge.png)

In case of errors while inputting the form data.


![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/3t0d4vg1b9f871fivji1.png)

If everything is ok.


![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/tasqzfqvypzqrr20s48h.png)


**PART 2**
In the src folder let us create a folder pages and in it create two files named Home.tsx and SignUp.tsx

Next we are going to add react router dom

So that your build should now look like this,


![fileStructure](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/509rws8r7l64d9bqox81.png)

We are going to transfer all the contents of App.tsx to the home page except the SignUpForm.

```
const Home = () => {
  return (
    <div className='min-h-screen flex flex-col '>
      <h1 className='text-3xl font-bold text-yellow-600 flex justify-center items-center'>
        FaceIO authentication using react and typescript
      </h1>

    </div>
  );
};

export default Home
```
Import the signup component to the sign up page.

```
import SignupForm from '../components/SignupForm';

const SignUp = () => {
  return (
    <div>
      <SignupForm />
    </div>
  );
};

export default SignUp;
```

Let us now bring the react route dom into the App.tsx so that we are able to route to different pages of our app.


```
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/SignUp';

function App() {
  return (
    <div className='min-h-screen flex flex-col justify-center items-center'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='signup' element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
```
Since now we have finished the arrangement of our site let us get into the gist of our build.

We are going to create a login function to login through FaceIO (remember we had created a signup function in the [previous part](https://medium.com/@tqrqj/react-typescript-user-sign-up-form-using-faceio-for-face-authentication-652bee54c4cc)).

Then we are going to take the user data we get from FaceIO response and pass it into the state using useContext and useReducer.

**Setting up useContext in React and Typescript.**

Let us create a new folder in src folder named context and in there a file named StateProvider.tsx, in there we will make userContext provider.

```
import React, {createContext, ReactNode} from 'react';


export const userContext = createContext()


const StateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return(
    <userContext.Provider value={}>
    {children}
  </userContext.Provider>
  )
};

export default StateProvider;
```
Because we are using typescript we will need to provide types for our build,

in src/@types/user.d.ts we will create the userContext type.

So our createContext will be of type userContextType since when there will be no user the user will be null.

Now let create a folder helpers in src and in it a file named Reducers.ts

```
/** src/helpers/Reducer.ts */

import { userContextType, Action } from '../@types/user';


//the initial state of the user
export const initialState = {
  user: null,
};


//the action we are going to take when we login that is set the user
export const actionTypes = {
  SET_USER: 'SET_USER',
};


//the reducer function note the parameter type annotations
export const reducer = (state: userContextType, action: Action) => {
  console.log(action);
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
};
```
There is one type we did not define that is the action type let us update it accordingly

Go to src/@types/user.d.ts and add,

```
type Action = {
  type: 'SET_USER';
  user: Iuser;
};
```
Now once we are done with this we can update StateProvider as this,

```
import React, { createContext, ReactNode, useReducer } from 'react';
import { userContextType } from '../@types/user';
import { initialState, reducer } from '../helpers/Reducers';

export const userContext = createContext<{
  state: userContextType;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null,
});

const StateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

//bring the useReducer hook and feed it with the reducer function and the initial state 

  const [state, dispatch] = useReducer(reducer, initialState);
return (

//update the value with the state and dispatch thus you are able to access this values in any component or page

    <userContext.Provider value={{ state, dispatch }}>
      {children}
    </userContext.Provider>
  );
};
```
Go to App.tsx import the StateProvider and wrap the entire build with it.


```
<StateProvider>
      <div className='min-h-screen flex flex-col justify-center items-center'>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='signup' element={<SignUp />} />
          </Routes>
        </BrowserRouter>
      </div>
</StateProvider>
```

Let us now create a login component to be able to feed user data to the state.

In the folder componets create a file Login.tsx and in it create a login,

```
import { Link } from 'react-router-dom';
const Login = () => {
  return (
    <div>
      <h1 className='text-3xl font-bold text-blue-600 mb-4'>
        Welcome, please login
      </h1>
      <button className='w-full p-3  bg-blue-700 rounded-md text-white text-sm mb-4'>
        Login
      </button>
<div>
        <p>You don't have an account? Please sign-up.</p>
        <Link to='/signup'>
          <button className='w-full p-3 bg-white outline-blue-800 rounded-md text-blue-800 text-sm mb-4'>
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
};
export default Login;
```
This component will be our gate guard that will refuse anyone admittance to our site unless they have loged in

So in our home component we will need to make some few changes.

We will query whether there is a user in the state that is if user is not null then we will show the home otherwise we will show
the login component

```
..... return (
    <div className='min-h-screen flex flex-col '>
      {!state?.user ? (
        <Login />
      ) : (
        <div>
          <h1 className='text-3xl font-bold text-yellow-600 flex justify-center items-center'>
            FaceIO authentication using react and typescript
          </h1>
        </div>
      )}
    </div>
  );
```
This is how your page should look like by now,


![login component](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/hbe9y5igrmaesb3qcykp.png)

Let us now go back to the login component and update the logic, that is call FaceIO and dispatch user data.

When we call FaceIO to authenticate (FaceIO authentication is documented here), and the authentication is successful we will receive a payload with the data the user provided when they signed up. That payload is what we are going to dispatch to the state.

```
import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { userContext } from '../context/StateProvider';
import { actionTypes } from '../helpers/Reducers';
const Login = () => {
  //we load faceIO using a useEffect hook
let faceio: any;
  useEffect(() => {
    faceio = new faceIO('fioa48b7');
  }, []);
//we use a useContext hook dispatch to be able to dispatch our user to the state
  const { dispatch } = useContext(userContext);
//we set up the handle login function
  const handleLogin = async () => {
    try {
      let response = await faceio.authenticate({
        locale: 'auto',
      });
      alert(`
        You have been identified successfully
        Unique Facial ID: ${response.facialId}
          PayLoad: ${JSON.stringify(response.payload)}
          `);
dispatch({ type: actionTypes.SET_USER, user: response.payload });
alert('You have successfully logged in');
    } catch (error) {
      console.log(error);
      alert('Failed to login, please refresh and try again');
    }
  };
return (
    <div className='flex flex-col justify-center items-center'>
      <h1 className='text-3xl font-bold text-blue-600 mb-4'>
        Welcome, please login
      </h1>
      <button onClick={handleLogin} className='w-full p-3  bg-blue-700 rounded-md text-white text-sm mb-4'>
        Login
      </button>
<div>
        <p>You don't have an account? Please sign-up.</p>
        <Link to='/signup'>
          <button
            
            className='w-full p-3 bg-white outline-blue-800 rounded-md text-blue-800 text-sm mb-4'
          >
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
};
export default Login;
```
Once we are done with that our application is good and ready but let us add a welcome user statement in the home page.
Under the h1 tags add.

```
<h2 className='text-blue-900 pt-28 font-bold'>
   Welcome {state.user.name} Email:{state.user.email}
</h2>
```
We are now done, if you were successful, and you try loging in you will see,


![finished build](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/fjgww3cyk7f9lpispt59.png)
For more on FaceIO.

1. [The getting started guide](https://faceio.net/getting-started).
2. [The integration guide.](https://faceio.net/integration-guide)
3. [The Developer center.](https://faceio.net/dev-guides)
4. [The frequently asked questions section.](https://faceio.net/faq)
5. [The trust center.](https://faceio.net/trust-center)

There are also some very interesting articles to get you on your way.

[Login/Sign up form using FaceIO, Next.js and Tailwind CSS](https://medium.com/@tqrqj/ng-log-in-sign-up-form-using-faceio-next-js-and-tailwind-css-e463a56aa814)

[Implementing facial authentication on a Vue.js app.](https://medium.com/@ariankooshesh/face-it-faceio-just-makes-it-easy-7f975875030)

[How to Authenticate a User with Face Recognition in React.js.](https://www.freecodecamp.org/news/authenticate-with-face-recognition-reactjs)

That is the conclusion for now but part two is [here](https://medium.com/@tqrqj/react-state-management-using-usecontext-and-usereduce-hooks-with-faceio-face-authentication-addf05d3752), but always check in this space for more.
