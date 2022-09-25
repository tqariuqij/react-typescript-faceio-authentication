import SignupForm from './components/SignupForm';

function App() {
  return (
    <div className='min-h-screen flex flex-col '>
      <h1 className='text-3xl font-bold text-yellow-600 flex justify-center items-center'>
        FaceIO authentication using react and typescript
      </h1>

      <SignupForm />
    </div>
  );
}

export default App;
