import { Link, useParams } from "react-router-dom";
import Header from "../components/layout/Header";

function ApplicationSuccessPage() {
  const { id } = useParams();

  return (
    <>
      <Header />

      <main style={{ padding: "80px 32px", textAlign: "center" }}>
        <h1>Ansökan är skickad!</h1>

        <p>
          Tack för din ansökan. Vi har tagit emot den.
        </p>

        <p>
          Ansöknings-ID: {id}
        </p>

        <Link to="/utbildningar">
          Tillbaka till utbildningarna
        </Link>
      </main>
    </>
  );
}

export default ApplicationSuccessPage;