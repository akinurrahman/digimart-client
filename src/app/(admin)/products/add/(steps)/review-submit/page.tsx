import ReviewSubmitForm from "./components";
import { ReviewSubmitProvider } from "./context";

export default function ReviewSubmitPage() {
  return (
    <ReviewSubmitProvider>
      <ReviewSubmitForm />
    </ReviewSubmitProvider>
  );
}
