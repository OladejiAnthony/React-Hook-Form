import "./App.css";
// import { YouTubeForm } from "./components/YouTubeForm";
// import AsyncValidation from "./components/AsyncValidation";
import { YupYouTubeForm } from "./components/YupYoutubeForm";
import { ZodYouTubeForm } from "./components/ZodYoutubeForm";

const App = () => {
  return (
    <div>
      {/* <YouTubeForm /> */}
      {/* <AsyncValidation /> */}
      <YupYouTubeForm />
      <ZodYouTubeForm />
    </div>
  );
};

export default App;
