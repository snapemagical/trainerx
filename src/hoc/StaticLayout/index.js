import { Container } from "@mui/material";

import Header from "../../Page/Homepage/Header/Header";
import Headerbar from "../../Page/Homepage/Header/Headerbar";
import Footer from "../../Page/Homepage/Header/Footer/Footer";

const withStaticLayout = (Component) => {
  return (props) => {
    return (
      <div className="inner_page">
        <Header />
        <Headerbar />
        <div className="main_column">
          <Container>
            <Component {...props} />
          </Container>
        </div>
        <Footer />
      </div>
    );
  };
};
export default withStaticLayout;
